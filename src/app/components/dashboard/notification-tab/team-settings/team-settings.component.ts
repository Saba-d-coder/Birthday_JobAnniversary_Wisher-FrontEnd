import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-team-settings',
  templateUrl: './team-settings.component.html',
  styleUrls: ['./team-settings.component.css'],
})
export class TeamSettingsComponent implements OnInit {
  currentTeamID!: number;
  sub!: Subscription | undefined;
  loading: boolean = false;
  teams: any[] = [];
  teamRequest = this.formBuilder.group({
    teamID: null,
  });

  // To inject data passed from dashboard sidenav
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private teamService: TeamService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllTeams();
    console.log(this.data);
    this.userService.updateCurrentUser();
    this.currentTeamID = this.userService.currentUser?.user['teamID'];
  }

  getAllTeams() {
    this.loading = true;
    this.sub = this.teamService.getAllTeams().subscribe({
      next: (response: any) => {
        if (response.status == 'success') {
          this.teams = response.data;
          this.loading = false;
        }
      },
      error: (err) => {
        this.loading = false;
        this.openSnackBar(err.error);
        console.log(err.error);
      },
    });
  }

  submit(): void {
    // this.sub = this.userService.updateUserInfo(this.teamRequest.value).subscribe({
    //   next: (response: any) => {
    //     if (response.status == 'success') {
    //       this.openSnackBar(response.message);
    //       this.router.navigate(['/dashboard']);
    //     }
    //   },
    //   error: (err) => {
    //     this.openSnackBar(err.error), console.log(err.error);
    //   },
    // });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
      panelClass: ['snackbar'],
    });
  }
}
