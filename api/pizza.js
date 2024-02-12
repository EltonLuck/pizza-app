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

export const fetchPizzas = async () => {
  const command = new ScanCommand({
    ExpressionAttributeNames: { "#name": "name" },
    ProjectionExpression: "id, #name",
    TableName: "Pizza",
  });

  const response = await docClient.send(command);
  return response;
};

export const createPizzas = async ({ name }) => {
  const uuid = crypto.randomUUID();
  const command = new PutCommand({
    TableName: "Pizza",
    Item: {
      id: uuid,
      name,
    },
  });

  const response = await docClient.send(command);
  return response;
};

export const updatePizzas = async ({ id, name }) => {
  const command = new UpdateCommand({
    TableName: "Pizza",
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

export const deletePizzas = async (id, name) => {
  const command = new DeleteCommand({
    TableName: "Pizza",
    Key: {
      id,
    },
    TableName: "PizzaTopping",
    key: {
      name,
    },
  });

  const response = await docClient.send(command);
  return response;
};