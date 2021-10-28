import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared-components/shared.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NotificationComponent } from '../dashboard/notification/notification.component';
import { RequestNotificationComponent } from '../dashboard/request-notification/request-notification.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { NotificationTabComponent } from '../dashboard/notification-tab/notification-tab.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    WelcomeComponent,
    DashboardComponent,
    LoginComponent,
    SignupComponent,
    NotificationComponent,
    RequestNotificationComponent,
    NotificationTabComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatTabsModule,
    MatSidenavModule,
    MatListModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'dashboard', component: DashboardComponent },
    ]),
  ],
  exports: [CommonModule],
})
export class WelcomeModule {}
