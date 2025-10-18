import { Routes } from '@angular/router';

import { Favorite } from './pages/favorite/favorite';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Profile } from './pages/profile/profile';
import { Register } from './pages/register/register';
import { Team } from './pages/team/team';
import { authGuard } from './services/auth/auth.guard';
import { guestGuard } from './services/auth/guest.guard';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    canActivate: [authGuard]
  },
  {
    path: 'home',
    component: Home,
    canActivate: [authGuard]
  },
  {
    path: 'login',
    component: Login,
    canActivate: [guestGuard]
  },
  {
    path: 'register',
    component: Register,
    canActivate: [guestGuard]
  },
  {
    path: 'favoritos',
    component: Favorite,
    canActivate: [authGuard]
  },
  {
    path: 'equipe',
    component: Team,
    canActivate: [authGuard]
  },
  {
    path: 'perfil',
    component: Profile,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
