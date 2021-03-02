import 'source-map-support/register';

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { UpdateTripRequest } from '../../requests/UpdateTripRequest';

import * as middy from 'middy';
import { cors } from 'middy/middlewares';
import { createLogger } from '../../utils/logger';

import { updateTrip } from '../../businessLogic.ts/trips';

const logger = createLogger('updating trip');

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const tripId = event.pathParameters.tripId;
    const updatedTrip: UpdateTripRequest = JSON.parse(event.body);

    logger.info('updating a trip', { tripId, ...updatedTrip });

    await updateTrip(tripId, updatedTrip, event);

    return {
      statusCode: 201,
      body: JSON.stringify({})
    };
  }
);

handler.use(
  cors({
    credentials: true
  })
);
