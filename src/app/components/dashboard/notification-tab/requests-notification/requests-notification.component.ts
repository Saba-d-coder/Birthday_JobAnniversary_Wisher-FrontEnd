import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-requests-notification',
  templateUrl: './requests-notification.component.html',
  styleUrls: ['./requests-notification.component.css'],
})
export class RequestsNotificationComponent implements OnInit {
  sub!: Subscription | undefined;
  userID!: number;
  @Input() teams: any[] = [];
  @Input() requests: any[] = [];
  @Input() adminRequest!: boolean;
  @Output() adminRequestsLength = new EventEmitter();

  constructor(
    private userService: UserService,
    private adminService: AdminService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userService.updateCurrentUser();
    this.userID = this.userService.currentUser?.user['userID'];
  }

  getAllPendingRequests() {
    this.sub = this.adminService.getAllPendingRequests(this.userID).subscribe({
      next: (response: any) => {
        if (response.status == 'success') {
          this.requests = response.data;
          this.adminRequestsLength.emit(this.requests.length);
        }
      },
      error: (err) => {
        this.openSnackBar(err.error);
      },
    });
  }

  refresh() {
    this.getAllPendingRequests();
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 1000,
      panelClass: ['snackbar'],
    });
  }
}
