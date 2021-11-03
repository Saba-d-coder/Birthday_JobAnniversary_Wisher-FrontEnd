import { LowerCasePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css'],
})
export class TeamDetailsComponent implements OnInit {
  sub!: Subscription | undefined;
  teamName: string = '';
  teamDesc: string = '';
  teamMembers: User[] = [];
  loading: boolean = false;
  errormessage: string = '';
  error: boolean = false;
  panelOpenState = false;

  constructor(
    private router: Router,
    private teamService: TeamService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getTeamDetails();
    this.getAllTeamMembers();
  }

  getTeamDetails() {
    this.loading = true;
    this.sub = this.teamService.getTeamDetails().subscribe({
      next: (response) => {
        if (response.status == 'success') {
          console.log(response.data);
          this.teamName = response.data.teamname;
          this.teamDesc = response.data.description;
          this.loading = false;
        } else {
          this.error = true;
          this.errormessage = response.message;
          this.openSnackBar(response.message);
          this.loading = false;
        }
      },
      error: (err) => {
        this.error = true;
        (this.errormessage = err.error.message),
          this.openSnackBar(err.error.message);
      },
    });
  }

  getAllTeamMembers() {
    this.sub = this.teamService.getTeamMembers().subscribe({
      next: (response) => {
        if (response.status == 'success') {
          console.log(response.data);
          this.teamMembers = response.data;
          this.loading = false;
        } else {
          this.error = true;
          this.errormessage = response.message;
          this.openSnackBar(response.message);
          this.loading = false;
        }
      },
      error: (err) => {
        this.error = true;
        (this.errormessage = err.error.message),
          this.openSnackBar(err.error.message);
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
