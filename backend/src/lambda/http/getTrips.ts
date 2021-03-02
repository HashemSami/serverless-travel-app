import 'source-map-support/register';

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import * as middy from 'middy';
import { cors } from 'middy/middlewares';

import { getTrips } from '../../businessLogic.ts/trips';
import { createLogger } from '../../utils/logger';
// import { TodoItem } from '../../models/TodoItem'

const logger = createLogger('get trips');

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const items = await getTrips(event);

    logger.info('gitting all trips', { items });

    return {
      statusCode: 200,
      body: JSON.stringify({
        items
      })
    };
  }
);

handler.use(
  cors({
    credentials: true
  })
);
