import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailWishesComponent } from './email-wishes.component';

describe('EmailWishesComponent', () => {
  let component: EmailWishesComponent;
  let fixture: ComponentFixture<EmailWishesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailWishesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailWishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
