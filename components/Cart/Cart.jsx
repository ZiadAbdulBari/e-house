import { CartContext } from "@/contaxt/CartContext";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { AuthContext } from "@/contaxt/AuthContext";
import toastMessage from "@/plugings/toastify";

const Cart = () => {
  const {isLoggedIn} = useContext(AuthContext);
  const { cartData, cartCount, totalPrice, deleteCartData } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);
  const [windowSize, setWindowSize] = useState("");
  const cartControl = () => {
    if(!isLoggedIn){
      toastMessage('Please login','w')
      return;
    }
    const selectCart = document.getElementById("cart");
    if (!isOpen) {
      selectCart.classList.remove("hidden");
      selectCart.classList.add("open-cart");
      setIsOpen(true);
    } else {
      selectCart.classList.add("hidden");
      selectCart.classList.remove("open-cart");
      setIsOpen(false);
    }
  };
  const deleteFromCart = (product)=>{
    if(isLoggedIn){
      deleteCartData(product);
      toastMessage('Successfully removed from cart','s')
    }
  }
  useEffect(() => {
    const size = window.screen.height;
    setWindowSize(size);
  }, []);
  return (
    <div className={windowSize + " w-full"}>
      <div
        className="fixed right-0 top-[50%] bg-orange-700 p-[10px]"
        onClick={cartControl}
      >
        <div className="p-2">
          <div className="absolute font-semibold text-[20px] top-[-8px] left-[35px] p-[10px] rounded-[80px]">{cartCount}</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="32"
            height="32"
          >
            <path
              d="M4.00436 6.41662L0.761719 3.17398L2.17593 1.75977L5.41857 5.00241H20.6603C21.2126 5.00241 21.6603 5.45012 21.6603 6.00241C21.6603 6.09973 21.6461 6.19653 21.6182 6.28975L19.2182 14.2898C19.0913 14.7127 18.7019 15.0024 18.2603 15.0024H6.00436V17.0024H17.0044V19.0024H5.00436C4.45207 19.0024 4.00436 18.5547 4.00436 18.0024V6.41662ZM5.50436 23.0024C4.67593 23.0024 4.00436 22.3308 4.00436 21.5024C4.00436 20.674 4.67593 20.0024 5.50436 20.0024C6.33279 20.0024 7.00436 20.674 7.00436 21.5024C7.00436 22.3308 6.33279 23.0024 5.50436 23.0024ZM17.5044 23.0024C16.6759 23.0024 16.0044 22.3308 16.0044 21.5024C16.0044 20.674 16.6759 20.0024 17.5044 20.0024C18.3328 20.0024 19.0044 20.674 19.0044 21.5024C19.0044 22.3308 18.3328 23.0024 17.5044 23.0024Z"
              fill="rgba(255,255,255,1)"
            ></path>
          </svg>
        </div>
      </div>
      <div
        className="hidden fixed right-0 top-0 w-[300px] h-full bg-gray-100 p-[10px]"
        id="cart"
      >
        <div className="flex justify-between items-center h-[10%]">
          <h1 className="text-[30px] font-semibold">Cart</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            onClick={cartControl}
          >
            <path
              d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"
              fill="rgba(194,0,0,1)"
            ></path>
          </svg>
        </div>
        <div className="h-[75%] overflow-y-scroll">
          {cartData.length > 0
            ? cartData.map((product, index) => {
                return (
                  <div
                    className="flex justify-between items-center gap-2 py-[20px]"
                    key={index}
                  >
                    <div className="w-[15%] border">
                      <img
                        src={product.image}
                        alt=""
                        className="h-[50px] w-[60px] object-contain"
                      />
                    </div>
                    <div className="w-[75%]">
                      <p>{product.title}</p>
                      <p>Price: {product.price}</p>
                    </div>
                    <div className="w-[10%]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        onClick={()=>deleteFromCart(product)}
                      >
                        <path
                          d="M7 4V2H17V4H22V6H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V6H2V4H7ZM6 6V20H18V6H6ZM9 9H11V17H9V9ZM13 9H15V17H13V9Z"
                          fill="rgba(184,1,1,1)"
                        ></path>
                      </svg>
                    </div>
                  </div>
                );
              })
            : "Cart is Empty"}
        </div>
        <div className="h-[15%]">
          <div className="flex w-full justify-between">
            <p className="text-[18px] font-semibold">Total Price:</p>
            <p className="text-[18px] font-semibold">{totalPrice} BDT</p>
          </div>
          <div className="text-center w-full bg-[#025464] rounded-[5px] py-[10px] mt-6">
            <button className="text-white font-semibold text-[20px]" ><Link href="/checkout">Checkout</Link> </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;
