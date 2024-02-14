import React, { useState } from "react";
import { Button, Dialog, DialogTitle, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";
import { API_URL2 } from "../utils";

export const UpdatePizza = ({
  fetchPizzas,
  isDialogOpen,
  setIsDialogOpen,
  pizza,
}) => {
  const { id } = pizza;
  const [pizzaName, setPizzaName] = useState("");

  const handleUpdatePizzaName = async () => {
    try {
      await axios.put(API_URL2, {
        id,
        name: pizzaName,
      });

      await fetchPizzas();

      setPizzaName("");
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