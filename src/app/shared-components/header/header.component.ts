import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserProfileComponent } from 'src/app/components/user-profile/user-profile.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  // viewchild is just like DOM in JS
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
  toggleMenu() {
    this.trigger.openMenu();
  }

  // For disabling specific menu items
  disabledDashboard: boolean = false;
  sub!: Subscription | undefined;
  loading: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // if current route is dashboard, then disable dashboard menu item
    if (this.router.url != '/dashboard') {
      this.disabledDashboard = !this.userService.inTeam();
    } else {
      this.disabledDashboard = true;
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

        // navigating to welcome page of successful logout also sending loading state
        // (check welcome component constructor for details)
        this.router
          .navigate(['/welcome'], {
            state: { loading: true },
            replaceUrl: true,
          })
          // after navigating to welcome page performing a reload, coz tabs load completely then
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
