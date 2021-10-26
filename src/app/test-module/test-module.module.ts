import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestWelcomeComponent } from './test-welcome/test-welcome.component';
import { FormsModule } from '@angular/forms';
import { TestLoginComponent } from './test-login/test-login.component';
import { TestEmployeesComponent } from './test-employees/test-employees.component';

@NgModule({
  declarations: [
    TestWelcomeComponent,
    TestLoginComponent,
    TestEmployeesComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [TestWelcomeComponent, TestLoginComponent, TestEmployeesComponent],
})
export class TestModuleModule {}
