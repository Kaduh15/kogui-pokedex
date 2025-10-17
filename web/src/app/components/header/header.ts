import { Component, inject } from '@angular/core';
import { Heart, HouseIcon, LogOut, LucideAngularModule, User, Users } from 'lucide-angular';
import { ButtonNavigate } from "../button-navigate/button-navigate";
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  imports: [LucideAngularModule, ButtonNavigate],
  templateUrl: './header.html',
})
export class Header {
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
