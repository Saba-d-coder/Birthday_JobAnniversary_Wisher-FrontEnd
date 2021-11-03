import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css'],
})
export class EventCardComponent implements OnInit {
  @Input() notification!: any;
  @Input() birthday: boolean = false;
  @Input() anniversary: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
