import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
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
    component: Home,
    canActivate: [authGuard]
  },
  {
    path: 'equipe',
    component: Home,
    canActivate: [authGuard]
  },
  {
    path: 'perfil',
    component: Home,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
