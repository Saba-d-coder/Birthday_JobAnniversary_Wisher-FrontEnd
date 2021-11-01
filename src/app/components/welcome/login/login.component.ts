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
  loading: boolean = false;

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
    this.loading = true;

    this.sub = this.userService.login(this.userAuth.value).subscribe({
      next: (response: any) => {
        if (response.status == 'success') {
          console.log(response.data);
          this.userService.authToken = response.data;
          this.openSnackBar(response.message);

          // setting loggedIn true for guard on homepage
          this.userService.loggedIn();
          this.router.navigate(['/home'], { replaceUrl: true });
        } else {
          this.openSnackBar(response.message);
        }
        this.loading = false;
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
