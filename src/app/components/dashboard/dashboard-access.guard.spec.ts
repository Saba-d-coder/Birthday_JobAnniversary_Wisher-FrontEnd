import { TestBed } from '@angular/core/testing';

import { DashboardAccessGuard } from './dashboard-access.guard';

describe('DashboardAccessGuard', () => {
  let guard: DashboardAccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DashboardAccessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
