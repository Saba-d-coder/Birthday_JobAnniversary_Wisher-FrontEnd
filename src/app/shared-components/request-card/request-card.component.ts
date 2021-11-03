import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Request } from 'src/app/models/request';
import { User } from 'src/app/models/user';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-request-card',
  templateUrl: './request-card.component.html',
  styleUrls: ['./request-card.component.css'],
})
export class RequestCardComponent implements OnInit {
  approveSub: Subscription | undefined;
  declineSub: Subscription | undefined;

  @Input() request?: Request;

  @Output() refreshRequests = new EventEmitter();

  constructor(
    private adminService: AdminService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  approveRequest(): void {
    this.approveSub = this.adminService
      .approveRequest(this.request!.requestID)
      .subscribe({
        next: (response: any) => {
          if (response.status == 'success') {
            this.openSnackBar(response.message);
            this.refreshRequests.emit('Refresh requests');
          } else {
            // this.openSnackBar(response.message);
          }
        },
        error: (err) => this.openSnackBar(err.error.message),
      });
  }

  declineRequest(): void {
    this.declineSub = this.adminService
      .declineRequest(this.request!.requestID)
      .subscribe({
        next: (response: any) => {
          if (response.status == 'success') {
            this.openSnackBar(response.message);
            this.refreshRequests.emit('Refresh requests');
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
