import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { API_URL2 } from "../utils";
import { Link } from "react-router-dom";

export const AddPizza = ({ fetchPizzas }) => {
  const [newPizza, setNewPizza] = useState("");
  const [ pizzas, setPizzas ] = useState([]);

  const addNewPizza = async () => {
    try {   
        await axios.post(API_URL2, {
            name: newPizza,
        }); 

        await fetchPizzas();

        setNewPizza("");
    } catch (err) {
        console.log(err);
    }
    
  };

  useEffect(() => {
    // Fetch pizzas from server
    axios.get(API_URL2)
      .then(response => setPizzas(response.data))
      .catch(error => console.error('Error fetching pizzas:', error));

  }, []);

  const checker = async () => {
    const check = pizzas.filter(pizza => pizza.name === newPizza);
    if(check.length > 0)
    {
        console.log("Pizza Already Exists");
    } else {
        addNewPizza();
        window.location.reload();
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
        Pizza List
      </Typography>
      <div className="addTaskForm">
        <TextField
          size="small"
          label="Pizza Name"
          variant="outlined"
          value={newPizza}
          onChange={(e) => setNewPizza(e.target.value)}
        />
        <Button
          disabled={!newPizza.length}
          variant="outlined"
          onClick={checker}
        >
          <AddIcon />
        </Button>
      </div>
    </div>
  );
};