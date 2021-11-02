import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  @Input() index: number = 0;
  sub!: Subscription | undefined;

  constructor(
    private router: Router,
    private teamService: TeamService,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.getTeamUpcomingEvents();
  }

  getTeamUpcomingEvents() {
    this.sub = this.teamService.getUpcomingEvents().subscribe({
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
