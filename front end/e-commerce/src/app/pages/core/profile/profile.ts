import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user-service';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Profile {
  private readonly userService = inject(UserService);

  readonly isLoading = signal(false);
  readonly requestError = signal('');

  readonly profileForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.pattern(emailPattern)]),
  });

  userInitial = 'U';

  constructor(private router: Router) {
    this.loadCurrentUser();
  }

  private loadCurrentUser(): void {
    const token = this.userService.getAccessToken();

    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    this.isLoading.set(true);
    this.requestError.set('');

    this.userService.infoAboutUser(token).subscribe({
      next: (response) => {
        const user = response.infoAboutUser;

        this.profileForm.patchValue({
          name: user.name,
          email: user.email,
        });

        this.userInitial = (user.name?.trim().charAt(0) || 'U').toUpperCase();
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        this.requestError.set('Could not load your profile. Please login again.');
        this.userService.removeAccessToken();
        this.router.navigate(['/login']);
      },
    });
  }

  submitProfile(): void {
    this.profileForm.markAllAsTouched();

    if (this.profileForm.invalid) {
      return;
    }

    const token = this.userService.getAccessToken();

    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    const formValue = this.profileForm.getRawValue();
    const name = (formValue.name ?? '').trim();
    const email = (formValue.email ?? '').trim();

    this.isLoading.set(true);
    this.requestError.set('');

    this.userService.updateProfile(token, { name, email }).subscribe({
      next: () => {
        this.userService.saveUserName(name);
        this.userInitial = (name.charAt(0) || 'U').toUpperCase();
        this.isLoading.set(false);
        this.router.navigate(['/']);
      },
      error: () => {
        this.isLoading.set(false);
        this.requestError.set('Could not submit profile right now.');
      },
    });
  }

  goToChangePassword(): void {
    this.router.navigate(['/change-password']);
  }

  logout(): void {
    this.userService.removeAccessToken();
    this.router.navigate(['/login']);
  }
}
