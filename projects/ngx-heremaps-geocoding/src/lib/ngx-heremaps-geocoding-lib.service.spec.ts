import { TestBed } from '@angular/core/testing';

import { NgxHeremapsGeocodingService } from './ngx-heremaps-geocoding.service';

describe('NgxHeremapsGeocodingLibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxHeremapsGeocodingService = TestBed.get(NgxHeremapsGeocodingService);
    expect(service).toBeTruthy();
  });
});
