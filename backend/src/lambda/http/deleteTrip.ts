import 'source-map-support/register';

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import * as middy from 'middy';
import { cors } from 'middy/middlewares';
import { createLogger } from '../../utils/logger';

import { deleteTrip } from '../../businessLogic.ts/trips';

const logger = createLogger('deleting trip');

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const tripId: string = event.pathParameters.tripId;

    logger.info('deleting an existing trip', tripId);

    await deleteTrip(tripId, event);

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
