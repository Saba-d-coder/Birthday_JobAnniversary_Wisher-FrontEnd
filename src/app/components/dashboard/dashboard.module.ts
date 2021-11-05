import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRequestsComponent } from './notification-tab/admin/admin-requests/admin-requests.component';
import { EventNotificationComponent } from './notification-tab/event-notification/event-notification.component';
import { NotificationTabComponent } from './notification-tab/notification-tab.component';
import { TeamDetailsComponent } from './notification-tab/team-details/team-details.component';
import { TeamSettingsComponent } from './notification-tab/team-settings/team-settings.component';
import { UserRequestsComponent } from './notification-tab/user-requests/user-requests.component';
import { DashboardComponent } from './dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared-components/shared.module';
import { AdminModule } from './notification-tab/admin/admin.module';
import { RouterModule } from '@angular/router';
import { PersonalInfoFormComponent } from '../welcome/personal-info-form/personal-info-form.component';
import { DashboardAccessGuard } from './dashboard-access.guard';

@NgModule({
  declarations: [
    DashboardComponent,
    NotificationTabComponent,
    EventNotificationComponent,
    TeamSettingsComponent,
    TeamDetailsComponent,
    UserRequestsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatTabsModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    AdminModule,
  ],
  exports: [CommonModule],
})
export class DashboardModule {}
