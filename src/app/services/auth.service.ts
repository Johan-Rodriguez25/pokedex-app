import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
// import { environment } from 'src/environments/environment';
import { environment } from 'src/environments/environment.prod';
import { User, NewUser } from '../shared/models/user.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient, private router: Router) {
    this.checkToken();
  }

  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  login(authData: User): Observable<any | void> {
    return this.http.post(`${this.baseUrl}/auth/login`, authData).pipe(
      map((res: any) => {
        this.saveToken(res.token);
        this.loggedIn.next(true);
        return res;
      }),
      catchError((err) => {
        return this.handlerError(err);
      })
    );
  }

  signup(authData: NewUser) {
    return this.http.post(`${this.baseUrl}/auth/register`, authData);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  private checkToken(): void {
    const userToken = localStorage.getItem('token') as string;
    const isExpired = helper.isTokenExpired(userToken);
    isExpired ? this.logout() : this.loggedIn.next(true);
  }

  private saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  private handlerError(err: any): Observable<never> {
    let errorMessage = 'An error occured retrienving data';

    if (err) {
      errorMessage = `Error: code ${err.message}`;
    }
    window.alert(errorMessage);

    return throwError(errorMessage);
  }
}
