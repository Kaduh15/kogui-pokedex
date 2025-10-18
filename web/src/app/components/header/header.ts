import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Heart, HouseIcon, LogOut, LucideAngularModule, User, Users } from 'lucide-angular';

import { AuthService } from '../../services/auth/auth.service';
import { ButtonNavigate } from "../button-navigate/button-navigate";

@Component({
  selector: 'app-header',
  imports: [LucideAngularModule, ButtonNavigate],
  templateUrl: './header.html',
})
export class Header implements OnInit {
  readonly LogOutIcon = LogOut;

  router = inject(Router);
  authService = inject(AuthService);

  links = [
    { icon: HouseIcon, label: 'Todos', route: '/', active: true },
    { icon: Heart, label: 'Favoritos', route: '/favoritos', active: false },
    { icon: Users, label: 'Minha Equipe', route: '/equipe', active: false },
    { icon: User, label: 'Perfil', route: '/perfil', active: false },
  ];

  ngOnInit() {
    const url = this.router.createUrlTree([]).toString();
    this.links.forEach(link => {
      link.active = (link.route === url);
    });
  }

  logout() {
    this.authService.logout();
  }
}
