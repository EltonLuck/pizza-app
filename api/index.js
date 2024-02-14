import express from "express";
import serverless from "serverless-http";
import cors from "cors";

import { fetchToppings, createToppings, updateToppings, deleteToppings } from "./topping.js";
import { fetchPizzas, createPizzas, updatePizzas, deletePizzas } from "./pizza.js";
import { fetchPizzaToppings, createPizzaToppings, updatePizzaToppings, deletePizzaToppings, fetchSpecificPizzaToppings } from "./pizzaTopping.js";



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

// topping requests
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




  // pizza requests
  app.get("/pizza", async (req, res) => {
    try {
      const pizzas = await fetchPizzas();
  
      res.send(pizzas.Items);
    } catch (err) {
      res.status(400).send(`Error fetching tasks: ${err}`);
    }
  });

  app.post("/pizza", async (req, res) => {
    try {
      const pizzas = req.body;
  
      const response = await createPizzas(pizzas);

      res.send(response);
    } catch (err) {
      res.status(400).send(`Error creating tasks: ${err}`);
    }
  });
  
  app.put("/pizza", async (req, res) => {
    try {
      const pizzas = req.body;
  
      const response = await updatePizzas(pizzas);
  
      res.send(response);
    } catch (err) {
      res.status(400).send(`Error updating tasks: ${err}`);
    }
  });
  
  app.delete("/pizza/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const response = await deletePizzas(id);
  
      res.send(response);
    } catch (err) {
      res.status(400).send(`Error deleting tasks: ${err}`);
    }
  });




//pizza toppings reqs
app.get("/pizzatopping", async (req, res) => {
  try {
    const toppings = await fetchPizzaToppings();

    res.send(toppings.Items);
  } catch (err) {
    res.status(400).send(`Error fetching tasks: ${err}`);
  }
});

app.get("/pizzatopping/:pizzaId", async (req, res) => {
  const { pizzaId } = req.params;
  
  try {
    const toppings = await fetchSpecificPizzaToppings(pizzaId);
    
    if (toppings) {
      res.status(200).json(toppings);
    }
  } catch (err) {
    console.log(err);
  }
})


app.post("/pizzatopping", async (req, res) => {
  try {
    const pizzas = req.body;

    const response = await createPizzaToppings(pizzas);

    res.send(response);
  } catch (err) {
    res.status(400).send(`Error creating tasks: ${err}`);
  }
});

app.put("/pizzatopping", async (req, res) => {
  try {
    const pizzas = req.body;
  
    const response = await updatePizzaToppings(pizzas);

    res.send(response);
  } catch (err) {
    res.status(400).send(`Error creating tasks: ${err}`);
  }
});

app.delete("/pizzatopping/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await deletePizzaToppings(id);

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