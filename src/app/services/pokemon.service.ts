import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getPokemons(offset: number, limit: number): Observable<any> {
    const userToken = localStorage.getItem('token') as string;

    return this.http.get(
      `${this.baseUrl}/api/v1/pokemons?offset=${offset}&limit=${limit}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${userToken}`,
        }),
      }
    );
  }

  getMoreData(name: string): Observable<any> {
    const userToken = localStorage.getItem('token') as string;

    return this.http.get(`${this.baseUrl}/api/v1/pokemons/${name}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${userToken}`,
      }),
    });
  }
}
