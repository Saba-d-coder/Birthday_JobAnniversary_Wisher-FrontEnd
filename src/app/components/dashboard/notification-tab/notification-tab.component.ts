import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Team } from 'src/app/models/team';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-notification-tab',
  templateUrl: './notification-tab.component.html',
  styleUrls: ['./notification-tab.component.css'],
})
export class NotificationTabComponent implements OnInit {
  @Input() teamDetail!: Team;
  @Input() index: number = 1;
  @Output() indexChange = new EventEmitter();

  // this event emits the data received from event notification component to dashboard component
  @Output() eventsLengthRetrieved = new EventEmitter();
  @Output() adminRequestsLengthRetrieved = new EventEmitter();
  @Output() userRequestsLengthRetrieved = new EventEmitter();

  @Input() adminRequests: any[] = [];
  @Input() userRequests: any[] = [];

  teams: any[] = [];
  errormessage: string = '';
  error: boolean = false;
  sub!: Subscription | undefined;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private teamService: TeamService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  indexValueChange(value: number) {
    this.index = value;
    this.indexChange.emit(this.index);
  }

  // this method is called when event-notification component emits the event
  emitEventLengthsToSideNav(data: any) {
    this.eventsLengthRetrieved.emit(data);
  }

  // this method is called when admin-requests component emits the event
  emitAdminRequestsLengthToSideNav(data: number) {
    this.adminRequestsLengthRetrieved.emit(data);
  }

  emitUserRequestsLengthToSideNav(data: any) {
    this.userRequestsLengthRetrieved.emit(data);
  }

  getAllTeams() {
    this.sub = this.teamService.getAllTeams().subscribe({
      next: (response: any) => {
        if (response?.get('allTeams').status == 'success') {
          this.teams = response.get('allTeams').teamMap;
        }
      },
      error: (err) => {
        console.log(err.error);
      },
    });
  }
}
