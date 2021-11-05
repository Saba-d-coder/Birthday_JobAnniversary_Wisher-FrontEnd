import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Team } from 'src/app/models/team';

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

  constructor() {}

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
}
