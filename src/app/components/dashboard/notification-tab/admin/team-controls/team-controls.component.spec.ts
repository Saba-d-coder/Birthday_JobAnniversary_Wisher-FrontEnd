import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamControlsComponent } from './team-controls.component';

describe('UpdateTeamMembersComponent', () => {
  let component: TeamControlsComponent;
  let fixture: ComponentFixture<TeamControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamControlsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
