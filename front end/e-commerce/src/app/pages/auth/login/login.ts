import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginRequest, UserService } from '../../../services/user-service';
import { switchMap } from 'rxjs';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  requestError = '';
  result: string | null = '';
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(emailPattern)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  submitForm() {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    this.requestError = '';

    const loginData = this.form.getRawValue() as LoginRequest;

    this.userService
      .loginUser(loginData)
      .pipe(
        switchMap((response) => {
          this.userService.saveAccessToken(response.accesstoken);

          return this.userService.infoAboutUser(response.accesstoken);
        }),
      )
      .subscribe({
        next: (response) => {
          this.userService.saveUserName(response.infoAboutUser.name);
          this.userService.saveRole(response.infoAboutUser.role);
          this.router.navigate(['/']);
        },
        error: () => {
          this.requestError = 'Login failed, please check your email and password.';
        },
      });
  }
}
