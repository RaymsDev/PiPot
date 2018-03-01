import { TestBed, inject } from '@angular/core/testing';

import { GreenhouseService } from './greenhouse.service';

describe('GreenhouseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GreenhouseService]
    });
  });

  it('should be created', inject([GreenhouseService], (service: GreenhouseService) => {
    expect(service).toBeTruthy();
  }));
});
