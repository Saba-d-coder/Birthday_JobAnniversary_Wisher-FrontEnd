import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-monthly-event-card',
  templateUrl: './monthly-event-card.component.html',
  styleUrls: ['./monthly-event-card.component.css'],
})
export class MonthlyEventCardComponent implements OnInit {
  @Input() notification!: any;
  @Input() birthday: boolean = false;
  @Input() anniversary: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
