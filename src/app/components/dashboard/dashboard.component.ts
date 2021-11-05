import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Team } from 'src/app/models/team';
import { User } from 'src/app/models/user';
import { AdminService } from 'src/app/services/admin.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';
import { TeamSettingsComponent } from './notification-tab/team-settings/team-settings.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  title = 'Dashboard';
  isAdmin: boolean = false;
  inTeam: boolean = false;
  index: number = 0;
  sub!: Subscription | undefined;
  teamDetails!: Team;
  teamMembers: User[] = [];
  loading: boolean = false;
  errormessage: string = '';
  error: boolean = false;
  panelOpenState = false;

  // to store counts of events
  eventCounts = new Map();

  adminRequests: any[] = [];
  userRequests: any[] = [];
  adminRequestsSub: Subscription | undefined;
  userRequestsSub: Subscription | undefined;

  // to store count of requests
  adminRequestCount: number = 0;
  userRequestCount: number = 0;

  constructor(
    private userService: UserService,
    private adminService: AdminService,
    public dialog: MatDialog,
    private teamService: TeamService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    // getting user's role and
    this.isAdmin = this.userService.isAdmin();
    this.inTeam = this.userService.isInTeam();
    this.getTeamDetails();
    this.getAdminRequests();
    this.getUserRequests();
  }

  // this method is called when notification-tab component emits the event
  setEventCount(data: any) {
    this.eventCounts = data;
  }

  // this method is called when notification-tab component emits the event
  setAdminRequestCount(data: any) {
    this.adminRequestCount = data;
  }

  setUserRequestCount(data: any) {
    this.userRequestCount = data;
  }

  openDialog() {
    this.dialog.open(TeamSettingsComponent, {
      height: '400px',
      width: '600px',
      data: {
        team: 'Dev Team',
      },
    });
  }

  getTeamDetails() {
    this.loading = true;
    this.sub = this.teamService.getTeamDetails().subscribe({
      next: (response) => {
        if (response.status == 'success') {
          this.teamDetails = response.data;
          this.loading = false;
        } else {
          this.error = true;
          this.errormessage = response.message;
          this.openSnackBar(response.message);
          this.loading = false;
        }
      },
      error: (err) => {
        if (err.status == 403) {
          this.router
            .navigate(['/welcome'], {
              state: { loading: true },
              replaceUrl: true,
            })
            .then(() => {
              window.location.reload(),
                alert('Auth Token Error. Please Login Again');
            });
          this.loading = false;
        }
        this.error = true;
        this.errormessage = err.error;
        this.openSnackBar(err.error);
      },
    });
  }

  getAdminRequests() {
    console.log();
    if (!this.userService.isAdmin()) return;

    this.loading = true;
    this.adminRequestsSub = this.adminService
      .getAllPendingRequests()
      .subscribe({
        next: (response) => {
          if (response.status == 'success') {
            this.adminRequests = response.data;
            this.adminRequestCount = this.adminRequests.length;
            this.loading = false;
            //might want to remove loading and error
          } else {
            this.error = true;
            this.errormessage = response.message;
            this.openSnackBar(response.message);
            this.loading = false;
          }
        },
        error: (err) => {
          if (err.status == 403) {
            this.router
              .navigate(['/welcome'], {
                state: { loading: true },
                replaceUrl: true,
              })
              .then(() => {
                window.location.reload(),
                  alert('Auth Token Error. Please Login Again');
              });
            this.loading = false;
          }
          this.error = true;
          this.errormessage = err.error;
          this.openSnackBar(err.error);
        },
      });
  }

  getUserRequests() {
    console.log();

    this.loading = true;
    this.adminRequestsSub = this.userService.getAllUserRequests().subscribe({
      next: (response) => {
        if (response.status == 'success') {
          this.userRequests = response.data;
          this.userRequestCount = this.userRequests.length;
          this.loading = false;
          //might want to remove loading and error
        } else {
          this.error = true;
          this.errormessage = response.message;
          this.openSnackBar(response.message);
          this.loading = false;
        }
      },
      error: (err) => {
        if (err.status == 403) {
          this.router
            .navigate(['/welcome'], {
              state: { loading: true },
              replaceUrl: true,
            })
            .then(() => {
              window.location.reload(),
                alert('Auth Token Error. Please Login Again');
            });
          this.loading = false;
        }
        this.error = true;
        this.errormessage = err.error;
        this.openSnackBar(err.error);
      },
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 1000,
      panelClass: ['snackbar'],
    });
  }
}
