import 'source-map-support/register';

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import * as middy from 'middy';
import { cors } from 'middy/middlewares';

import * as uuid from 'uuid';

import * as AWS from 'aws-sdk';

import { getUserId } from '../utils';

import { createLogger } from '../../utils/logger';

const docClient = new AWS.DynamoDB.DocumentClient();

const logger = createLogger('ceating trip image');

const tripsTable = process.env.TRIPS_TABLE;
// const todoIdIndex = process.env.IMAGE_ID_INDEX
const bucketName = process.env.IMAGES_S3_BUCKET;
const urlExpiration = process.env.SIGNED_URL_EXPIRATION;

const s3 = new AWS.S3({
  signatureVersion: 'v4'
});

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const tripId = event.pathParameters.tripId;

    const imageId = uuid.v4();

    await createImage(tripId, imageId, event);

    const url = getUploadUrl(imageId);

    logger.info('generating Upload url', url);

    return {
      statusCode: 201,
      body: JSON.stringify({
        uploadUrl: url
      })
    };
  }
);

handler.use(
  cors({
    credentials: true
  })
);

async function createImage(
  tripId: string,
  imageId: string,
  event: APIGatewayProxyEvent
) {
  const result = await docClient
    .update({
      TableName: tripsTable,
      Key: {
        userId: getUserId(event),
        todoId: tripId
      },
      UpdateExpression: 'set attachmentUrl = :r',
      ExpressionAttributeValues: {
        ':r': `https://${bucketName}.s3.amazonaws.com/${imageId}`
      }
    })
    .promise();

  console.log('Storing new item: ', result);
}

function getUploadUrl(imageId: string) {
  return s3.getSignedUrl('putObject', {
    Bucket: bucketName,
    Key: imageId,
    Expires: urlExpiration
  });
}
