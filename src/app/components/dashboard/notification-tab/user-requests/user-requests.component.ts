import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-requests',
  templateUrl: './user-requests.component.html',
  styleUrls: ['./user-requests.component.css'],
})
export class UserRequestsComponent implements OnInit {
  sub!: Subscription | undefined;

  @Input() requests: any[] = [];

  @Output() userRequestsLength = new EventEmitter();

  constructor(
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    //this.getAllUserRequests();
  }

  getAllUserRequests() {
    this.sub = this.userService.getAllUserRequests().subscribe({
      next: (response: any) => {
        if (response.status == 'success') {
          this.requests = response.data;

          this.userRequestsLength.emit(this.requests.length);
        }
      },
      error: (err) => this.openSnackBar(err.error),
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 1000,
      panelClass: ['snackbar'],
    });
  }
}
