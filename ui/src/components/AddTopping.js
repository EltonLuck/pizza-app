import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { API_URL } from "../utils";

export const AddTopping = ({ fetchToppings }) => {
  const [newTopping, setNewTopping] = useState("");

  const addNewTopping = async () => {
    try {
      await axios.post(API_URL, {
        name: newTopping,
      });

      await fetchToppings();

      setNewTopping("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Typography align="center" variant="h2" paddingTop={2} paddingBottom={2}>
        Topping List
      </Typography>
      <div className="addTaskForm">
        <TextField
          size="small"
          label="Topping"
          variant="outlined"
          value={newTopping}
          onChange={(e) => setNewTopping(e.target.value)}
        />
        <Button
          disabled={!newTopping.length}
          variant="outlined"
          onClick={addNewTopping}
        >
          <AddIcon />
        </Button>
      </div>
    </div>
  );
};
