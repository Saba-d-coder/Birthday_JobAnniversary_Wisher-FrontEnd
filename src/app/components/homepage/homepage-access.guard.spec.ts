import { TestBed } from '@angular/core/testing';

import { HomepageAccessGuard } from './homepage-access.guard';

describe('HomepageAccessGuard', () => {
  let guard: HomepageAccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HomepageAccessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
