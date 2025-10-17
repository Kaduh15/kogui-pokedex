import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
})
export class Register {
  nome: string = '';
  email: string = '';
  password: string = '';
  loading: boolean = false;
  confirmPassword: string = '';

  handleRegister($event: SubmitEvent) {
    $event.preventDefault();
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }
}
