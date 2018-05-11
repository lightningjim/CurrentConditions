import { TestBed, inject } from '@angular/core/testing';

import { DarkSkyService } from './dark-sky.service';

describe('DarkSkyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DarkSkyService]
    });
  });

  it('should be created', inject([DarkSkyService], (service: DarkSkyService) => {
    expect(service).toBeTruthy();
  }));
});
