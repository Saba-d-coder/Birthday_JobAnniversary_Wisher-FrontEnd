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

  // to store counts of events
  eventCounts = new Map();
  // to store count of requests
  adminRequestCount: number = 0;
  userRequestCount: number = 0;

  constructor(private userService: UserService, public dialog: MatDialog) {}

  ngOnInit(): void {
    // getting user's role and
    this.admin = this.userService.isAdmin();
    this.inTeam = this.userService.inTeam();
  }

  // this method is called when notification-tab component emits the event
  setEventCount(data: any) {
    this.eventCounts = data;
  }

  // this method is called when notification-tab component emits the event
  setAdminRequestCount(data: any) {
    this.adminRequestCount = data;
  }

  setUserRequestCount(data: any) {
    this.userRequestCount = data;
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
