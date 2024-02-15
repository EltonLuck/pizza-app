import { Button, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect, useState } from "react";
import { UpdatePizza } from "./UpdatePizza";
import classnames from "classnames";
import axios from "axios";
import { API_URL2, API_URL3 } from "../utils";


export const Pizza = ({ pizza, fetchPizzas, fetchToppings }) => {
  const { id, name } = pizza;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pizzaToppings, setPizzaToppings] = useState([]);

  useEffect(() => {

    axios.get(API_URL3)
    .then(response => setPizzaToppings(response.data))
    .catch(error => console.error('Error fetching pizza toppings:', error))
  }, []);

  const handleDeletePizza = async () => {
    try {
      const filter = pizzaToppings.filter(topping =>
            topping.pizzaId === name)
      const arrayOfIds = filter.map(topping => topping.id)
      if(arrayOfIds.length > 0) {
        for(let i = 0; i < arrayOfIds.length; i++) {
          await axios.delete(`${API_URL3}/${arrayOfIds[i]}`)
        }
      }
      await axios.delete(`${API_URL2}/${id}`);

      await fetchPizzas();
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="task">
      <div
        className={classnames("flex")}
      >
        <Typography variant="h4">{name}</Typography>
      </div>
      <div className="taskButtons">
        <Button variant="contained" onClick={() => setIsDialogOpen(true)}>
          <EditIcon />
        </Button>
        <Button color="error" variant="contained" onClick={handleDeletePizza}>
          <DeleteIcon />
        </Button> 
      </div>
      <UpdatePizza
        fetchPizzas={fetchPizzas}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        pizza={pizza}
      />
    </div>
  );
};