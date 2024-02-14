import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL, API_URL2, API_URL3 } from "../utils";

export const AddToppingToPizza = () => {
  const [pizzas, setPizzas] = useState([]);
  const [toppings, setToppings] = useState([]);
  const [selectedPizza, setSelectedPizza] = useState('');
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [pizzaToppings, setPizzaToppings] = useState([]);

  useEffect(() => {
    // Fetch pizzas from server
    axios.get(API_URL2)
      .then(response => setPizzas(response.data))
      .catch(error => console.error('Error fetching pizzas:', error));

    // Fetch toppings from server
    axios.get(API_URL)
    .then(response => setToppings(response.data))
    .catch(error => console.error('Error fetching toppings:', error));

    axios.get(API_URL3)
    .then(response => setPizzaToppings(response.data))
    .catch(error => console.error('Error fetching pizza toppings:', error))
  }, []);

  const handlePizzaChange = (event) => {
    setSelectedPizza(event.target.value);
  };

  const handleToppingChange = (event) => {
    const toppingId = event.target.value;
    console.log('Event:', event.target);
    if (event.target.checked) {
      setSelectedToppings(prevToppings => [...prevToppings, toppingId]);
    } else {
      setSelectedToppings(prevToppings => prevToppings.filter(id => id !== toppingId));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const testings = pizzaToppings.filter(topping =>
            topping.pizzaId === selectedPizza)
      const arrayDataItems = testings.map(topping => topping.toppingId)
      console.log(arrayDataItems);
    try {
      for (let i = 0; i < selectedToppings.length; i++) {
        if(arrayDataItems.includes(selectedToppings[i])){
        } else {
        await axios.post(API_URL3, {
          pizzaId: selectedPizza,
          toppingId: selectedToppings[i],
        });
       }
      }
      console.log(selectedToppings);
      // Reset selectedToppings to empty array after successful submission
      setSelectedToppings([]);
      window.location.reload();
    } catch (error) {
      console.error('Error adding toppings:', error);
    }
  };

  return (
    <div>
      <h1>Add Toppings to Pizza</h1>
      <form onSubmit={handleSubmit}>
        <label className='scale' htmlFor="pizzaSelect">Select Pizza:</label>
        <select className='scale' id="pizzaSelect" value={selectedPizza} onChange={handlePizzaChange}>
          <option key="default" value="">Select Pizza</option>
          {pizzas.map((pizza, index) => (
            <option key={index} value={pizza.pizza_id}>{pizza.name}</option>
          ))}
        </select>
        <br />
        <label className='scale'>Select Toppings:</label><br />
        {toppings.map((topping , index)=> (
          <div key={index}>
            <input 
              type="checkbox"
              id={topping.topping_id}
              value={topping.name}
              onChange={handleToppingChange}
            />
            <label className='scale' htmlFor={topping.topping_id}>{topping.name}</label><br />
          </div>
        ))}
        <br />
        <button className='scale' type="submit">Add Toppings</button>
      </form>
    </div>
  );
}
