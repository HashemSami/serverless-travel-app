/**
 * Fields in a request to update a single TODO item.
 */
export interface UpdateTripRequest {
  name: string;
  dueDate: string;
  done: boolean;
}
