import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  nickname = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => (sub ? sub.unsubscribe() : 0));
  }

  onLogin(): void {
    this.subscriptions.push(
      this.auth
        .login({ nickname: this.nickname, password: this.password })
        .subscribe((res) => {
          if (res) {
            this.router.navigate(['']);
          }
        })
    );
  }
}
