import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgxHeremapsGeocodingLibService } from './ngx-heremaps-geocoding-lib.service';
import { HeremapsCredentials } from './models';

@NgModule({
  declarations: [],
  imports: [
  ],
  exports: []
})
export class NgxHeremapsGeocodingLibModule {
  static forRoot(config: HeremapsCredentials): ModuleWithProviders {
    return {
      ngModule: NgxHeremapsGeocodingLibModule,
      providers: [
        NgxHeremapsGeocodingLibService,
        { provide: 'heremapsConfig', useValue: config }
      ]
    };
  }
}
