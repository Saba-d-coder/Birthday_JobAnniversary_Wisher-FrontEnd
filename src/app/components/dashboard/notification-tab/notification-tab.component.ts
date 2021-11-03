import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-notification-tab',
  templateUrl: './notification-tab.component.html',
  styleUrls: ['./notification-tab.component.css'],
})
export class NotificationTabComponent implements OnInit {
  @Input() index: number = 1;
  @Output() indexChange = new EventEmitter();

  // this event emits the data received from event notification component to dashboard component
  @Output() eventsLengthRetrieved = new EventEmitter();
  @Output() requestsLengthRetrieved = new EventEmitter();

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
    this.requestsLengthRetrieved.emit(data);
  }
}
