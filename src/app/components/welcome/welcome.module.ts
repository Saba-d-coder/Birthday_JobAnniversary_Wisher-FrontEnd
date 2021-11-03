import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared-components/shared.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { EventNotificationComponent } from '../dashboard/notification-tab/event-notification/event-notification.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { NotificationTabComponent } from '../dashboard/notification-tab/notification-tab.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeamSettingsComponent } from '../dashboard/notification-tab/team-settings/team-settings.component';
import { DashboardAccessGuard } from '../dashboard/dashboard-access.guard';
import { TeamDetailsComponent } from '../dashboard/notification-tab/team-details/team-details.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserRequestsComponent } from '../dashboard/notification-tab/user-requests/user-requests.component';
import { PersonalInfoFormComponent } from './personal-info-form/personal-info-form.component';
import { AdminRequestsComponent } from '../dashboard/notification-tab/admin-requests/admin-requests.component';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    WelcomeComponent,
    DashboardComponent,
    LoginComponent,
    SignupComponent,
    NotificationTabComponent,
    EventNotificationComponent,
    TeamSettingsComponent,
    TeamDetailsComponent,
    UserRequestsComponent,
    PersonalInfoFormComponent,
    AdminRequestsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatTabsModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'form',
        component: PersonalInfoFormComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [DashboardAccessGuard],
      },
    ]),
  ],
  exports: [CommonModule],
})
export class WelcomeModule {}
