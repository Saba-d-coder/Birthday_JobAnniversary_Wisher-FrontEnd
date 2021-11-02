import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  sub!: Subscription | undefined;

  userData = this.formBuilder.group({
    username: null,
    firstName: null,
    lastName: null,
    email: null,
    password: null,
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  submit(): void {
    this.sub = this.userService.signup(this.userData.value).subscribe({
      next: (response: any) => {
        if (response.status == 'success') {
          console.log(response.data);
          this.userService.authToken = response.data['authToken'];
          this.openSnackBar(response.message);

          this.userService.isLoggedIn = true;
          this.router.navigate(['/form']);
        } else {
          this.openSnackBar(response.message);
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
