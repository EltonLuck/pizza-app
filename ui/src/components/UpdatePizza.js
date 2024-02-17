import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogTitle, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";
import { API_URL2, API_URL3 } from "../utils";

export const UpdatePizza = ({
  fetchPizzas,
  isDialogOpen,
  setIsDialogOpen,
  pizza,
}) => {
  const { id, name } = pizza;
  const [pizzaName, setPizzaName] = useState("");
  const [pizzaToppings, setPizzaToppings] = useState([]);

  useEffect(() => {

    axios.get(API_URL3)
    .then(response => setPizzaToppings(response.data))
    .catch(error => console.error('Error fetching pizza toppings:', error))
  }, []);

  const handleUpdatePizzaName = async () => {
    try {
      const filter = pizzaToppings.filter(pizza =>
        pizza.pizzaId === name)
      const arrayOfInfo = filter.map(pizza => ({'id': pizza.id, 'pizzaId': pizza.pizzaId, 'toppingId': pizza.toppingId}))
      if(arrayOfInfo.length > 0) {
        for (let i = 0; i < arrayOfInfo.length; i++)
        {
          await axios.put(API_URL3, {
            id: arrayOfInfo[i].id,
            pizzaId: pizzaName,
            toppingId: arrayOfInfo[i].toppingId,
          })
        }
      }
      await axios.put(API_URL2, {
        id,
        name: pizzaName,
      });

      await fetchPizzas();

      setPizzaName("");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog open={isDialogOpen}>
      <DialogTitle>Edit Pizza Name</DialogTitle>
      <div className="dialog">
        <TextField
          size="small"
          label="Pizza"
          variant="outlined"
          onChange={(e) => setPizzaName(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={async () => {
            await handleUpdatePizzaName();
            
            setIsDialogOpen(false);
          }}
        >
          <CheckIcon />
        </Button>
      </div>
    </Dialog>
  );
};