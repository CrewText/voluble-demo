import { TestBed } from '@angular/core/testing';

import { ServicechainService } from './servicechain.service';

describe('ServicechainService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicechainService = TestBed.get(ServicechainService);
    expect(service).toBeTruthy();
  });
});
