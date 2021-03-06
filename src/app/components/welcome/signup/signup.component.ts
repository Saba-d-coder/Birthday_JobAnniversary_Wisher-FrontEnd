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
  show: boolean = false;

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

  togglePwdVisibility() {
    this.show = !this.show;
  }

  submit(): void {
    this.sub = this.userService.signup(this.userData.value).subscribe({
      next: (response: any) => {
        if (response.status == 'success') {
          localStorage.setItem(
            'currentUser',
            JSON.stringify({
              token: response.token,
              user: response.data,
            })
          );

          localStorage.setItem(
            'loginStatus',
            JSON.stringify({ isLoggedIn: true })
          );
          this.openSnackBar(response.message);

          this.router.navigate(['/form']);
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
