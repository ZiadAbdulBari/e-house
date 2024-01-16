import MainLayout from "@/layout/MainLayout";
import axios from "axios";
import { useEffect, useState } from "react";
import { getLoggedinStatus, getToken } from "@/store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import UiInput from "@/components/UiKit/UiInput";
import UiButton from "@/components/UiKit/UiButton";
import { getCartProduct } from "@/store/cartSlice";
import { useRouter } from "next/router";
import toastMessage from "@/plugings/toastify";
const Checkout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const loggedin = useSelector((state) => state.auth.isLoggedin);
  const token = useSelector((state) => state.auth.token);
  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState({});
  const [selectedPayment, setSelectedPayment] = useState("");
  const [inputValue, setInputValue] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
    gift: false,
    message: "",
  });
  const handleInput = (e) => {
    if (e.target.name == "name") {
      setInputValue({ ...inputValue, name: e.target.value });
    } else if (e.target.name == "email") {
      setInputValue({ ...inputValue, email: e.target.value });
    } else if (e.target.name == "phone") {
      setInputValue({ ...inputValue, phone: e.target.value });
    } else if (e.target.name == "address") {
      setInputValue({ ...inputValue, address: e.target.value });
    } else if (e.target.name == "gift") {
      setInputValue({ ...inputValue, gift: e.target.checked });
    } else if (e.target.name == "message") {
      setInputValue({ ...inputValue, message: e.target.value });
    }
  };
  const getProducts = () => {
    const checkoutProduct = JSON.parse(window.localStorage.getItem("cart"));
    const toptalPrice = JSON.parse(window.localStorage.getItem("totalPrice"));
    setCartData(checkoutProduct);
    setTotalPrice(toptalPrice);
  };
  const getShippingAddress = () => {
    if (loggedin) {
      axios
        .get(`${process.env.baseurl}/get-shipping-address`, {
          headers: { Authorization: token },
        })
        .then((response) => {
          // console.log(response);
          if (response?.data?.status == 200) {
            if (response?.data?.shipping_address?.length > 0) {
              setSelectedAddress(response?.data?.shipping_address[0]);
              setAddresses(response?.data?.shipping_address);
            } else {
              setNewAddress(true);
            }
          }
        });
    }
  };
  const addShippingAddress = () => {
    if (loggedin) {
      axios
        .post(`${process.env.baseurl}/add-shipping-address`, inputValue, {
          headers: { Authorization: token },
        })
        .then((response) => {
          if (response?.data?.status == 200) {
            getShippingAddress();
            setInputValue({
              name: "",
              phone: "",
              address: "",
              email: "",
              gift: false,
              message: "",
            });
            setNewAddress(false);
          }
        });
    }
  };
  const deleteShippingAddress = (id) => {
    if (loggedin) {
      const data = {
        id: id,
      };
      axios
        .post(`${process.env.baseurl}/delete-shipping-address`, data, {
          headers: { Authorization: token },
        })
        .then((response) => {
          // console.log(response);
          if (response?.data?.status == 200) {
            getShippingAddress();
          }
        });
    }
  };
  const placeOrder = () => {
    if (loggedin) {
      const data = {
        total_price: totalPrice,
        shippingaddressId: selectedAddress?.id,
        products: cartData,
        medium: selectedPayment,
        paymentStatus: 'pending',
      };
      axios
        .post(`${process.env.baseurl}/place-order`, data, {
          headers: { Authorization: token },
        })
        .then((response) => {
          if (response?.data?.status == 200) {
            dispatch(getCartProduct());
            getProducts();
            console.log(response)
            if(selectedPayment=='stripe'){
              router.push(response.data?.payment_url);
            }
            else if(selectedPayment=='cod'){
              toastMessage(response.data?.message,'s')
              router.push('/order');
            }
          }
        });
    }
  };
  useEffect(() => {
    dispatch(getLoggedinStatus());
    dispatch(getToken());
  }, []);
  useEffect(() => {
    getShippingAddress();
    getProducts();
  }, [loggedin == true]);
  return (
    <MainLayout>
      <div className="lg:container mx-auto">
        <div className="flex gap-4 w-full h-[100vh]">
          <div className="w-[30%] px-[30px] h-full">
            <div className="flex justify-between items-center">
              <p className="my-4 font-medium text-[22px] text-color-1">
                Shipping address
              </p>
              {newAddress == false && (
                <button
                  className="flex font-medium text-color-1 bg-color-3 py-[5px] px-[10px] rounded"
                  onClick={() => setNewAddress(true)}
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                    >
                      <path
                        d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"
                        className="fill-color-1"
                      ></path>
                    </svg>
                  </span>
                  <span>Add address</span>
                </button>
              )}
            </div>
            {newAddress == true && (
              <div className="mt-4">
                <div className="grid gird-cols-1 gap-y-4">
                  <UiInput
                    id="name"
                    label="Name"
                    type="text"
                    value={inputValue.name}
                    name="name"
                    placeholder="Enter receiver name"
                    onChange={handleInput}
                  />
                  <UiInput
                    id="phone"
                    label="Phone"
                    type="text"
                    value={inputValue.phone}
                    name="phone"
                    placeholder="Enter receiver phone number"
                    onChange={handleInput}
                  />
                  <UiInput
                    id="email"
                    label="Email"
                    type="email"
                    value={inputValue.email}
                    name="email"
                    placeholder="Enter receiver email"
                    onChange={handleInput}
                  />
                  <UiInput
                    id="address"
                    label="Address"
                    type="text"
                    value={inputValue.address}
                    name="address"
                    placeholder="Enter receiver address"
                    onChange={handleInput}
                  />
                  <UiInput
                    id="gift"
                    label="Gift"
                    type="checkbox"
                    value={inputValue.gift}
                    name="gift"
                    placeholder=""
                    onChange={handleInput}
                  />
                  {inputValue.gift && (
                    <div className="grid grid-cols-1">
                      <label
                        className="text-[18px] font-medium text-gray-800"
                        htmlFor="message"
                      >
                        Message
                      </label>
                      <textarea
                        className="mt-4 text-[20px] font-medium px-[20px] rounded border border-gray-200 outline-gray-300 placeholder:text-gray-300"
                        name="message"
                        id="message"
                        cols="30"
                        rows="5"
                        placeholder="Write your message"
                        onClick={handleInput}
                      >
                        {inputValue.message}
                      </textarea>
                    </div>
                  )}
                </div>
                <div className="flex justify-end mt-20 gap-x-2">
                  <UiButton
                    buttonName="Add Shipping Address"
                    externalClass="!bg-color-1 !text-color-3 !font-medium"
                    onClick={addShippingAddress}
                  />
                  <UiButton
                    buttonName="Cancel"
                    externalClass="bg-red-500 text-white"
                    onClick={() => setNewAddress(false)}
                  />
                </div>
              </div>
            )}
            <div>
              {newAddress == false && (
                <div className="grid grid-cols-1 gap-2">
                  {addresses.map((address) => (
                    <div
                      className="border p-[10px] bg-gray-50"
                      key={address.id}
                    >
                      <div className="flex justify-between mb-4">
                        <input
                          id={`address-${address.id}`}
                          className="peer/published"
                          type="radio"
                          name={`address-${address.id}`}
                          value={selectedAddress}
                          onChange={() => setSelectedAddress(address)}
                          checked={address.id == selectedAddress.id}
                        />
                        <svg
                          className="cursor-pointer"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="20"
                          height="20"
                          onClick={() => deleteShippingAddress(address.id)}
                        >
                          <path
                            d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"
                            fill="rgba(255,0,0,1)"
                          ></path>
                        </svg>
                      </div>
                      <label htmlFor={`address-${address.id}`} className="">
                        <ul>
                          <li>Name: {address.receiver_name}</li>
                          <li>Phone: {address.receiver_phone}</li>
                          <li>Email: {address.receiver_email}</li>
                          <li>Address: {address.receiver_address}</li>
                        </ul>
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="w-[20%] payment">
            <p className="my-4 font-medium text-[22px] text-color-1">
              Payment Method
            </p>
            <div className="mt-4">
              <div
                className="flex gap-2 items-center cursor-pointer"
                onClick={() => setSelectedPayment("cod")}
              >
                <div
                  className={`px-[1px] rounded ${
                    selectedPayment == "cod" ? "bg-color-1" : "bg-color-3"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    className={`${
                      selectedPayment == "cod"
                        ? "fill-color-3"
                        : "fill-color-1"
                    }`}
                  >
                    <path d="M12.0004 16C14.2095 16 16.0004 14.2091 16.0004 12 16.0004 9.79086 14.2095 8 12.0004 8 9.79123 8 8.00037 9.79086 8.00037 12 8.00037 14.2091 9.79123 16 12.0004 16ZM21.0049 4.00293H3.00488C2.4526 4.00293 2.00488 4.45064 2.00488 5.00293V19.0029C2.00488 19.5552 2.4526 20.0029 3.00488 20.0029H21.0049C21.5572 20.0029 22.0049 19.5552 22.0049 19.0029V5.00293C22.0049 4.45064 21.5572 4.00293 21.0049 4.00293ZM4.00488 15.6463V8.35371C5.13065 8.017 6.01836 7.12892 6.35455 6.00293H17.6462C17.9833 7.13193 18.8748 8.02175 20.0049 8.3564V15.6436C18.8729 15.9788 17.9802 16.8711 17.6444 18.0029H6.3563C6.02144 16.8742 5.13261 15.9836 4.00488 15.6463Z"></path>
                  </svg>
                </div>
                <label
                  htmlFor="payment-1"
                  className="text-[18px] text-gray-800"
                >
                  Cash on delivery
                </label>
              </div>
              <div
                className="flex gap-2 items-center cursor-pointer"
                onClick={() => setSelectedPayment("stripe")}
              >
                <div
                  className={`px-[1px] rounded ${
                    selectedPayment == "stripe" ? "bg-color-1" : "bg-color-3"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    className={`${
                      selectedPayment == "stripe"
                        ? "fill-color-3"
                        : "fill-color-1"
                    }`}
                  >
                    <path d="M3.00488 2.99979H21.0049C21.5572 2.99979 22.0049 3.4475 22.0049 3.99979V19.9998C22.0049 20.5521 21.5572 20.9998 21.0049 20.9998H3.00488C2.4526 20.9998 2.00488 20.5521 2.00488 19.9998V3.99979C2.00488 3.4475 2.4526 2.99979 3.00488 2.99979ZM20.0049 10.9998H4.00488V18.9998H20.0049V10.9998ZM20.0049 8.99979V4.99979H4.00488V8.99979H20.0049ZM14.0049 14.9998H18.0049V16.9998H14.0049V14.9998Z"></path>
                  </svg>
                </div>
                <label
                  htmlFor="payment-2"
                  className="text-[18px] text-gray-800"
                >
                  Master/Visa
                </label>
              </div>
            </div>
          </div>
          <div className="w-[50%] px-[30px] h-full">
            <p className="my-4 font-medium text-[22px] text-color-1">
              Products
            </p>
            <div className="h-[55%] overflow-y-auto">
              {cartData.length > 0 &&
                cartData.map((product, index) => {
                  return (
                    <div
                      className="w-full flex justify-between items-center gap-4 py-[20px]"
                      key={index}
                    >
                      <div className="w-[15%] border">
                        <img
                          src={product.image_url}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="w-[55%]">
                        <p className="text-color-1">{product.title}</p>
                        <p className="text-gray-800">
                          Size: {product.variants}
                        </p>
                      </div>
                      <div className="w-[10%]">
                        <p className="text-gray-800">
                          {product.cart_quantity} x
                        </p>
                      </div>
                      <div className="w-[20%]">
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
                      </div>
                    </div>
                  );
                })}
            </div>
            {/* <div className="my-6 flex gap-2 justify-between">
              <input
                type="text"
                placeholder="Apply Cupon"
                className="input !mt-0"
              />
              <button className="px-[20px] bg-[#025464] rounded text-white text-[20px]">
                Apply
              </button>
            </div> */}
            <div>
              <div className="flex justify-between">
                <p className="text-[20px]">Subtotal:</p>
                <p className="text-[20px]">{totalPrice} BDT</p>
              </div>
              <div className="flex justify-between">
                <p className="text-[20px]">Discount:</p>
                <p className="text-[20px]">00.00 BDT</p>
              </div>
              <div className="flex justify-between">
                <p className="text-[20px]">Delivery:</p>
                <p className="text-[20px]">00.00 BDT</p>
              </div>
              <div className="border w-full my-4"></div>
              <div className="flex justify-between">
                <p className="text-[20px] font-semibold">Total:</p>
                <p className="text-[20px] font-semibold">{totalPrice} BDT</p>
              </div>
              <div className="flex justify-end mt-8">
                <UiButton
                  buttonName="Place Order"
                  externalClass="!bg-color-1 !text-color-3 !font-medium"
                  onClick={placeOrder}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
export default Checkout;
