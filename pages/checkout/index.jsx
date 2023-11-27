import MainLayout from "@/layout/MainLayout";
import axios from "axios";
import { useEffect, useState } from "react";
import { getLoggedinStatus, getToken } from "@/store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import UiInput from "@/components/UiKit/UiInput";
import UiButton from "@/components/UiKit/UiButton";
const Checkout = () => {
  const dispatch = useDispatch();
  const loggedin = useSelector((state) => state.auth.isLoggedin);
  const token = useSelector((state) => state.auth.token);
  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState({});
  const [inputValue, setInputValue] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
    gift: false,
    // message: "",
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
    }
    // else if (e.target.name == "message") {
    //   setInputValue({ ...inputValue, message: e.target.value });
    // }
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
        .get("http://localhost:4000/get-shipping-address", {
          headers: { Authorization: token },
        })
        .then((response) => {
          console.log(response);
          if (response?.data?.status == 200) {
            if(response?.data?.shipping_address?.length>0){
              setSelectedAddress(response?.data?.shipping_address[0]);
              setAddresses(response?.data?.shipping_address);
            }
            else{
              setNewAddress(true);
            }
          }
        });
    }
  };
  const addShippingAddress = () => {
    if (loggedin) {
      axios
        .post("http://localhost:4000/add-shipping-address", inputValue, {
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
              // message: "",
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
        .post("http://localhost:4000/delete-shipping-address", data, {
          headers: { Authorization: token },
        })
        .then((response) => {
          console.log(response);
          if (response?.data?.status == 200) {
            getShippingAddress();
          }
        });
    }
  };
  const placeOrder = ()=>{
    if (loggedin) {
      const data = {
            total_price:totalPrice,
            shippingaddressId:selectedAddress?.id,
            products:cartData,
            medium:"cod",
            paymentHistory:JSON.stringify({
              "amount":totalPrice
           })
        }
      axios
        .post("http://localhost:4000/place-order", data, {
          headers: { Authorization: token },
        })
        .then((response) => {
          console.log(response);
          // if (response?.data?.status == 200) {
          //   getShippingAddress();
          // }
        });
    }
  }
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
        <div className="flex gap-4 w-full h-screen">
          <div className="w-[50%] px-[30px]">
            <div className="flex justify-between items-center">
              <p className="my-4 font-medium text-[25px]">Shipping address</p>
              {newAddress == false && (
                <button
                  className="flex font-semibold text-gray-600 border border-green-300 py-[5px] px-[10px] rounded"
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
                        className="fill-gray-600"
                      ></path>
                    </svg>
                  </span>
                  <span>Add new shipping address</span>
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
                  {/* {inputValue.gift && (
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
                    )} */}
                </div>
                <div className="flex justify-end mt-20 gap-x-2">
                  <UiButton
                    buttonName="Add Shipping Address"
                    externalClass="bg-green-300"
                    onClick={addShippingAddress}
                  />
                  <UiButton
                    buttonName="Cancel"
                    externalClass="bg-red-300"
                    onClick={() => setNewAddress(false)}
                  />
                </div>
              </div>
            )}
            <div>
              {newAddress == false && (
                <div className="grid grid-cols-2 gap-2">
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
          <div className="w-[50%] bg-gray-100 px-[30px]">
            <p className="my-4 font-samibold text-[30px]">Products</p>
            <div className="h-[55%] overflow-y-scroll">
              {cartData.length > 0 &&
                cartData.map((product, index) => {
                  return (
                    <div
                      className="w-full flex justify-between items-center gap-4 py-[20px]"
                      key={index}
                    >
                      <div className="w-[20%] border">
                        <img
                          src={product.image_url}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="w-[50%]">
                        <p className="text-[20px]">{product.title}</p>
                      </div>
                      <div className="w-[10%]">
                        <p className="text-[20px]">{product.cart_quantity} x</p>
                      </div>
                      <div className="w-[20%]">
                        <p className="text-[20px]">{product.price} BDT</p>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="my-6 flex gap-2 justify-between">
              <input
                type="text"
                placeholder="Apply Cupon"
                className="input !mt-0"
              />
              <button className="px-[20px] bg-[#025464] rounded text-white text-[20px]">
                Apply
              </button>
            </div>
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
                {/* <button className="bg-orange-700 text-white text-[20px] px-[50px] py-[5px] rounded-[5px]" >
                  Place Order
                </button> */}
                <UiButton buttonName="Place Order" externalClass="bg-green-300" onClick={placeOrder}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
export default Checkout;
