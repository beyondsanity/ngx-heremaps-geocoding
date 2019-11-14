import { Injectable, NgZone, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import has from 'lodash/has';
import { zip } from 'rxjs';
import { HeremapsCredentials, GeocodingResult } from './models';

declare var H: any;

@Injectable({
  providedIn: 'root'
})
export class NgxHeremapsGeocodingLibService {

  private geocoder;
  private platform;

  constructor(private ngZone: NgZone,
              @Inject('heremapsConfig') private config: HeremapsCredentials) {
    this.platform = new H.service.Platform({
      app_id: config.app_id,
      app_code: config.app_code,
      useHTTPS: true
    });
    this.geocoder = this.platform.getGeocodingService();
  }

  search(address: string): Observable<GeocodingResult[]> {
    return new Observable( observer => {
      if (!address || address === '') {
        this.zonedComplete(observer, []);
        return;
      }
      const params = { searchText : address };
      zip(this.searchLandmark(params), this.searchAddress(params))
        .subscribe(
          ([ landmarks, addresses ]) => this.zonedComplete(observer, [ ...landmarks, ...addresses ]),
          err => observer.error(err)
        );
    });
  }

  geocode(address: string): Observable<GeocodingResult[]> {
    return new Observable( observer => {
      if (!address || address === '') {
        this.zonedComplete(observer, []);
        return;
      }
      const params = { searchText : address };
      this.searchAddress(params)
        .subscribe(
          res => this.zonedComplete(observer, res),
          err => observer.error(err)
        );
    });
  }

  private searchLandmark(params): Observable<any> {
    return new Observable( observer => {
      this.geocoder.search(
        params,
        data => {
          if (!this.gotData(data)) {
            observer.next([]);
            return;
          }
          try {
            const parsedResult: GeocodingResult[] = data.Response.View[0].Result.map(
              input => {
                const obj = input.Place.Locations[0];
                return {
                  lat: obj.DisplayPosition.Latitude,
                  lng: obj.DisplayPosition.Longitude,
                  formattedAddress: obj.Name + ' - ' + obj.Address.Label
                };
              }
            );
            observer.next(parsedResult);
          } catch (err) {
            observer.next([]);
          }
        },
        err => observer.error(err)
      );

    });

  }

  private searchAddress(params): Observable<any>  {
    return new Observable( observer => {
      this.geocoder.geocode(
        params,
        data => {
          if (!this.gotData(data)) {
            observer.next([]);
            return;
          }
          const parsedResult: GeocodingResult[] = data.Response.View[0].Result.map(
            input => {
              const obj = input.Location;
              return {
                lat: obj.DisplayPosition.Latitude,
                lng: obj.DisplayPosition.Longitude,
                formattedAddress: obj.Address.Label
              };
            }
          );
          observer.next(parsedResult);
        },
        err => observer.error(err)
      );

    });
  }

  // using an external library like 'heremaps' seems to break stuff,
  // the code isn't recognized as an edit by Angular unless we told him to
  // explicitily include it in its zone
  private zonedComplete(observer, val) {
    this.ngZone.run(() => {
      observer.next(val);
      observer.complete();
    });
  }

  private gotData(data: any): boolean {
    return has(data, [ 'Response', 'View', 0, 'Result' ]);
  }
}
