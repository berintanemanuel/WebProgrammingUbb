import { Component } from '@angular/core';

import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import { CommonModule } from '@angular/common';

import { Router, RouterLink } from '@angular/router';

import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-register-component',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './register-component.html'
})
export class RegisterComponent {

  errorMessage = '';

  successMessage = '';

  registerForm = new FormGroup({

    username:
      new FormControl(
        '',
        [Validators.required]),

    password:
      new FormControl(
        '',
        [Validators.required])
  });

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  onSubmit() {

    if (this.registerForm.invalid) {

      this.registerForm.markAllAsTouched();

      return;
    }

    const username =
      this.registerForm.value.username!;

    const password =
      this.registerForm.value.password!;

    this.loginService
      .register(username, password)
      .subscribe({

        next: () => {

          this.successMessage =
            'Registration successful';

          this.errorMessage = '';

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1000);
        },

        error: (err) => {

          this.successMessage = '';

          this.errorMessage =
            err.error.message ||
            'Registration failed';
        }
      });
  }
}