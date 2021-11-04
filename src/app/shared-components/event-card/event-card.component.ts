import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TeamSettingsComponent } from 'src/app/components/dashboard/notification-tab/team-settings/team-settings.component';
import { EmailWishesComponent } from '../email-wishes/email-wishes.component';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css'],
})
export class EventCardComponent implements OnInit {
  @Input() notification!: any;
  @Input() birthday: boolean = false;
  @Input() anniversary: boolean = false;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog() {
    const dialogRef = this.dialog.open(EmailWishesComponent, {
      data: {
        subject: this.birthday ? 'BIRTHDAY_WISHES' : 'JOB_ANNIVERSARY_WISHES',
        toUserID: this.notification.user_ID,
      },
    });

    dialogRef.afterClosed().subscribe((reload) => {
      if (reload) {
        window.location.reload();
      }
    });
  }
}
