import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Input() requests: any[] = [];

  // this event emitter emits counts of events to notification-tab component
  @Output() adminRequestsLength = new EventEmitter();

  constructor(
    private router: Router,
    private adminService: AdminService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    //this.getAllPendingRequests();
  }

  getAllPendingRequests() {
    this.sub = this.adminService.getAllPendingRequests().subscribe({
      next: (response: any) => {
        if (response.status == 'success') {
          this.requests = response.data;
          console.log(this.requests);

          this.adminRequestsLength.emit(this.requests.length);
        } else {
          // this.openSnackBar(response.message);
        }
      },
      error: (err) => this.openSnackBar(err.error.message),
    });
  }

  refreshRequests() {
    this.getAllPendingRequests();
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 1000,
      panelClass: ['snackbar'],
    });
  }
}
