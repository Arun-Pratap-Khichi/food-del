import { createContext, useEffect, useState} from "react"; 
import axios from "axios" 
 

const url = import.meta.env.VITE_URL;

// export const fetchFoodList = async () => {
//     try {
//         const response = await fetch(`${API_URL}/food/list`);
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error("Error fetching food list:", error);
//     }
// };

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

 const getTotalCartAmount = (itemId)=> {
    let totalAmount =0;
    console.log("cart details ha",cartItems)
    for(const item in cartItems)
    {  
        if(cartItems[item]>0)
      {  let itemInfo = food_list.find((product)=> product._id === item);
        console.log("itemifo",itemInfo)
        console.log("item info ha",itemInfo.price)
        totalAmount +=itemInfo.price * cartItems[item];
    }
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
 