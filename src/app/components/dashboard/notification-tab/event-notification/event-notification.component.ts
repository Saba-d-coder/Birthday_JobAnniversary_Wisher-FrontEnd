import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-event-notification',
  templateUrl: './event-notification.component.html',
  styleUrls: ['./event-notification.component.css'],
})
export class EventNotificationComponent implements OnInit {
  // index to know if it's birthday or anniversary tab
  @Input() index: number = 0;

  sub!: Subscription | undefined;

  // storing retrieved bdays and aniiversaries
  birthdays: any[] = [];
  anniversaries: any[] = [];
  loading: boolean = false;

  // if there is any error then display it
  error: boolean = false;
  errormessage: string = '';

  // this event emitter emits counts of events to notification-tab component
  @Output() eventsLength = new EventEmitter();

  constructor(
    private router: Router,
    private teamService: TeamService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getTeamEvents();
  }

  getTeamEvents() {
    this.loading = true;
    var length = new Map();
    this.sub = this.teamService.getUpcomingEvents().subscribe({
      next: (response) => {
        if (response.status == 'success') {
          this.birthdays = response.data.Birthday;
          this.anniversaries = response.data.Anniversary;

          // just to store counts of resp events to display in side nav

          length.set('bdayEvents', this.birthdays.length);
          length.set('anniversaryEvents', this.anniversaries.length);
          this.eventsLength.emit(length);

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
        length.set('bdayEvents', 0);
        length.set('anniversaryEvents', 0);
        this.eventsLength.emit(length);
        this.error = true;
        this.errormessage = err.error.message;
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
