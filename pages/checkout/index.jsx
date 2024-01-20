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
import ShippingAddress from "@/components/Checkout/ShippingAddress";
import Payment from "@/components/Checkout/Payment";
import Order from "@/components/Checkout/Order";
const Checkout = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
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
        paymentStatus: "pending",
      };
      axios
        .post(`${process.env.baseurl}/place-order`, data, {
          headers: { Authorization: token },
        })
        .then((response) => {
          if (response?.data?.status == 200) {
            dispatch(getCartProduct());
            getProducts();
            console.log(response);
            if (selectedPayment == "stripe") {
              router.push(response.data?.payment_url);
            } else if (selectedPayment == "cod") {
              toastMessage(response.data?.message, "s");
              router.push("/order");
            }
          }
        });
    }
  };

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };
  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return renderShippingStep();
      case 2:
        return renderPaymentStep();
      case 3:
        return renderOrderStep();
      default:
        return null;
    }
  };
  const renderShippingStep = () => {
    return (
       <ShippingAddress
            newAddress={newAddress}
            inputValue={inputValue}
            handleInput={handleInput}
            addShippingAddress={addShippingAddress}
            setNewAddress={setNewAddress}
            addresses={addresses}
            selectedAddress={selectedAddress}
            deleteShippingAddress={deleteShippingAddress}
          />
    );
  };

  const renderPaymentStep = () => {
    return (
      <Payment
            selectedPayment={selectedPayment}
            setSelectedPayment={setSelectedPayment}
          />
    );
  };

  const renderOrderStep = () => {
    return (
      <Order cartData={cartData} totalPrice={totalPrice} placeOrder={placeOrder}/>
    );
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
        <div className="flex gap-4 w-full flex-col justify-between lg:flex-row h-[100vh]">
          {/* shipping */}
          <div className="hidden lg:block">
          <ShippingAddress
            newAddress={newAddress}
            inputValue={inputValue}
            handleInput={handleInput}
            addShippingAddress={addShippingAddress}
            setNewAddress={setNewAddress}
            addresses={addresses}
            selectedAddress={selectedAddress}
            deleteShippingAddress={deleteShippingAddress}
          />
          </div>
          {/* payment */}
         <div className="hidden lg:block">
         <Payment
            selectedPayment={selectedPayment}
            setSelectedPayment={setSelectedPayment}
          />
         </div>
          {/* order */}
          <div className="hidden lg:block">
            <Order cartData={cartData} totalPrice={totalPrice} />
          </div>

          {/* mobile device */}
          <div className="w-full lg:hidden mb-4 lg:mb-0">
            {renderStepContent()}
            <div className="flex justify-between mx-[30px] mt-8 lg:hidden">
              <div className="flex justify-end">
              {step > 1 && (
                <UiButton
                  buttonName="Previous"
                  externalClass="bg-gray-500 text-white"
                  onClick={prevStep}
                />
              )}
              </div>
              {step < 3 && (
                <UiButton
                  buttonName="Next"
                  externalClass="!bg-color-1 !text-color-3 !font-medium"
                  onClick={nextStep}
                />
              )}
              {step === 3 && (
                <UiButton
                  buttonName="Place Order"
                  externalClass="!bg-color-1 !text-color-3 !font-medium"
                  onClick={placeOrder}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
export default Checkout;
