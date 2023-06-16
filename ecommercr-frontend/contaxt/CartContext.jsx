const { createContext, useState, useEffect } = require("react");

const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const getCartData = () => {
    const cartData = JSON.parse(window.localStorage.getItem("cart-product"));
    setCartData(cartData);
    setCartCount(cartData.length);
  };
  const addCartData = (data) => {
    const cartProduct = JSON.parse(window.localStorage.getItem("cart-product"));
    cartProduct.push(data);
    window.localStorage.setItem("cart-product", JSON.stringify(cartProduct));
    getCartData();
  };
  useEffect(()=>{
    getCartData();
  },[])
  return <CartContext.Provider value={{addCartData,cartData,cartCount}}>{children}</CartContext.Provider>;
};

export { CartContext, CartProvider };
