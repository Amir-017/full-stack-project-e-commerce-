import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserService } from '../../../services/user-service';

@Component({
  selector: 'app-all-users',
  imports: [],
  templateUrl: './all-users.html',
  styleUrl: './all-users.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllUsers {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  readonly users = signal<User[]>([]);
  readonly isLoading = signal(true);
  readonly requestError = signal('');
  readonly busyUserId = signal<string | null>(null);

  constructor() {
    this.loadUsers();
  }

  private loadUsers(): void {
    const token = this.userService.getAccessToken();

    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    this.isLoading.set(true);
    this.requestError.set('');

    this.userService.getAllUsers(token).subscribe({
      next: (response) => {
        this.users.set(response.data ?? []);
        this.isLoading.set(false);
      },
      error: () => {
        this.requestError.set('Could not load users right now.');
        this.isLoading.set(false);
      },
    });
  }

  deleteUser(user: User): void {
    const token = this.userService.getAccessToken();
    const userId = user._id || user.id;

    if (!token || !userId) {
      return;
    }

    this.busyUserId.set(userId);

    this.userService.deleteUser(token, userId).subscribe({
      next: () => {
        this.users.update((list) => list.filter((item) => (item._id || item.id) !== userId));
        this.busyUserId.set(null);
      },
      error: () => {
        this.requestError.set('Delete failed. Please try again.');
        this.busyUserId.set(null);
      },
    });
  }

  changeRole(user: User): void {
    const token = this.userService.getAccessToken();
    const userId = user._id || user.id;

    if (!token || !userId) {
      return;
    }

    const nextRole = user.role === 'admin' ? 'member' : 'admin';
    this.busyUserId.set(userId);

    this.userService.changeUserRole(token, userId, nextRole).subscribe({
      next: (r) => {
        this.users.update((list) =>
          list.map((item) =>
            (item._id || item.id) === userId
              ? {
                  ...item,
                  role: nextRole,
                }
              : item,
          ),
        );
        this.busyUserId.set(null);
      },
      error: () => {
        this.requestError.set('Role update failed. Please try again.');
        this.busyUserId.set(null);
      },
    });
  }
}
