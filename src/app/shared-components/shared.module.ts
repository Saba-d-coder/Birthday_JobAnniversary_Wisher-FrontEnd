import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RequestCardComponent } from './request-card/request-card.component';

import {
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material/dialog';
import { EventCardComponent } from './event-card/event-card.component';
import { EmailWishesComponent } from './email-wishes/email-wishes.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    EventCardComponent,
    RequestCardComponent,
    EmailWishesComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  exports: [
    HeaderComponent,
    CommonModule,
    EventCardComponent,
    EmailWishesComponent,
    RequestCardComponent,
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } },
  ],
})
export class SharedModule {}
