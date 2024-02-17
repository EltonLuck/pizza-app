import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { API_URL } from "../utils";
import { Link } from "react-router-dom";

export const AddTopping = ({ fetchToppings }) => {
  const [newTopping, setNewTopping] = useState("");

  

  const addNewTopping = async () => {
    try {   
        await axios.post(API_URL, {
            name: newTopping,
        }); 

        await fetchToppings();

        setNewTopping("");
        window.location.reload();
    } catch (err) {
        console.log(err);
    }
    
  };

  const checker = async () => {
    const checkToppings = await axios.get(API_URL);
    if(checkToppings.data.some(obj => obj.name === newTopping)) //check if topping name exists in array
    {
        console.log("Topping Already Exists");
    } else {
        addNewTopping()
    }
  };

  return (
    <div>
        <div className="return">
            <Link to='/'>   
                <Button color="error" variant="contained">Back</Button>
            </Link>
        </div>
      <Typography align="center" variant="h2" paddingTop={2} paddingBottom={2}>
        Topping List
      </Typography>
      <div className="addTaskForm">
        <TextField
          size="small"
          label="Topping Name"
          variant="outlined"
          value={newTopping}
          onChange={(e) => setNewTopping(e.target.value)}
        />
        <Button
          disabled={!newTopping.length}
          variant="outlined"
          onClick={checker}
        >
          <AddIcon />
        </Button>
      </div>
    </div>
  );
};
