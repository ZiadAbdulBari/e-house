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
  const cartControl = (status) => {
    if (!loggedinStatus) {
      toastMessage("Please login", "w");
      return;
    }
    setIsOpen(status);
  };
  const deleteFromCart = (product) => {
    const data = {
      cartItemId: product.cartItemId,
      productId: product.id,
    };
    axios
      .post(`${process.env.baseurl}/delete-from-cart`, data, {
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

  // useEffect(() => {
  //   const size = window.screen.height;
  //   setWindowSize(size);
  // }, []);
  useEffect(() => {
    dispatch(getCartProduct());
  }, []);
  return (
    <div className={`block`}>
      <div className="cursor-pointer">
        <div className="relative h-[26px] w-[26px]">
          <div className="absolute -top-2 left-5 lg:-top-3 lg:left-5 font-medium text-color-1 text-[16px] lg:text-[20px] ">
            <p>{cartCount}</p>
          </div>
          <div className="absolute top-0 left-0" onClick={() => cartControl(!isOpen)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="30"
              height="30"
              className="hidden lg:block fill-color-1"
            >
              <path d="M7.00488 7.99966V5.99966C7.00488 3.23824 9.24346 0.999664 12.0049 0.999664C14.7663 0.999664 17.0049 3.23824 17.0049 5.99966V7.99966H20.0049C20.5572 7.99966 21.0049 8.44738 21.0049 8.99966V20.9997C21.0049 21.5519 20.5572 21.9997 20.0049 21.9997H4.00488C3.4526 21.9997 3.00488 21.5519 3.00488 20.9997V8.99966C3.00488 8.44738 3.4526 7.99966 4.00488 7.99966H7.00488ZM7.00488 9.99966H5.00488V19.9997H19.0049V9.99966H17.0049V11.9997H15.0049V9.99966H9.00488V11.9997H7.00488V9.99966ZM9.00488 7.99966H15.0049V5.99966C15.0049 4.34281 13.6617 2.99966 12.0049 2.99966C10.348 2.99966 9.00488 4.34281 9.00488 5.99966V7.99966Z"></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="22"
              height="22"
              className="xs:block lg:hidden fill-color-1"
            >
              <path d="M7.00488 7.99966V5.99966C7.00488 3.23824 9.24346 0.999664 12.0049 0.999664C14.7663 0.999664 17.0049 3.23824 17.0049 5.99966V7.99966H20.0049C20.5572 7.99966 21.0049 8.44738 21.0049 8.99966V20.9997C21.0049 21.5519 20.5572 21.9997 20.0049 21.9997H4.00488C3.4526 21.9997 3.00488 21.5519 3.00488 20.9997V8.99966C3.00488 8.44738 3.4526 7.99966 4.00488 7.99966H7.00488ZM7.00488 9.99966H5.00488V19.9997H19.0049V9.99966H17.0049V11.9997H15.0049V9.99966H9.00488V11.9997H7.00488V9.99966ZM9.00488 7.99966H15.0049V5.99966C15.0049 4.34281 13.6617 2.99966 12.0049 2.99966C10.348 2.99966 9.00488 4.34281 9.00488 5.99966V7.99966Z"></path>
            </svg>
          </div>
        </div>
      </div>
      <div
        className={`fixed ${
          isOpen ? "right-0" : "-right-[100%]"
        } top-0 w-full lg:w-[400px] h-[100vh] bg-gray-50 z-[99999] transition-all duration-300`}
        id="cart"
      >
        <div className="w-full h-[7%] flex items-center justify-between px-[10px] bg-white border-b-2 border-gray-100">
          <h1 className="text-[25px] font-extrabold text-color-1">Essential</h1>
          <div className="bg-white rounded">
            <svg
              className="cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              onClick={() => cartControl(!isOpen)}
            >
              <path
                d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"
                className="fill-color-1"
              ></path>
            </svg>
          </div>
        </div>
        <div className="h-[78%] overflow-y-auto border-b-2 border-gray-100 py-[10px]">
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
                  onClick={()=>setIsOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                    className="fill-color-3"
                  >
                    <path d="M7.00488 7.99966V5.99966C7.00488 3.23824 9.24346 0.999664 12.0049 0.999664C14.7663 0.999664 17.0049 3.23824 17.0049 5.99966V7.99966H20.0049C20.5572 7.99966 21.0049 8.44738 21.0049 8.99966V20.9997C21.0049 21.5519 20.5572 21.9997 20.0049 21.9997H4.00488C3.4526 21.9997 3.00488 21.5519 3.00488 20.9997V8.99966C3.00488 8.44738 3.4526 7.99966 4.00488 7.99966H7.00488ZM7.00488 9.99966H5.00488V19.9997H19.0049V9.99966H17.0049V11.9997H15.0049V9.99966H9.00488V11.9997H7.00488V9.99966ZM9.00488 7.99966H15.0049V5.99966C15.0049 4.34281 13.6617 2.99966 12.0049 2.99966C10.348 2.99966 9.00488 4.34281 9.00488 5.99966V7.99966Z"></path>
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
          <div className="h-[15%] px-[10px] bg-white py-[10px]">
            <div className="flex w-full  justify-between">
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
              <div className="text-center w-full bg-color-1 rounded py-[10px] mt-2 lg:mt-6">
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
