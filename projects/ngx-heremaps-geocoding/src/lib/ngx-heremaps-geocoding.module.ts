import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgxHeremapsGeocodingService } from './ngx-heremaps-geocoding.service';
import { HeremapsCredentials } from './models';

@NgModule({
  declarations: [],
  imports: [
  ],
  exports: []
})
export class NgxHeremapsGeocodingModule {
  static forRoot(config: HeremapsCredentials): ModuleWithProviders {
    return {
      ngModule: NgxHeremapsGeocodingModule,
      providers: [
        NgxHeremapsGeocodingService,
        { provide: 'heremapsConfig', useValue: config }
      ]
    };
  }
}
