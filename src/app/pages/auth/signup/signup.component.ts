import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  nickname = '';
  password = '';
  name = '';
  team = '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => (sub ? sub.unsubscribe() : 0));
  }

  onSignup(): void {
    this.subscriptions.push(
      this.auth
        .signup({
          name: this.name,
          nickname: this.nickname,
          team: this.team,
          password: this.password,
        })
        .subscribe((res) => {
          if (res) {
            this.router.navigate(['/login']);
          }
        })
    );
  }
}
