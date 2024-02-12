import React, { useState } from "react";
import { Button, Dialog, DialogTitle, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";
import { API_URL } from "../utils";

export const UpdateTopping = ({
  fetchToppings,
  isDialogOpen,
  setIsDialogOpen,
  topping,
}) => {
  const { id } = topping;
  const [toppingName, setToppingName] = useState("");

  const handleUpdateToppingName = async () => {
    try {
      await axios.put(API_URL, {
        id,
        name: toppingName,
      });

      await fetchToppings();

      setToppingName("");
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