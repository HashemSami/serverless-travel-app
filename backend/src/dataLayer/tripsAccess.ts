import * as AWS from 'aws-sdk';
import * as AWSXRay from 'aws-xray-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

const XAWS = AWSXRay.captureAWS(AWS);

import { TripItem } from '../models/TripItem';
import { TripUpdate } from '../models/TripUpdate';

export class TripsAccess {
  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly tripsTable = process.env.TRIPS_TABLE,
    private readonly tripsIdIndex = process.env.TRIP_ID_INDEX
  ) {}

  async getTrips(userId: string): Promise<TripItem[]> {
    const result = await this.docClient
      .query({
        TableName: this.tripsTable,
        IndexName: this.tripsIdIndex,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
          ':userId': userId
        },
        ScanIndexForward: false
      })
      .promise();

    const items = result.Items;

    console.log('todo itemsss', items);
    return items as TripItem[];
  }

  async createTrip(newTrip: TripItem): Promise<TripItem> {
    await this.docClient
      .put({
        TableName: this.tripsTable,
        Item: newTrip
      })
      .promise();

    return newTrip;
  }

  async updateTrip(
    userId: string,
    tripId: string,
    updatedTrip: TripUpdate
  ): Promise<any> {
    await this.docClient
      .update({
        TableName: this.tripsTable,
        Key: {
          userId,
          tripId
        },
        AttributeUpdates: {
          name: {
            Action: 'PUT',
            Value: updatedTrip.name
          },
          dueDate: {
            Action: 'PUT',
            Value: updatedTrip.dueDate
          },
          done: {
            Action: 'PUT',
            Value: updatedTrip.done
          }
        }
      })
      .promise();

    return {};
  }

  async deleteTrip(userId: string, tripId: string): Promise<any> {
    await this.docClient
      .delete({
        TableName: this.tripsTable,
        Key: {
          userId,
          tripId
        }
      })
      .promise();
  }
}

function createDynamoDBClient() {
  if (process.env.IS_OFFLINE) {
    console.log('Creating a local DynamoDB instance');
    return new XAWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000'
    });
  }

  return new XAWS.DynamoDB.DocumentClient();
}
