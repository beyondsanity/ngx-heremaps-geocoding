export interface GeocodingResult {
  lat: number;
  lng: number;
  formattedAddress?: string;
}

export interface HeremapsCredentials {
  app_id: string;
  app_code: string;
}
