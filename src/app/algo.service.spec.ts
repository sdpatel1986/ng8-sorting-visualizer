import { TestBed } from '@angular/core/testing';

import { AlgoService } from './algo.service';

describe('AlgoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlgoService = TestBed.get(AlgoService);
    expect(service).toBeTruthy();
  });
});
