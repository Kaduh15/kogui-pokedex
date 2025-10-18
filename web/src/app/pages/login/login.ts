import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Api } from '../../services/api';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
})
export class Login {
  email: string = '';
  password: string = '';
  loading: boolean = false;

  apiService = inject(Api)
  authService = inject(AuthService);
  router = inject(Router);


  handleLogin($event: SubmitEvent) {
    $event.preventDefault();
    this.loading = true;

    this.apiService.login({
      email: this.email,
      senha: this.password,
    }).subscribe({
      next: (res) => {
        this.authService.login(res.data.token.access_token);
        this.router.navigate(['/']);
        this.loading = false;
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.loading = false;
      }
    });
  }
}
