import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-monthly-events',
  templateUrl: './monthly-events.component.html',
  styleUrls: ['./monthly-events.component.css'],
})
export class MonthlyEventsComponent implements OnInit {
  sub!: Subscription | undefined;

  // storing retrieved bdays and aniiversaries
  birthdays: any[] = [];
  anniversaries: any[] = [];
  loading: boolean = false;
  sending: boolean = false;

  // if there is any error then display it
  error: boolean = false;
  errormessage: string = '';

  constructor(
    private router: Router,
    private adminService: AdminService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMonthlyEvents();
  }

  getMonthlyEvents() {
    this.loading = true;
    this.sub = this.adminService.getAllMonthlyEvents().subscribe({
      next: (response) => {
        if (response.status == 'success') {
          this.birthdays = response.data.Birthday;
          this.anniversaries = response.data.Anniversary;
          this.loading = false;
        }
      },
      error: (err) => {
        if (err.status == 403) {
          this.errormessage = err.error.message;
          this.openSnackBar(err.error);
          this.loading = false;
        }
        this.error = true;
        this.errormessage = err.error.message;
        this.openSnackBar(err.error.message);
        this.loading = false;
      },
    });
  }

  sendInvite() {
    this.sending = true;
    this.sub = this.adminService.sendEmailInvite().subscribe({
      next: (response) => {
        if (response.status == 'success') {
          this.openSnackBar(response.message);
          this.sending = false;
        }
      },
      error: (err) => {
        if (err.status == 403) {
          this.errormessage = err.error.message;
          this.openSnackBar(err.error);
          this.sending = false;
        }
        this.error = true;
        this.errormessage = err.error.message;
        this.openSnackBar(err.error.message);
        this.sending = false;
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
