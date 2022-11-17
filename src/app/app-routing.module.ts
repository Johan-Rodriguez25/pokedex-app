import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonListComponent } from './pages/home/components/pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './pages/home/components/pokemon-detail/pokemon-detail.component';
import { CheckLoginGuard } from './shared/guards/check-login.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/auth/login/login.module').then((m) => m.LoginModule),
    canActivate: [CheckLoginGuard],
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./pages/auth/signup/signup.module').then((m) => m.SignupModule),
  },
  { path: '', component: PokemonListComponent },
  { path: 'detail/:name', component: PokemonDetailComponent },
  { path: '**', component: PokemonListComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
