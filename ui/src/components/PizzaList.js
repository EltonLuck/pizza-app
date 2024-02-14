import React, { useState, useEffect } from "react";
import { Button, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL3 } from '../utils';

export const PizzaList = () => {
    const [pizzaToppings, setPizzaToppings] = useState([]);

    const fetchPizzaToppings = async () => {
        try {
          const { data } = await axios.get(API_URL3);

    
          setPizzaToppings(data);
        } catch (err) {
          console.log(err);
        }
      };

      useEffect(() => {
        fetchPizzaToppings();
      }, []);

     // Get unique pizzaIds
     const uniquePizzaIds = [...new Set(pizzaToppings.map(pizza => pizza.pizzaId))];



  return (
    <div>
        <div className="return">
            <Link to='/'>   
                <Button color="error" variant="contained">Back</Button>
            </Link>
        </div>
        <Typography variant="h3" className="center">Pizza List</Typography>
        <ul>
                {uniquePizzaIds.map(pizzaId => {
                    const toppingsForPizza = pizzaToppings.filter(topping => topping.pizzaId === pizzaId);
                    return (
                        <li key={pizzaId}>
                            <Typography variant="h4"> {pizzaId}</Typography>
                            <ul>
                                {toppingsForPizza.map(topping => (
                                    <li key={topping.id}>
                                        <Typography variant="h5">{topping.toppingId}</Typography>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    );
                })}
            </ul>
    </div>
  )
}
