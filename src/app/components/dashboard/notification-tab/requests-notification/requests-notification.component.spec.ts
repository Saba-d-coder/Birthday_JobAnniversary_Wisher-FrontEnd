import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsNotificationComponent } from './requests-notification.component';

describe('RequestsNotificationComponent', () => {
  let component: RequestsNotificationComponent;
  let fixture: ComponentFixture<RequestsNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestsNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
