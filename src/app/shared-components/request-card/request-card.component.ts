import { Component, Input, OnInit } from '@angular/core';
import { Request } from 'src/app/models/request';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-request-card',
  templateUrl: './request-card.component.html',
  styleUrls: ['./request-card.component.css'],
})
export class RequestCardComponent implements OnInit {
  @Input() request?: Request;

  constructor() {}

  ngOnInit(): void {}
}
