import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Team } from 'src/app/models/team';
import { AdminService } from 'src/app/services/admin.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';
import { ConfirmTeamDeleteComponent } from '../confirm-team-delete/confirm-team-delete.component';

@Component({
  selector: 'app-team-controls',
  templateUrl: './team-controls.component.html',
  styleUrls: ['./team-controls.component.css'],
})
export class TeamControlsComponent implements OnInit {
  sub!: Subscription | undefined;
  teamList: Team[] = [];
  teams: any;
  loading: boolean = false;
  panelOpenState = false;
  currentUser!: string;

  constructor(
    private router: Router,
    private teamService: TeamService,
    public dialog: MatDialog,
    private adminService: AdminService,
    private _snackBar: MatSnackBar,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.updateCurrentUser();
    this.currentUser = this.userService.currentUser?.user['userID'];
    this.getAllTeams();
    this.getAllTeamsData();
  }

  getAllTeams() {
    this.loading = true;
    this.sub = this.teamService.getAllTeams().subscribe({
      next: (response) => {
        if (response.status == 'success') {
          this.teamList = response.data;
          this.loading = false;
        }
      },
      error: (err) => {
        this.loading = false;
        this.openSnackBar(err.error);
      },
    });
  }

  getAllTeamsData() {
    this.loading = true;
    this.sub = this.teamService.getAllTeamsData().subscribe({
      next: (response) => {
        if (response.status == 'success') {
          this.teams = response.data[0];
          this.loading = false;
        }
      },
      error: (err) => {
        this.loading = false;
        this.openSnackBar(err.error);
      },
    });
  }

  checkForMembers(key: any): boolean {
    return this.teams.hasOwnProperty(key) ? true : false;
  }

  getMembers(key: any): Array<any> {
    return Array.from(this.teams[key].values());
  }

  removeFromTeam(userID: any) {
    this.loading = true;
    this.sub = this.adminService.removeTeamMember(userID).subscribe({
      next: (response: any) => {
        if (response.status == 'success') {
          this.loading = false;
          this.ngOnInit();
          this.openSnackBar(response.message);
        }
      },
      error: (err) => {
        this.loading = true;
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

  deleteTeam(team: any) {
    var confirmation: boolean = false;

    const dialogRef = this.dialog.open(ConfirmTeamDeleteComponent, {
      height: '40%',
      width: '30%',
      data: team,
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      if (data.confirmation === true) {
        this.deleteTeamConfirmed(team.teamID);
      } else {
        this.openSnackBar('Confirmation failed, please try again!');
      }
    });
  }

  deleteTeamConfirmed(teamID: number): void {
    this.adminService.deleteTeam(teamID).subscribe({
      next: (response: any) => {
        if (response.status == 'success') {
          this.loading = false;
          this.ngOnInit();
          this.openSnackBar(response.message);
        }
      },
      error: (err) => {
        this.loading = true;
        this.openSnackBar(err.error);
        console.log(err.error);
      },
    });
  }
}
