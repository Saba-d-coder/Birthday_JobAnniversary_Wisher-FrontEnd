import { TestBed } from '@angular/core/testing';

import { FormAccessGuard } from './form-access-guard.guard';

describe('FormAccessGuard', () => {
  let guard: FormAccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FormAccessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
