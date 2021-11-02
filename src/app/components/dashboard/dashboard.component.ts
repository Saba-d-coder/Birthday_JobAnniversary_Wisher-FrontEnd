import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { TeamSettingsComponent } from './notification-tab/team-settings/team-settings.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  title = 'Dashboard';
  admin: boolean = false;
  inTeam: boolean = false;
  index: number = 0;

  constructor(private userService: UserService, public dialog: MatDialog) {}

  ngOnInit(): void {
    // getting user's role
    this.admin = this.userService.isAdmin();
    this.inTeam = this.userService.inTeam();
  }

  openDialog() {
    this.dialog.open(TeamSettingsComponent, {
      height: '400px',
      width: '600px',
      data: {
        team: 'Dev Team',
      },
    });
  }
}
