export interface TripItem {
  userId: string;
  tripId: string;
  createdAt: string;
  region: string;
  country: string;
  city: string;
  travelDate: number;
  countryInfo: any;
  longitude: string;
  latitude: string;
  max_temp: number;
  min_temp: number;
  weather: string;
  imageURL: string;
  tags: string;
  attachmentUrl?: string;
}
