import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTeamMembersComponent } from './update-team-members.component';

describe('UpdateTeamMembersComponent', () => {
  let component: UpdateTeamMembersComponent;
  let fixture: ComponentFixture<UpdateTeamMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTeamMembersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTeamMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
