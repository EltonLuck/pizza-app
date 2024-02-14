// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { API_URL3 } from '../utils';

// export const DeleteToppingFromPizza = () => {
//     const [pizzaToppings, setPizzaToppings] = useState([]);

//     const fetchPizzaToppings = async () => {
//         try {
//           const { data } = await axios.get(API_URL3);

    
//           setPizzaToppings(data);
//         } catch (err) {
//           console.log(err);
//         }
//       };

//       useEffect(() => {
//         fetchPizzaToppings();
//       }, []);
//   return (
//     <div>DeleteToppingFromPizza</div>
//   )
// }
