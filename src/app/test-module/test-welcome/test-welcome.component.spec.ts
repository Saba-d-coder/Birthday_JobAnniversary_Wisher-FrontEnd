import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestWelcomeComponent } from './test-welcome.component';

describe('TestWelcomeComponent', () => {
  let component: TestWelcomeComponent;
  let fixture: ComponentFixture<TestWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestWelcomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
