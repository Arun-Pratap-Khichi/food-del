import { createContext, useEffect, useState } from "react";
import axios from "axios";

const url = import.meta.env.VITE_URL;

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodlist] = useState([]);

  // ✅ Add to Cart
  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    if (token) {
      try {
        await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
      } catch (error) {
        console.error("Failed to add item to cart:", error);
      }
    }
  };

  // ✅ Remove from Cart
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 1) - 1,
    }));

    if (token) {
      try {
        await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
      } catch (error) {
        console.error("Failed to remove item from cart:", error);
      }
    }
  };

  // ✅ Get Total Cart Amount (with null checks)
  const getTotalCartAmount = () => {
    let totalAmount = 0;

    console.log("Cart details:", cartItems);

    if (!cartItems || !food_list) return totalAmount;

    Object.entries(cartItems || {}).forEach(([itemId, quantity]) => {
      if (quantity > 0) {
        const itemInfo = food_list?.find((product) => product._id === itemId);
        if (itemInfo) {
          totalAmount += itemInfo.price * quantity;
        } else {
          console.warn(`Item with ID ${itemId} not found in the food list.`);
        }
      }
    });

    return totalAmount;
  };

  // ✅ Fetch Food List (handle empty or missing data)
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFoodlist(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch food list:", error);
    }
  };

  // ✅ Load Cart Data (handle empty response)
  const loadCartData = async (token) => {
    try {
      const response = await axios.post(`${url}/api/cart/get`, {}, { headers: { token } });
      setCartItems(response.data.cartData || {});
    } catch (error) {
      console.error("Failed to load cart data:", error);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
