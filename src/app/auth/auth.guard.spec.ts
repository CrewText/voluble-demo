import { TestBed, async, inject } from '@angular/core/testing';

import { IsAuthedGuard } from './auth.guard';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsAuthedGuard]
    });
  });

  it('should ...', inject([IsAuthedGuard], (guard: IsAuthedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
