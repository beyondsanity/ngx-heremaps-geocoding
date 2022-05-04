# NgxHeremapsGeocoding

Easy geocoding for Angular using [Here Maps](https://developer.here.com/) services.

## Installation

Run ```npm install ngx-heremaps-geocoding``` or ```yarn add ngx-heremaps-geocoding```.

Import the library inside your desired module, passing your [Here Maps](https://developer.here.com/) credentilas:

```
@NgModule({
    imports: [
        ...
        NgxHeremapsGeocodingModule.forRoot({
          app_code: [YOUR_HEREMAPS_APP_CODE],
          app_id: [YOUR_HEREMAPS_APP_ID]
        })
        ...
```

Inside your angular.json, import heremaps scripts

```
[your-project]: {
  architect: {
    [...],
    build: {
      [...],
      options: {
        [...]
            "scripts": [
              "node_modules/here-js-api/scripts/mapsjs-core.js",
              "node_modules/here-js-api/scripts/mapsjs-service.js"
            ]
      }
    }
  }
}
```
            

## Usage
Import the service:

```constructor(private geocoder: NgxHeremapsGeocodingService) {}```

Use the **geocode** method to get a list of possible positions from an address:

```
this.geocoder.geocode('Via del Corso, Roma - Italy')
  .subscribe(
     geocodeResults => console.log('my results: ', geocodeResults)
  );
```

Use the **search** method to search for an address or a point of interest:

```
this.geocoder.search('Colosseo')
  .subscribe(
     geocodeResults => console.log('my results: ', geocodeResults)
  );
```

---

Contributions are welcome.
