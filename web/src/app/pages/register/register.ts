import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { Api } from '../../services/api';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
})
export class Register {
  nome: string = '';
  email: string = '';
  password: string = '';
  loading: boolean = false;
  confirmPassword: string = '';

  apiService = inject(Api)
  authService = inject(AuthService);
  router = inject(Router);

  handleRegister($event: SubmitEvent) {
    $event.preventDefault();
    this.loading = true;

    this.apiService.register({
      nome: this.nome,
      email: this.email,
      senha: this.password,
    }).subscribe({
      next: (res) => {
        this.authService.login(res.data.token.access_token);
        this.router.navigate(['/']);
        this.loading = false;
      },
      error: (err) => {
        console.error('Registration failed:', err);
        this.loading = false;
      }
    });
  }
}
