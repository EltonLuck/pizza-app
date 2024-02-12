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

export const fetchPizzaToppings = async () => {
  const command = new ScanCommand({
    ProjectionExpression: "id, pizzaId, toppingId",
    TableName: "PizzaTopping",
  });

  const response = await docClient.send(command);
  return response;
};

export const createPizzaToppings = async ({ pizzaId, toppingId }) => {
  const uuid = crypto.randomUUID();
  const command = new PutCommand({
    TableName: "PizzaTopping",
    Item: {
      id: uuid,
      pizzaId: pizzaId,
      toppingId: toppingId,
    },
  });

  const response = await docClient.send(command);
  return response;
};

export const updatePizzaToppings = async ({ id, pizzaId, toppingId }) => {
  const command = new UpdateCommand({
    TableName: "PizzaTopping",
    Key: {
      id,
    },
    UpdateExpression: "set pizzaId = :p, toppingId = :t",
    ExpressionAttributeValues: {
      ":p": pizzaId,
      ":t": toppingId,
    },
    ReturnValues: "ALL_NEW",
  });

  const response = await docClient.send(command);
  return response;
};

export const deletePizzaToppings = async (id) => {
  const command = new DeleteCommand({
    TableName: "PizzaTopping",
    Key: {
      id,
    },
  });

  const response = await docClient.send(command);
  return response;
};