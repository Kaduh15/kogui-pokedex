import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CircleAlert, CircleCheck, LucideAngularModule } from 'lucide-angular';
import { ToastService, ScAngularToastify } from 'sc-angular-toastify';

import { Api } from '../../services/api';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink, LucideAngularModule, ScAngularToastify],
  templateUrl: './login.html',
})
export class Login {
  readonly AlertCircleIcon = CircleAlert;
  readonly CheckCircleIcon = CircleCheck;

  email: string = '';
  password: string = '';
  loading: boolean = false;

  emailError: string = '';
  passwordError: string = '';
  generalError: string = '';

  emailValid: boolean = false;
  passwordValid: boolean = false;

  emailTouched: boolean = false;
  passwordTouched: boolean = false;

  apiService = inject(Api);
  authService = inject(AuthService);
  router = inject(Router);
  #toast = inject(ToastService);

  validateEmail() {
    this.emailTouched = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!this.email) {
      this.emailError = 'E-mail é obrigatório';
      this.emailValid = false;
    } else if (!emailRegex.test(this.email)) {
      this.emailError = 'Formato de e-mail inválido';
      this.emailValid = false;
    } else {
      this.emailError = '';
      this.emailValid = true;
    }
  }

  validatePassword() {
    this.passwordTouched = true;

    if (!this.password) {
      this.passwordError = 'Senha é obrigatória';
      this.passwordValid = false;
    } else if (this.password.length < 6) {
      this.passwordError = 'Senha deve ter pelo menos 6 caracteres';
      this.passwordValid = false;
    } else {
      this.passwordError = '';
      this.passwordValid = true;
    }
  }

  clearGeneralError() {
    this.generalError = '';
  }

  isFormValid(): boolean {
    return !!this.emailValid && !!this.passwordValid && !!this.email && !!this.password;
  }

  handleLogin($event: SubmitEvent) {
    $event.preventDefault();


    this.generalError = '';


    this.validateEmail();
    this.validatePassword();


    if (!this.isFormValid()) {
      this.#toast.show('Por favor, corrija os erros no formulário', 'error');
      return;
    }

    this.loading = true;

    this.apiService.login({
      email: this.email,
      senha: this.password,
    }).subscribe({
      next: (res) => {
        this.authService.login(res.data.token.access_token);
        this.#toast.show(`Bem-vindo de volta! Login realizado com sucesso.`, 'success');
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.loading = false;


        if (err.status === 401) {
          this.generalError = 'E-mail ou senha incorretos';
          this.#toast.show('E-mail ou senha incorretos', 'error');
        } else if (err.status === 422) {
          this.generalError = 'Dados inválidos. Verifique os campos.';
          this.#toast.show('Dados inválidos. Verifique os campos.', 'error');
        } else if (err.status === 429) {
          this.generalError = 'Muitas tentativas. Tente novamente em alguns minutos.';
          this.#toast.show('Muitas tentativas. Tente novamente em alguns minutos.', 'error');
        } else if (err.status === 0) {
          this.generalError = 'Erro de conexão. Verifique sua internet.';
          this.#toast.show('Erro de conexão. Verifique sua internet.', 'error');
        } else {
          this.generalError = 'Erro inesperado. Tente novamente.';
          this.#toast.show('Erro inesperado. Tente novamente.', 'error');
        }
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
