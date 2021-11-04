import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  sub!: Subscription | undefined;

  userAuth = this.formBuilder.group({
    username: null,
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
    this.sub = this.userService.login(this.userAuth.value).subscribe({
      next: (response: any) => {
        if (response.status == 'success') {
          this.openSnackBar(response.message);
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

          this.router.navigate(['/dashboard'], { replaceUrl: true });
        } else {
          this.openSnackBar(response.message);
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
