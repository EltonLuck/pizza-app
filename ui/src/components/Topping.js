import { Button, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect, useState } from "react";
import { UpdateTopping } from "./UpdateTopping";
import classnames from "classnames";
import axios from "axios";
import { API_URL, API_URL3 } from "../utils";


export const Topping = ({ topping, fetchToppings }) => {
  const { id, name } = topping;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pizzaToppings, setPizzaToppings] = useState([]);

  useEffect(() => {

    axios.get(API_URL3)
    .then(response => setPizzaToppings(response.data))
    .catch(error => console.error('Error fetching pizza toppings:', error))
  }, []);


  const handleDeleteTopping = async () => {
    try {
      const filter = pizzaToppings.filter(topping =>
        topping.toppingId === name)
      const arrayOfIds = filter.map(topping => topping.id)
      if(arrayOfIds.length > 0){
        for(let i = 0; i < arrayOfIds.length; i++) {
          await axios.delete(`${API_URL3}/${arrayOfIds[i]}`)
        }
      }
      await axios.delete(`${API_URL}/${id}`);
      console.log("Done");
      await fetchToppings();
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
        <Button color="error" variant="contained" onClick={handleDeleteTopping}>
          <DeleteIcon />
        </Button>
      </div>
      <UpdateTopping
        fetchToppings={fetchToppings}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        topping={topping}
      />
    </div>
  );
};
