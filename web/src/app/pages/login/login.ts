import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
})
export class Login {
  email: string = '';
  password: string = '';
  loading: boolean = false;

  authService = inject(AuthService);
  router = inject(Router);

  handleLogin($event: SubmitEvent) {
    $event.preventDefault();
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      this.authService.login('mock-token');
      this.router.navigate(['/']);
    }, 2000);
  }
}
