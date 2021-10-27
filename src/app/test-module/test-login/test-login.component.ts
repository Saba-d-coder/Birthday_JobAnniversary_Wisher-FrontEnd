import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticateService } from 'src/app/authenticate.service';

@Component({
  selector: 'app-test-login',
  templateUrl: './test-login.component.html',
  styleUrls: ['./test-login.component.css'],
})
export class TestLoginComponent {
  public data: String = '';
  public received: boolean = false;

  loginForm = this.fb.group({
    username: null,
    password: null,
  });

  constructor(
    private fb: FormBuilder,
    private authenticateService: AuthenticateService
  ) {}

  onSubmit(): void {
    const formValue = this.loginForm.value;

    this.authenticateService
      .authenticateSignIn(formValue.username, formValue.password)
      .subscribe((responseBody) => {
        this.data = JSON.stringify(responseBody);
        this.received = true;
      });
  }
}
