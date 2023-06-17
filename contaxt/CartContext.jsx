const { createContext, useState, useEffect } = require("react");
const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const getCartData = () => {
    const cartData = JSON.parse(window.localStorage.getItem("cart-product"));
    setCartData(cartData);
    setCartCount(cartData.length);
    let addPrice = 0;
    cartData.forEach((product) => {
      addPrice = addPrice + product.price;
    });
    setTotalPrice(addPrice);
  };
  const addCartData = (data) => {
    const cartProduct = JSON.parse(window.localStorage.getItem("cart-product"));
    cartProduct.push(data);
    window.localStorage.setItem("cart-product", JSON.stringify(cartProduct));
    getCartData();
  };
  const deleteCartData = (product) => {
    let index = cartData.indexOf(product);
    cartData.splice(index, 1);
    setCartData(cartData);
    window.localStorage.setItem("cart-product", JSON.stringify(cartData));
    getCartData();
  };
  useEffect(() => {
    const cart = window.localStorage.getItem("cart-product");
    if (!cart) {
      window.localStorage.setItem("cart-product", JSON.stringify([]));
    }
    getCartData();
  }, []);

  return (
    <CartContext.Provider
      value={{ addCartData, cartData, cartCount, totalPrice, deleteCartData }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
