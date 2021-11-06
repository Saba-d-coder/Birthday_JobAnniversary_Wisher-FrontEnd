import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
  toggleMenu() {
    this.trigger.openMenu();
  }

  // For disabling specific menu items
  disableDashboard: boolean = false;
  disableProfile: boolean = false;
  sub!: Subscription | undefined;
  user!: User;
  loading: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.user = this.userService.currentUser?.user;
    // if current route is dashboard or profile, then disable resp menu item

    switch (this.router.url) {
      case '/dashboard':
        this.disableDashboard = true;
        break;
      case '/profile':
        this.disableProfile = true;
        break;
    }
  }

  // navigate to respective route on click of menu items
  itemClicked(route: String): void {
    this.router.navigate([route]);
  }

  logout() {
    this.sub = this.userService.logout().subscribe({
      next: () => {
        this.openSnackBar('Log out successful');
        localStorage.setItem(
          'loginStatus',
          JSON.stringify({ isLoggedIn: false })
        );

        this.router
          .navigate(['/welcome'], {
            state: { loading: true },
            replaceUrl: true,
          })
          .then(() => window.location.reload());
      },
      error: (err) => this.openSnackBar(err.error.message),
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 1000,
      panelClass: ['snackbar'],
    });
  }
}
