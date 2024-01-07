import { useEffect, useState } from "react";
import Link from "next/link";
import toastMessage from "@/plugings/toastify";
import { useDispatch, useSelector } from "react-redux";
import { getCartProduct } from "@/store/cartSlice";
import axios from "axios";

const Cart = () => {
  const loggedinStatus = useSelector((state) => state.auth.isLoggedin);
  const token = useSelector((state) => state.auth.token);
  const cartCount = useSelector((state) => state.cart.cartCount);
  const cartData = useSelector((state) => state.cart.cartProduct);
  const loading = useSelector((state) => state.cart.isLoading);
  const total_price = useSelector((state) => state.cart.total_price);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [windowSize, setWindowSize] = useState("");
  const cartControl = () => {
    if (!loggedinStatus) {
      toastMessage("Please login", "w");
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
  const deleteFromCart = (product) => {
    const data = {
      cartItemId: product.cartItemId,
      productId: product.id,
    };
    axios
      .post("http://localhost:4000/delete-from-cart", data, {
        headers: { Authorization: token },
      })
      .then((response) => {
        if (response.data.status == 200) {
          dispatch(getCartProduct());
          toastMessage(response?.data?.message, "s");
        }
      })
      .catch((error) => {
        console.log(error?.response?.data?.message);
      });
  };

  useEffect(() => {
    const size = window.screen.height;
    setWindowSize(size);
  }, []);
  useEffect(() => {
    dispatch(getCartProduct());
  }, []);
  return (
    <div className={windowSize + " w-full"}>
      <div
        className="fixed right-0 top-[50%] bg-color-1 p-[10px] z-[999] rounded-l cursor-pointer"
        onClick={cartControl}
      >
        <div className="p-2">
          <div className="absolute font-semibold text-color-2 text-[25px] top-[-6px] left-[32px] p-[10px] rounded-full">
            {cartCount}
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="32"
            height="32"
            className="fill-color-3"
          >
            <path d="M4.00436 6.41686L0.761719 3.17422L2.17593 1.76001L5.41857 5.00265H20.6603C21.2126 5.00265 21.6603 5.45037 21.6603 6.00265C21.6603 6.09997 21.6461 6.19678 21.6182 6.29L19.2182 14.29C19.0913 14.713 18.7019 15.0027 18.2603 15.0027H6.00436V17.0027H17.0044V19.0027H5.00436C4.45207 19.0027 4.00436 18.5549 4.00436 18.0027V6.41686ZM6.00436 7.00265V13.0027H17.5163L19.3163 7.00265H6.00436ZM5.50436 23.0027C4.67593 23.0027 4.00436 22.3311 4.00436 21.5027C4.00436 20.6742 4.67593 20.0027 5.50436 20.0027C6.33279 20.0027 7.00436 20.6742 7.00436 21.5027C7.00436 22.3311 6.33279 23.0027 5.50436 23.0027ZM17.5044 23.0027C16.6759 23.0027 16.0044 22.3311 16.0044 21.5027C16.0044 20.6742 16.6759 20.0027 17.5044 20.0027C18.3328 20.0027 19.0044 20.6742 19.0044 21.5027C19.0044 22.3311 18.3328 23.0027 17.5044 23.0027Z"></path>
          </svg>
        </div>
      </div>
      <div
        className="hidden fixed right-0 top-0 w-[400px] h-full bg-gray-50 z-[99999] pb-[10px]"
        id="cart"
      >
        <div className="flex justify-between items-center h-[10%] px-[10px]">
          <h1 className="text-[25px] font-extrabold text-color-1">Essential</h1>
          <div className="w-[25px] h-[25px] rounded-full bg-red-500 flex justify-center items-center">
            <svg
              className="cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              onClick={cartControl}
            >
              <path
                d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"
                className="fill-white"
              ></path>
            </svg>
          </div>
        </div>
        <div className="h-[80%] overflow-y-auto">
          {cartData?.length > 0 ? (
            cartData.map((product, index) => {
              return (
                <div key={index} className="bg-gray-100 py-[20px] px-[10px]">
                  <div className="flex justify-between items-center gap-2">
                    <div className="border w-[15%]">
                      <img
                        src={product.image_url}
                        alt=""
                        className="h-[50px] w-[60px] object-contain"
                      />
                    </div>
                    <div className="w-[40%]">
                      <p>{product.title}</p>
                      <p>Size: {product.variants}</p>
                    </div>
                    <div className="w-[10%]">
                      <p>{product.cart_quantity}x</p>
                    </div>
                    <div className="w-[25%]">
                      <>
                        <p
                          className={`font-semibold ${
                            product.discount_price > 0
                              ? "text-gray-500 line-through"
                              : "text-gray-800"
                          }`}
                        >
                          {product.price} Tk
                        </p>
                        {product.discount_price > 0 && (
                          <p className="text-gray-800 font-semibold">
                            {product.price - product.discount_price} Tk
                          </p>
                        )}
                      </>
                    </div>
                    <div className="w-[10%]">
                      <svg
                        className="cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        onClick={() => deleteFromCart(product)}
                      >
                        <path
                          d="M7 4V2H17V4H22V6H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V6H2V4H7ZM6 6V20H18V6H6ZM9 9H11V17H9V9ZM13 9H15V17H13V9Z"
                          fill="rgba(184,1,1,1)"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <div className="grid grid-flow-row grid-cols-1 gap-y-2 text-center">
                <p className="font-semibold text-[20px] text-color-1">
                  Cart is Empty
                </p>
                <Link
                  className="bg-color-1 text-color-3 py-[8px] px-[15px] rounded font-medium flex items-center gap-2"
                  href="/"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                  >
                    <path
                      d="M4.00436 6.41662L0.761719 3.17398L2.17593 1.75977L5.41857 5.00241H20.6603C21.2126 5.00241 21.6603 5.45012 21.6603 6.00241C21.6603 6.09973 21.6461 6.19653 21.6182 6.28975L19.2182 14.2898C19.0913 14.7127 18.7019 15.0024 18.2603 15.0024H6.00436V17.0024H17.0044V19.0024H5.00436C4.45207 19.0024 4.00436 18.5547 4.00436 18.0024V6.41662ZM6.00436 7.00241V13.0024H17.5163L19.3163 7.00241H6.00436ZM5.50436 23.0024C4.67593 23.0024 4.00436 22.3308 4.00436 21.5024C4.00436 20.674 4.67593 20.0024 5.50436 20.0024C6.33279 20.0024 7.00436 20.674 7.00436 21.5024C7.00436 22.3308 6.33279 23.0024 5.50436 23.0024ZM17.5044 23.0024C16.6759 23.0024 16.0044 22.3308 16.0044 21.5024C16.0044 20.674 16.6759 20.0024 17.5044 20.0024C18.3328 20.0024 19.0044 20.674 19.0044 21.5024C19.0044 22.3308 18.3328 23.0024 17.5044 23.0024Z"
                      className="fill-color-3"
                    ></path>
                  </svg>
                  <p>Continue shopping</p>
                </Link>
                {/* <div>
                </div> */}
              </div>
            </div>
          )}
        </div>
        {cartData?.length > 0 && (
          <div className="h-[10%] px-[10px]">
            <div className="flex w-full justify-between">
              <p className="text-[18px] font-semibold text-color-1">
                Total Price:
              </p>
              <p className="text-[18px] font-semibold text-color-1">
                {total_price} BDT
              </p>
            </div>
            <Link
              href="/checkout"
              className="text-color-3 font-medium text-[18px]"
            >
              <div className="text-center w-full bg-color-1 rounded py-[10px] mt-6">
                Checkout
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
export default Cart;
