import { TestBed } from '@angular/core/testing';

import { NgxHeremapsGeocodingLibService } from './ngx-heremaps-geocoding-lib.service';

describe('NgxHeremapsGeocodingLibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxHeremapsGeocodingLibService = TestBed.get(NgxHeremapsGeocodingLibService);
    expect(service).toBeTruthy();
  });
});
