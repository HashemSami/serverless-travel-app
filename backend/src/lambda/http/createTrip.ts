import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { CreateTripRequest } from '../../requests/CreateTripRequest';

import * as middy from 'middy';
import { cors } from 'middy/middlewares';
import { createLogger } from '../../utils/logger';

import { createTrip } from '../../businessLogic.ts/trips';
import { TripItem } from '../../models/TripItem';

const logger = createLogger('ceating trip');

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const tripRequest: CreateTripRequest = JSON.parse(event.body);

    logger.info('creating a new trip', tripRequest);

    try {
      const newTripItem: TripItem = await createTrip(tripRequest, event);

      return {
        statusCode: 201,
        body: JSON.stringify({
          item: newTripItem
        })
      };
    } catch (e) {
      console.log(e.message);
      if (e === 'COUNTRY MATCHING ERROR') {
        return {
          statusCode: 400,
          body: JSON.stringify({
            matchErr: 'COUNTRY MATCHING ERROR'
          })
        };
      }

      if (e === 'CITY NAME ERROR') {
        return {
          statusCode: 400,
          body: JSON.stringify({
            matchErr: 'CITY NAME ERROR'
          })
        };
      }
    }
  }
);

handler.use(
  cors({
    credentials: true
  })
);
