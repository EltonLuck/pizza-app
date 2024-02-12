import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  UpdateCommand,
  PutCommand,
  DynamoDBDocumentClient,
  ScanCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import crypto from "crypto";

const client = new DynamoDBClient({ region: "us-east-2" });
const docClient = DynamoDBDocumentClient.from(client);

export const fetchToppings = async () => {
  const command = new ScanCommand({
    ExpressionAttributeNames: { "#name": "name" },
    ProjectionExpression: "id, #name",
    TableName: "Topping",
  });

  const response = await docClient.send(command);
  return response;
};

export const createToppings = async ({ name }) => {
  const uuid = crypto.randomUUID();
  const command = new PutCommand({
    TableName: "Topping",
    Item: {
      id: uuid,
      name,
    },
  });

  const response = await docClient.send(command);
  return response;
};

export const updateToppings = async ({ id, name }) => {
  const command = new UpdateCommand({
    TableName: "Topping",
    Key: {
      id,
    },
    ExpressionAttributeNames: {
      "#name": "name",
    },
    UpdateExpression: "set #name = :n",
    ExpressionAttributeValues: {
      ":n": name,
    },
    ReturnValues: "ALL_NEW",
  });

  const response = await docClient.send(command);
  return response;
};

export const deleteToppings = async (id) => {
    const command = new DeleteCommand({
      TableName: "Topping",
      Key: {
        id,
      },
    });

  const response = await docClient.send(command);
  return response;
};