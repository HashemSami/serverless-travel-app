/**
 * Fields in a request to create a single TODO item.
 */
export interface CreateTripRequest {
  region: string;
  country: string;
  city: string;
  travelDate: number;
  countryInfo: any;
  attachmentUrl?: string;
}
