import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-component.html'
})
export class LoginComponent {

  errorMessage = '';

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  onSubmit() {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const username = this.loginForm.value.username!;
    const password = this.loginForm.value.password!;

    this.loginService.login(username, password)
      .subscribe({

        next: (response) => {

          localStorage.setItem(
            'token',
            response.token
          );

          this.router.navigate(['/']);
        },

        error: () => {
          this.errorMessage =
            'Invalid username or password';
        }
      });
  }
}