import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-email-wishes',
  templateUrl: './email-wishes.component.html',
  styleUrls: ['./email-wishes.component.css'],
})
export class EmailWishesComponent implements OnInit {
  sub!: Subscription | undefined;
  loading: boolean = false;

  emailWish = this.formBuilder.group({
    message: null,
    subject: this.data.subject,
    fromID: this.userService.currentUser?.user['userID'],
  });

  @Output() wishData = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<EmailWishesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  submit() {
    this.sub = this.userService
      .sendEventWishes(this.data.toUserID, this.emailWish.value)
      .subscribe({
        next: (response: any) => {
          if (response.status == 'success') {
            this.dialogRef.close({ reload: true });
            this.openSnackBar(response.message);
          } else {
            this.dialogRef.close();
            this.openSnackBar(response.message);
          }
        },
        error: (err) => {
          this.dialogRef.close(), this.openSnackBar(err.error);
        },
      });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
      panelClass: ['snackbar'],
    });
  }
}
