import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared-components/shared.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardAccessGuard } from '../dashboard/dashboard-access.guard';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PersonalInfoFormComponent } from './personal-info-form/personal-info-form.component';
import { DashboardModule } from '../dashboard/dashboard.module';
import { MatTabsModule } from '@angular/material/tabs';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@NgModule({
  declarations: [
    WelcomeComponent,
    LoginComponent,
    SignupComponent,
    PersonalInfoFormComponent,
    UserProfileComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatTabsModule,
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
      {
        path: 'profile',
        component: UserProfileComponent,
      },
    ]),
    DashboardModule,
  ],
  exports: [CommonModule],
})
export class WelcomeModule {}
