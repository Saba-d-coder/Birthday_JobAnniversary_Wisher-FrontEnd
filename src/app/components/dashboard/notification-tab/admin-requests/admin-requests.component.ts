import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-admin-requests',
  templateUrl: './admin-requests.component.html',
  styleUrls: ['./admin-requests.component.css'],
})
export class AdminRequestsComponent implements OnInit {
  sub!: Subscription | undefined;

  requests: any[] = [];

  // this event emitter emits counts of events to notification-tab component
  @Output() requestsLength = new EventEmitter();

  constructor(
    private router: Router,
    private adminService: AdminService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllRequests();
  }

  getAllRequests() {
    this.sub = this.adminService.getAllRequests().subscribe({
      next: (response: any) => {
        if (response.status == 'success') {
          this.requests = response.data;
          console.log(this.requests);

          this.requestsLength.emit(this.requests.length);
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
