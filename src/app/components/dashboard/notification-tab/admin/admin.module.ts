import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared-components/shared.module';
import { AddTeamComponent } from './add-team/add-team.component';
import { DeleteTeamComponent } from './delete-team/delete-team.component';
import { UpdateTeamMembersComponent } from './update-team-members/update-team-members.component';

@NgModule({
  declarations: [
    AddTeamComponent,
    DeleteTeamComponent,
    UpdateTeamMembersComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [
    CommonModule,
    AddTeamComponent,
    DeleteTeamComponent,
    UpdateTeamMembersComponent,
  ],
})
export class AdminModule {}
