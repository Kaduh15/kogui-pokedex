import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  userService = inject(UserService)

  constructor() {
    this.userService.getPokemons()
  }
}
