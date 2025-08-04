import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartitems, setcartitems] = useState({});
  const [food_list, setfoodlist] = useState([]);
  const [token, settoken] = useState("");
  const url = "http://localhost:4000";

  // 🛒 Add item to cart
  const addcart = async (itemId) => {
    setcartitems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] ? prev[itemId] + 1 : 1,
    }));

    if (token) {
      await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
    }
  };

  // ❌ Remove item from cart
  const removecart = async (itemId) => {
    setcartitems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] > 1 ? prev[itemId] - 1 : 0,
    }));

    if (token) {
      await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
    }
  };

  // 💰 Calculate total cart amount safely
  const getTotalCartamt = () => {
    let Totalamt = 0;

    for (const itemId in cartitems) {
      const quantity = cartitems[itemId];
      if (quantity > 0) {
        const itemInfo = food_list.find((product) => product._id === itemId);
        if (itemInfo && typeof itemInfo.price === "number") {
          Totalamt += itemInfo.price * quantity;
        }
      }
    }

    return Totalamt;
  };

  // 🍽️ Fetch food list from server
  const fetchfoodlist = async () => {
    try {
      const res = await axios.get(`${url}/api/food/list`);
      setfoodlist(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch food list:", error);
    }
  };

  // 📦 Load cart data from server
  const loadcartdata = async (token) => {
    try {
      const res = await axios.post(`${url}/api/cart/get`, {}, { headers: { token } });
      setcartitems(res.data.cartData || {});
    } catch (error) {
      console.error("Failed to load cart data:", error);
    }
  };

  // 🚀 Initial data load
  useEffect(() => {
    const loaddata = async () => {
      await fetchfoodlist();

      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        settoken(storedToken);
        await loadcartdata(storedToken);
      }
    };

    loaddata();
  }, []);

  // 🧠 Context value
  const contextValue = {
    food_list,
    cartitems,
    setcartitems,
    addcart,
    removecart,
    getTotalCartamt,
    url,
    token,
    settoken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;