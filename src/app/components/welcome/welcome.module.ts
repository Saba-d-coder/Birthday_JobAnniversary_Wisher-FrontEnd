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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { FormAccessGuard } from './personal-info-form/form-access-guard.guard';
import { MatIconModule } from '@angular/material/icon';

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
    MatFormFieldModule,
    MatTabsModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'form',
        component: PersonalInfoFormComponent,
        canActivate: [FormAccessGuard],
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
