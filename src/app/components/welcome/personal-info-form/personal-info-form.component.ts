import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-personal-info-form',
  templateUrl: './personal-info-form.component.html',
  styleUrls: ['./personal-info-form.component.css'],
})
export class PersonalInfoFormComponent implements OnInit {
  sub!: Subscription | undefined;
  loading: boolean = false;
  minDate = new Date(new Date().setFullYear(new Date().getFullYear() - 80));
  maxBirthDate = new Date(
    new Date().setFullYear(new Date().getFullYear() - 20)
  );
  maxHireDate = new Date();

  userData = this.formBuilder.group({
    birthDate: null,
    hireDate: null,
    gender: null,
    address: null,
    contact: null,
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  submit(): void {
    // this.loading = true;
    console.log(this.userData.value);
    // this.sub = this.userService.updateDetails(this.userData.value).subscribe({
    //   next: (response: any) => {
    //     if (response.status == 'success') {
    //       console.log(response.data);
    //       this.userService.authToken = response.data['authToken'];
    //       this.openSnackBar(response.message);

    //       // setting loggedIn true for guard on homepage
    //       this.userService.toggleLoggedIn();
    this.router.navigate(['/dashboard']);
    //     } else {
    //       this.openSnackBar(response.message);
    //     }
    //     this.loading = false;
    //   },
    //   error: (err) => this.openSnackBar(err.error.message),
    // });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 1000,
      panelClass: ['snackbar'],
    });
  }
}
