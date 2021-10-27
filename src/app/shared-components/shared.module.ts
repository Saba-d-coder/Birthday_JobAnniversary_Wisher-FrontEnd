import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [HeaderComponent, FormComponent],
  imports: [CommonModule],
  exports: [HeaderComponent, CommonModule, FormComponent],
})
export class SharedModule {}
