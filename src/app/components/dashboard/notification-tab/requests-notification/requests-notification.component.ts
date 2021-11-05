import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-requests-notification',
  templateUrl: './requests-notification.component.html',
  styleUrls: ['./requests-notification.component.css'],
})
export class RequestsNotificationComponent implements OnInit {
  sub!: Subscription | undefined;

  @Input() teams: any[] = [];
  @Input() requests: any[] = [];
  @Input() adminRequest!: boolean;
  @Output() userRequestsLength = new EventEmitter();

  constructor(
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}
}
