import { createContext, useEffect, useState} from "react"; 
import axios from "axios" 


// Example: src/api.js
const url = import.meta.env.VITE_URL;

export const fetchFoodList = async () => {
    try {
        const response = await fetch(`${url}/food/list`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching food list:", error);
    }
};

export const StoreContext = createContext(null);
const StoreContextProvider = (props) =>{

const [cartItems, setCartItems] = useState({});

const [token,setToken] = useState("");
const [food_list,setFoodlist] = useState([]); 

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
 
    const getTotalCartAmount = () => {
    let totalAmount = 0; 
    console.log("Cart details:", cartItems);

    // Iterate over cartItems and calculate the total amount
    Object.entries(cartItems).forEach(([itemId, quantity]) => {
        if (quantity > 0) {
            const itemInfo = food_list.find((product) => product._id === itemId);
            
            if (itemInfo) {
                totalAmount += itemInfo.price * quantity;
            } else {
                console.warn(`Item with ID ${itemId} not found in the food list.`);
            }
        }
    });

    return totalAmount;
};


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
 