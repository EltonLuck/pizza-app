import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL2, API_URL3 } from '../utils';

export const DeleteToppingFromPizza = () => {
    const [pizzas, setPizzas] = useState([]);
  const [pizzaToppings, setPizzaToppings] = useState([]);
  const [selectedPizza, setSelectedPizza] = useState('');
  const [selectedTopping, setSelectedTopping] = useState('');

  useEffect(() => {
     // Fetch pizzas from server
     axios.get(API_URL2)
     .then(response => setPizzas(response.data))
     .catch(error => console.error('Error fetching pizzas:', error));

    // Fetch pizza toppings from server
    axios.get(API_URL3)
      .then(response => setPizzaToppings(response.data))
      .catch(error => console.error('Error fetching pizza toppings:', error));
  }, []);

  const handlePizzaChange = (event) => {
    setSelectedPizza(event.target.value);
  };

  const handleToppingChange = (event) => {
    setSelectedTopping(event.target.value);
  };

  const handleDelete = async (event) => {
    event.preventDefault();

    try {
      const selectedPizzaToppings = pizzaToppings.filter(topping => topping.pizzaId === selectedPizza && topping.toppingId === selectedTopping);
        console.log(selectedPizzaToppings);

      if (selectedPizzaToppings.length > 0) {
        await axios.delete(`${API_URL3}/${selectedPizzaToppings[0].id}`);
      }

      window.location.reload();
    } catch (error) {
      console.error('Error deleting topping:', error);
    }
  };

  return (
    <div>
      <h1>Delete Topping from Pizza</h1>
      <form onSubmit={handleDelete}>
        <label className='scale'>Select Pizza:</label>
        <select className='scale' value={selectedPizza} onChange={handlePizzaChange}>
          <option value="">Select Pizza</option>
          {pizzas.map((pizza, index) => (
            <option key={index} value={pizza.pizza_id}>{pizza.name}</option>
          ))}
        </select>
        <br />
        <label className='scale'>Select Topping:</label>
        <select className='scale' value={selectedTopping} onChange={handleToppingChange}>
          <option value="">Select Topping</option>
          {pizzaToppings
            .filter(topping => topping.pizzaId === selectedPizza)
            .map((topping, index) => (
                <option key={index} value={topping.toppingId}>{topping.toppingId}</option>
            ))}
        </select>
        <br />
        <button className='scale' type="submit">Delete Topping</button>
      </form>
    </div>
  );
};
