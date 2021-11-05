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
  loading: boolean = false;
  errormessage: string = '';
  error: boolean = false;
  panelOpenState = false;

  // to store counts of events
  eventCounts = new Map();
  // to store count of requests
  adminRequestCount: number = 0;
  userRequestCount: number = 0;

  teamDetails!: Team;
  adminRequests: any[] = [];
  userRequests: any[] = [];
  teams: any[] = [];

  sub!: Subscription | undefined;
  adminRequestsSub: Subscription | undefined;
  userRequestsSub: Subscription | undefined;

  constructor(
    private userService: UserService,
    private adminService: AdminService,
    public dialog: MatDialog,
    private teamService: TeamService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    // getting user's role and checking if they are in a team or not
    this.isAdmin = this.userService.isAdmin();
    this.inTeam = this.userService.isInTeam();
    this.getTeamDetails();
    this.getAdminRequests();
    this.getUserRequests();
    this.getAllTeams();
  }

  //#region these methods are called when notification-tab component emits the event
  setEventCount(data: any) {
    this.eventCounts = data;
  }

  setAdminRequestCount(data: any) {
    this.adminRequestCount = data;
  }

  setUserRequestCount(data: any) {
    this.userRequestCount = data;
  }

  //#endregion

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
    if (!this.inTeam) return;
    this.loading = true;
    this.sub = this.teamService.getTeamDetails().subscribe({
      next: (response) => {
        if (response.status == 'success') {
          this.teamDetails = response.data;
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
        }
        this.loading = false;
        this.error = true;
        this.errormessage = err.error;
        this.openSnackBar(err.error);
      },
    });
  }

  getAdminRequests() {
    if (!this.isAdmin) return;

    this.adminRequestsSub = this.adminService
      .getAllPendingRequests()
      .subscribe({
        next: (response) => {
          if (response.status == 'success') {
            this.adminRequests = response.data;
            this.adminRequestCount = this.adminRequests.length;
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
          }
          this.error = true;
          this.errormessage = err.error;
          this.openSnackBar(err.error);
        },
      });
  }

  getUserRequests() {
    this.adminRequestsSub = this.userService.getAllUserRequests().subscribe({
      next: (response) => {
        if (response.status == 'success') {
          this.userRequests = response.data;
          this.userRequestCount = this.userRequests.length;
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
        }
        this.error = true;
        this.errormessage = err.error;
        this.openSnackBar(err.error);
      },
    });
  }

  getAllTeams() {
    this.sub = this.teamService.getAllTeams().subscribe({
      next: (response: any) => {
        if (response?.get('allTeams').status == 'success') {
          this.teams = response.get('allTeams').teamMap;
        }
      },
      error: (err) => {
        this.openSnackBar(err.error);
        console.log(err.error);
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
