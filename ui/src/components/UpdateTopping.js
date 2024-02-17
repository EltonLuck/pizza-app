import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogTitle, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";
import { API_URL, API_URL3 } from "../utils";

export const UpdateTopping = ({
  fetchToppings,
  isDialogOpen,
  setIsDialogOpen,
  topping,
}) => {
  const { id, name } = topping;
  const [toppingName, setToppingName] = useState("");
  const [pizzaToppings, setPizzaToppings] = useState([]);

  useEffect(() => {

    axios.get(API_URL3)
    .then(response => setPizzaToppings(response.data))
    .catch(error => console.error('Error fetching pizza toppings:', error))
  }, []);

  const handleUpdateToppingName = async () => {
    try {
      const filter = pizzaToppings.filter(topping =>
        topping.toppingId === name)
      const arrayOfInfo = filter.map(topping => ({'id': topping.id, 'pizzaId': topping.pizzaId, 'toppingId': topping.toppingId}))
      if(arrayOfInfo.length > 0) {
        for (let i = 0; i < arrayOfInfo.length; i++)
        {
          await axios.put(API_URL3, {
            id: arrayOfInfo[i].id,
            pizzaId: arrayOfInfo[i].pizzaId,
            toppingId: toppingName,
          })
        }
      }
      await axios.put(API_URL, {
        id,
        name: toppingName,
      });

      await fetchToppings();

      setToppingName("");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog open={isDialogOpen}>
      <DialogTitle>Edit Topping</DialogTitle>
      <div className="dialog">
        <TextField
          size="small"
          label="Topping"
          variant="outlined"
          onChange={(e) => setToppingName(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={async () => {
            await handleUpdateToppingName();
            
            setIsDialogOpen(false);
          }}
        >
          <CheckIcon />
        </Button>
      </div>
    </Dialog>
  );
};