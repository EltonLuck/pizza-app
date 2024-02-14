import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AddTopping } from "./components/AddTopping";
import { Topping } from "./components/Topping";
import { AddPizza } from "./components/AddPizza";
import { Pizza } from "./components/Pizza";
import axios from "axios";
import { API_URL, API_URL2 } from "./utils";
import { AddToppingToPizza } from "./components/AddToppingToPizza";
import { Home } from "./components/Home";
import { Route, Routes } from "react-router-dom";
import { PizzaList } from "./components/PizzaList";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
  const [toppings, setToppings] = useState([]);
  const [pizzas, setPizzas] = useState([]);

  const fetchToppings = async () => {
    try {
      const { data } = await axios.get(API_URL);

      setToppings(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPizzas = async () => {
    try {
      const { data } = await axios.get(API_URL2);

      setPizzas(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchToppings();
  }, []);

  useEffect(() => {
    fetchPizzas();
  }, []);

  return (
    <Routes>
      <Route path="/" element={
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Home />
        </ThemeProvider>
      } />
      <Route path="/topping" element={
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <AddTopping fetchToppings={fetchToppings} />
          {toppings.map((topping) => (
            <Topping topping={topping} key={topping.id} fetchToppings={fetchToppings} />
          ))}
        </ThemeProvider>
      } />
      <Route path="/pizza" element={
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <AddPizza fetchPizzas={fetchPizzas} />
          {pizzas.map((pizza) => (
            <Pizza pizza={pizza} key={pizza.id} fetchPizzas={fetchPizzas} fetchToppings={fetchToppings} />
          ))}
          <AddToppingToPizza />
        </ThemeProvider>
      } />
      <Route path="/menu" element={
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <PizzaList />
        </ThemeProvider>
      } />
    </Routes>
  );
}
