import { Component, inject } from '@angular/core';
import { LucideAngularModule, User, Mail, Calendar, Shield } from "lucide-angular";

import { Header } from "../../components/header/header";
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-profile',
  imports: [Header, LucideAngularModule],
  templateUrl: './profile.html'
})
export class Profile {
  readonly UserIcon = User
  readonly EmailIcon = Mail
  readonly CalendarIcon = Calendar
  readonly ShieldIcon = Shield

  #userService = inject(UserService)

  userInfo: {
    email: string;
    name: string;
    createdAt: string;
    role: "User" | "Admin";
  }

  constructor() {
    this.userInfo = this.#userService.infoUser
  }
}
