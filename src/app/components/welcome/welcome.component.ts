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
    this.loading = this.router.getCurrentNavigation()?.extras.state?.loading;

    setTimeout(() => (this.loading = false), 1000);
  }

  ngOnInit(): void {}
}
