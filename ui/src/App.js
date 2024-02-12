import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AddTopping } from "./components/AddTopping";
import { Topping } from "./components/Topping";
import axios from "axios";
import { API_URL } from "./utils";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
  const [toppings, setToppings] = useState([]);

  const fetchToppings = async () => {
    try {
      const { data } = await axios.get(API_URL);

      setToppings(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchToppings();
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AddTopping fetchToppings={fetchToppings} />
      {toppings.map((topping) => (
        <Topping topping={topping} key={topping.id} fetchToppings={fetchToppings} />
      ))}
    </ThemeProvider>
  );
}
