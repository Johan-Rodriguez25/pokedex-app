import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  isUser = false;
  isLogged = false;

  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.auth.isLogged.subscribe((res) => (this.isLogged = res))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => (sub ? sub.unsubscribe() : 0));
  }

  onToggleSidenav(): void {}

  onLogout(): void {
    this.auth.logout();
  }
}
