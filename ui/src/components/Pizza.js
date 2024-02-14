import { Button, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState } from "react";
import { UpdatePizza } from "./UpdatePizza";
import classnames from "classnames";
import axios from "axios";
import { API_URL2 } from "../utils";


export const Pizza = ({ pizza, fetchPizzas, fetchToppings }) => {
  const { name } = pizza;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDeletePizza = async () => {
    try {
      await axios.delete(`${API_URL2}/${pizza.id}`);

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