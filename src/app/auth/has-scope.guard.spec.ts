import { TestBed, async, inject } from '@angular/core/testing';

import { HasScopeGuard } from './has-scope.guard';

describe('HasScopeGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HasScopeGuard]
    });
  });

  it('should ...', inject([HasScopeGuard], (guard: HasScopeGuard) => {
    expect(guard).toBeTruthy();
  }));
});
