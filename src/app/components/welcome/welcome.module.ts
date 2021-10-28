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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
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
    MatListModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'dashboard', component: DashboardComponent },
    ]),
  ],
  exports: [CommonModule],
})
export class WelcomeModule {}
