import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastService, ScAngularToastify } from 'sc-angular-toastify';

import { Api } from '../../services/api';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink, ScAngularToastify],
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
  #toast = inject(ToastService);

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
        this.#toast.show('Conta criada com sucesso! Bem-vindo à Kogui Pokédex!', 'success');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Registration failed:', err);
        
        if (err.status === 409) {
          this.#toast.show('E-mail já está em uso. Tente outro e-mail.', 'error');
        } else if (err.status === 422) {
          this.#toast.show('Dados inválidos. Verifique os campos.', 'error');
        } else {
          this.#toast.show('Erro ao criar conta. Tente novamente.', 'error');
        }
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
