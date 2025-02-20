import { createContext, useEffect, useState} from "react"; 
import axios from "axios" 



export const StoreContext = createContext(null);
const StoreContextProvider = (props) =>{

const [cartItems, setCartItems] = useState({});

const [token,setToken] = useState("");
const [food_list,setFoodlist] = useState([]);

//const url = "http://localhost:1200"
const url = "https://food-del-two-delta.vercel.app";
console.log("url ha ",url)

const addToCart = async (itemId) => {
    
    if(!cartItems[itemId]) {
        // for user add item first time the card  or 1st item added
        setCartItems((prev) =>({...prev,[itemId]:1}))
    }
    else{ 
        setCartItems((prev) =>({...prev,[itemId]:prev[itemId]+1}))
    }
    if(token) {
        await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
    }
}

const removeFromCart = async(itemId) => {
    setCartItems((prev) =>({...prev,[itemId]:prev[itemId]-1}));
    if(token) {
        await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
    }
}

 const getTotalCartAmount = (itemId)=> {
    let totalAmount =0;
    for(const item in cartItems)
    {  
        if(cartItems[item]>0)
      {  let itemInfo = food_list.find((product)=> product._id === item);
        totalAmount +=itemInfo.price * cartItems[item];}
    }
    return totalAmount;
 }

 const fetchFoodList = async () => {
  const response = await axios.get(url+"/api/food/list"); 
    setFoodlist(response.data.data); 
 };

 const loadCartData = async (token) => {
    const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
    setCartItems(response.data.cartData);
 }

 useEffect(() => {
async function loadData() {
    await fetchFoodList();
    if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"))
    }
}
  loadData();
 },[])

    const contextValue = {
 food_list , 
 cartItems , 
 setCartItems , 
 addToCart ,
  removeFromCart,
   getTotalCartAmount,
   url,
   token,
   setToken
    }

return (

    <StoreContext.Provider value={contextValue}>
        {props.children}
    </StoreContext.Provider>

)
}
export default StoreContextProvider;


// // export default StoreContextProvider;
// import { createContext, useEffect, useState } from "react";
// import axios from "axios";
// import "dotenv/config"; // Corrected dotenv import

// export const StoreContext = createContext(null);
// const StoreContextProvider = (props) => {
//   const [cartItems, setCartItems] = useState({});
//   const [token, setToken] = useState("");
//   const [food_list, setFoodlist] = useState([]);

//   const url = process.env.BACKEND_URL;

//   const addToCart = async (itemId) => {
//     setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
//     if (token) {
//       await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
//     }
//   };

//   const removeFromCart = async (itemId) => {
//     if (cartItems[itemId] > 1) {
//       setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
//     } else {
//       const updatedCart = { ...cartItems };
//       delete updatedCart[itemId];
//       setCartItems(updatedCart);
//     }
//     if (token) {
//       await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
//     }
//   };

//   const getTotalCartAmount = () => {
//     return Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
//       const itemInfo = food_list.find((product) => product._id === itemId);
//       return itemInfo ? total + itemInfo.price * quantity : total;
//     }, 0);
//   };

//   const fetchFoodList = async () => {
//     const response = await axios.get(`${url}/api/food/list`);
//     setFoodlist(response.data.data);
//   };

//   const loadCartData = async (token) => {
//     const response = await axios.post(`${url}/api/cart/get`, {}, { headers: { token } });
//     setCartItems(response.data.cartData);
//   };

//   useEffect(() => {
//     async function loadData() {
//       await fetchFoodList();
//       const savedToken = localStorage.getItem("token");
//       if (savedToken) {
//         setToken(savedToken);
//         await loadCartData(savedToken);
//       }
//     }
//     loadData();
//   }, []);

//   const contextValue = {
//     food_list,
//     cartItems,
//     setCartItems,
//     addToCart,
//     removeFromCart,
//     getTotalCartAmount,
//     url,
//     token,
//     setToken,
//   };

//   return <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>;
// };

// export default StoreContextProvider;



// import { createContext, useEffect, useState } from "react";
// import axios from "axios";

// export const StoreContext = createContext(null);
// const StoreContextProvider = (props) => {
//   const [cartItems, setCartItems] = useState({});
//   const [token, setToken] = useState("");
//   const [food_list, setFoodlist] = useState([]);

//   const url = import.meta.env.VITE_BACKEND_URL; // Use Vite environment variable

//   const addToCart = async (itemId) => {
//     setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
//     if (token) {
//       await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
//     }
//   };

//   const removeFromCart = async (itemId) => {
//     if (cartItems[itemId] > 1) {
//       setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
//     } else {
//       const updatedCart = { ...cartItems };
//       delete updatedCart[itemId];
//       setCartItems(updatedCart);
//     }
//     if (token) {
//       await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
//     }
//   };

//   const getTotalCartAmount = () => {
//     return Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
//       const itemInfo = food_list.find((product) => product._id === itemId);
//       return itemInfo ? total + itemInfo.price * quantity : total;
//     }, 0);
//   };

//   const fetchFoodList = async () => {
//     const response = await axios.get(`${url}/api/food/list`);
//     setFoodlist(response.data.data);
//   };

//   const loadCartData = async (token) => {
//     const response = await axios.post(`${url}/api/cart/get`, {}, { headers: { token } });
//     setCartItems(response.data.cartData);
//   };

//   useEffect(() => {
//     async function loadData() {
//       await fetchFoodList();
//       const savedToken = localStorage.getItem("token");
//       if (savedToken) {
//         setToken(savedToken);
//         await loadCartData(savedToken);
//       }
//     }
//     loadData();
//   }, []);

//   const contextValue = {
//     food_list,
//     cartItems,
//     setCartItems,
//     addToCart,
//     removeFromCart,
//     getTotalCartAmount,
//     url,
//     token,
//     setToken,
//   };

//   return <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>;
// };

// export default StoreContextProvider;