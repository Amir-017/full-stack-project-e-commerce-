import { UserService } from './../../services/user-service';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  imports: [RouterLink, SidebarComponent],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  sidebarOpen = false;
  userMenuOpen = false;
  userName = '';
  isAuthenticated = false;

  // userservice = inject(UserService)
  constructor(
    private router: Router,
    public userService: UserService,
  ) {}

  ngOnInit(): void {
    this.userService.isAuthenticated
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((isAuth) => {
        this.isAuthenticated = isAuth;

        if (!isAuth) {
          this.userMenuOpen = false;
        }
      });

    const token = this.userService.getAccessToken();

    if (!token || this.userName) {
      return;
    }

    this.userService
      .infoAboutUser(token)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.userService.saveUserName(response.infoAboutUser.name);
          // this.userService.saveRole(response.infoAboutUser.role);
        },
        error: () => {
          this.userService.removeAccessToken();
          this.isAuthenticated = false;
          this.userName = '';
          this.userMenuOpen = false;
        },
      });
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  toggleUserMenu(): void {
    this.userMenuOpen = !this.userMenuOpen;
  }

  openUserMenu(): void {
    this.userMenuOpen = true;
  }

  closeSidebar(): void {
    this.sidebarOpen = false;
  }

  closeUserMenu(): void {
    this.userMenuOpen = false;
  }

  logout(): void {
    this.userService.removeAccessToken();
    this.userMenuOpen = false;
    this.userName = '';
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

  goToProfile(): void {
    this.userMenuOpen = false;
    this.router.navigate(['/profile']);
  }

  goToAllUsers(): void {
    this.userMenuOpen = false;
    this.router.navigate(['/admin/users']);
  }

  goToCarts(): void {
    this.userMenuOpen = false;
    this.router.navigate(['/admin/carts']);
  }

  goToDashboard(): void {
    this.userMenuOpen = false;
    this.router.navigate(['/admin/dashboard']);
  }

  onSearch(term: string): void {
    const searchTerm = term.trim();

    if (!searchTerm) {
      return;
    }

    this.router.navigate(['/search-products'], {
      queryParams: {
        search: searchTerm,
        page: 1,
      },
    });
  }
  ///////////////////////////////////
  //////////////////////////////////
}
