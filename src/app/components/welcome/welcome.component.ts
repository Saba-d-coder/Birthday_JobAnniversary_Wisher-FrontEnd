import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  loading: boolean;

  constructor(private router: Router) {
    // state variable loading is passed from logout function in header component
    this.loading = this.router.getCurrentNavigation()?.extras.state?.loading;

    // setting delay as tabs load a little late after logout
    setTimeout(() => (this.loading = false), 1000);
  }

  ngOnInit(): void {}
}
