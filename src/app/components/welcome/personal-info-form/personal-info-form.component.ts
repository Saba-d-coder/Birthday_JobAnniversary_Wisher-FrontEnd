import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Team } from 'src/app/models/team';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-personal-info-form',
  templateUrl: './personal-info-form.component.html',
  styleUrls: ['./personal-info-form.component.css'],
})
export class PersonalInfoFormComponent implements OnInit {
  sub!: Subscription | undefined;
  loading: boolean = false;
  teams: Team[] = [];
  minDate = new Date(new Date().setFullYear(new Date().getFullYear() - 80));
  maxBirthDate = new Date(
    new Date().setFullYear(new Date().getFullYear() - 20)
  );
  maxHireDate = new Date();

  userData = this.formBuilder.group({
    birthDate: null,
    hireDate: null,
    gender: null,
    address: null,
    contact: null,
    teamID: null,
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private teamService: TeamService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllTeams();
  }

  getAllTeams() {
    this.loading = true;
    this.sub = this.teamService.getAllTeams().subscribe({
      next: (response: any) => {
        if (response?.get('allTeams').status == 'success') {
          this.teams = response.get('allTeams').data;
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
    this.sub = this.userService.updateUserInfo(this.userData.value).subscribe({
      next: (response: any) => {
        if (response.status == 'success') {
          this.openSnackBar(response.message);
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => {
        this.openSnackBar(err.error), console.log(err.error);
      },
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
      panelClass: ['snackbar'],
    });
  }
}
