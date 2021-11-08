import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmTeamDeleteComponent } from './confirm-team-delete.component';

describe('ConfirmTeamDeleteComponent', () => {
  let component: ConfirmTeamDeleteComponent;
  let fixture: ComponentFixture<ConfirmTeamDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmTeamDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmTeamDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
