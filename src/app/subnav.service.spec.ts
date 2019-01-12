import { TestBed } from '@angular/core/testing';

import { SubnavService } from './subnav.service';

describe('SubnavService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubnavService = TestBed.get(SubnavService);
    expect(service).toBeTruthy();
  });
});
