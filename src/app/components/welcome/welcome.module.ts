import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared-components/shared.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NotificationComponent } from '../dashboard/notification-tab/notification/notification.component';
import { RequestNotificationComponent } from '../dashboard/notification-tab/request-notification/request-notification.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { NotificationTabComponent } from '../dashboard/notification-tab/notification-tab.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeamSettingsComponent } from '../team-settings/team-settings.component';
import { HomepageComponent } from '../homepage/homepage.component';
import { DashboardAccessGuard } from '../dashboard/dashboard-access.guard';
import { HomepageAccessGuard } from '../homepage/homepage-access.guard';
import { TeamDetailsComponent } from '../dashboard/notification-tab/team-details/team-details.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    WelcomeComponent,
    DashboardComponent,
    LoginComponent,
    SignupComponent,
    NotificationTabComponent,
    NotificationComponent,
    RequestNotificationComponent,
    TeamSettingsComponent,
    HomepageComponent,
    TeamDetailsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatTabsModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'home',
        component: HomepageComponent,
        canActivate: [HomepageAccessGuard],
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
