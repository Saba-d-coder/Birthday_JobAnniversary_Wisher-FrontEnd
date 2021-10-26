import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestWelcomeComponent } from './test-welcome/test-welcome.component';
import { FormsModule } from '@angular/forms';
import { TestLoginComponent } from './test-login/test-login.component';

@NgModule({
  declarations: [TestWelcomeComponent, TestLoginComponent],
  imports: [CommonModule, FormsModule],
  exports: [TestWelcomeComponent, TestLoginComponent],
})
export class TestModuleModule {}
