import * as uuid from 'uuid';

import { TripItem } from '../models/TripItem';
import { TripsAccess } from '../dataLayer/tripsAccess';

import { APIGatewayProxyEvent } from 'aws-lambda';
import { getUserId } from '../lambda/utils';
import { CreateTripRequest } from '../requests/CreateTripRequest';
import { UpdateTripRequest } from '../requests/UpdateTripRequest';

import { geoName, weatherForecast, getImage } from '../api/apiCalls';

const tripsAsccess = new TripsAccess();

export async function getTrips(
  event: APIGatewayProxyEvent
): Promise<TripItem[]> {
  const userId = getUserId(event);

  return tripsAsccess.getTrips(userId);
}

export async function createTrip(
  tripRequest: CreateTripRequest,
  event: APIGatewayProxyEvent
): Promise<TripItem> {
  const { region, country, city, travelDate, countryInfo } = tripRequest;

  const geoNameRes = await geoName(city, countryInfo.alpha2Code);

  if (
    geoNameRes === 'COUNTRY MATCHING ERROR' ||
    geoNameRes === 'CITY NAME ERROR'
  )
    throw geoNameRes;

  const [lng, lat] = geoNameRes;

  const [max_temp, min_temp, weather] = await weatherForecast(
    lng,
    lat,
    travelDate
  );

  const [imageURL, tags] = await getImage(region, country, city);

  const tripId = uuid.v4();
  const userId = getUserId(event);
  const createdAt = new Date().toISOString();

  const newTrip = {
    ...tripRequest,
    longitude: lng,
    latitude: lat,
    max_temp,
    min_temp,
    weather,
    imageURL,
    tags
  };

  return await tripsAsccess.createTrip({
    tripId,
    userId,
    createdAt,
    ...newTrip
  });
}

export async function updateTrip(
  tripId: string,
  updatedTrip: UpdateTripRequest,
  event: APIGatewayProxyEvent
): Promise<any> {
  const userId = getUserId(event);

  await tripsAsccess.updateTrip(userId, tripId, updatedTrip);

  return {};
}

export async function deleteTrip(
  tripId: string,
  event: APIGatewayProxyEvent
): Promise<any> {
  const userId = getUserId(event);
  await tripsAsccess.deleteTrip(userId, tripId);

  return {};
}
