import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestWelcomeComponent } from './test-welcome/test-welcome.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestLoginComponent } from './test-login/test-login.component';
import { TestEmployeesComponent } from './test-employees/test-employees.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    TestWelcomeComponent,
    TestLoginComponent,
    TestEmployeesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
  exports: [TestWelcomeComponent, TestLoginComponent, TestEmployeesComponent],
})
export class TestModuleModule {}
