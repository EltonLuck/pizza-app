import { Button, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState } from "react";
import { UpdateTopping } from "./UpdateTopping";
import classnames from "classnames";
import axios from "axios";
import { API_URL } from "../utils";

export const Topping = ({ topping, fetchToppings }) => {
  const { name } = topping;
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  const handleDeleteTopping = async () => {
    try {
        await axios.delete(`${API_URL}/${topping.id}`);

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
