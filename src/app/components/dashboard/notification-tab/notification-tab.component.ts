import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-notification-tab',
  templateUrl: './notification-tab.component.html',
  styleUrls: ['./notification-tab.component.css'],
})
export class NotificationTabComponent implements OnInit {
  @Input() index: number = 1;
  @Output() indexChange = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  get indexValue(): number {
    return this.index;
  }

  set indexValue(value: number) {
    this.index = value;
    this.indexChange.emit(this.index);
  }
}
