import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared-components/shared.module';
import { AddTeamComponent } from './add-team/add-team.component';
import { TeamControlsComponent } from './team-controls/team-controls.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmTeamDeleteComponent } from './confirm-team-delete/confirm-team-delete.component';

@NgModule({
  declarations: [
    AddTeamComponent,
    TeamControlsComponent,
    ConfirmTeamDeleteComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatExpansionModule,
    ReactiveFormsModule,
  ],
  exports: [CommonModule, AddTeamComponent, TeamControlsComponent],
})
export class AdminModule {}
