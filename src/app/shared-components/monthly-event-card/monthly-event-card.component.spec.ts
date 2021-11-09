import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyEventCardComponent } from './monthly-event-card.component';

describe('MonthlyEventCardComponent', () => {
  let component: MonthlyEventCardComponent;
  let fixture: ComponentFixture<MonthlyEventCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyEventCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyEventCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
