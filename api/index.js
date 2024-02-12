import express from "express";
import serverless from "serverless-http";
import cors from "cors";

import { fetchToppings, createToppings, updateToppings, deleteToppings } from "./topping";
//import { fetchPizzas, createPizzas, updatePizzas, deletePizzas } from "./pizza.js";
//import { fetchPizzaToppings, createPizzaToppings, updatePizzaToppings, deletePizzaToppings } from "./pizzaTopping.js";


const app = express();
const port = 3001;

app.use(express.json());

if (process.env.DEVELOPMENT) {
    app.use(cors());
  }

app.get('/', (req, res) => {
  res.send('Hello World!');
});


//http requests go here


app.get("/topping", async (req, res) => {
    try {
      const toppings = await fetchToppings();
  
      res.send(toppings.Items);
    } catch (err) {
      res.status(400).send(`Error fetching tasks: ${err}`);
    }
  });
  
  app.post("/topping", async (req, res) => {
    try {
      const toppings = req.body;
  
      const response = await createToppings(toppings);
  
      res.send(response);
    } catch (err) {
      res.status(400).send(`Error creating tasks: ${err}`);
    }
  });
  
  app.put("/topping", async (req, res) => {
    try {
      const toppings = req.body;
  
      const response = await updateToppings(toppings);
  
      res.send(response);
    } catch (err) {
      res.status(400).send(`Error updating tasks: ${err}`);
    }
  });
  
  app.delete("/topping/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const response = await deleteToppings(id);
  
      res.send(response);
    } catch (err) {
      res.status(400).send(`Error deleting tasks: ${err}`);
    }
  });












if (process.env.DEVELOPMENT) {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  }

export const handler = serverless(app);