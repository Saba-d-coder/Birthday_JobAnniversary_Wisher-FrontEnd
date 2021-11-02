import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css'],
})
export class TeamDetailsComponent implements OnInit {
  sub!: Subscription | undefined;

  constructor(
    private router: Router,
    private teamService: TeamService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllTeamMembers();
    this.getTeamDetails();
  }

  getTeamDetails() {
    this.sub = this.teamService.getTeamDetails().subscribe({
      next: (response: any) => {
        if (response.status == 'success') {
          console.log(response.data);
        } else {
          // this.openSnackBar(response.message);
        }
      },
      error: (err) => this.openSnackBar(err.error.message),
    });
  }

  getAllTeamMembers() {
    this.sub = this.teamService.getTeamMembers().subscribe({
      next: (response: any) => {
        if (response.status == 'success') {
          console.log(response.data);
        } else {
          // this.openSnackBar(response.message);
        }
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
