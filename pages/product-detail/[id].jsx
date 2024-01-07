import ImageSlider from "@/components/ProductDetail/ImageSlider";
import Section from "@/components/Section/Section";
import UiTab from "@/components/UiKit/UiTab";
import MainLayout from "@/layout/MainLayout";
import toastMessage from "@/plugings/toastify";
import { getCartProduct } from "@/store/cartSlice";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Detail = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const loggedinStatus = useSelector((state) => state.auth.isLoggedin);
  const token = useSelector((state) => state.auth.token);
  const [details, setDetails] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [variant, setVariant] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState([]);
  const detailData = () => {
    const URL = `http://localhost:4000/product-detail/${router.query.id}`;
    axios
      .get(URL)
      .then((response) => {
        if (response?.data?.status == 200) {
          setDetails(response?.data?.products);
          setVariant(response?.data?.variant);
        }
      })
      .catch((error) => {
        console.log(error?.response?.message);
      });
  };
  const getVariant = (title, value) => {
    const newVariant = {
      title: title,
      values: value,
    };
    const filtered = selectedVariant.filter((exist) => exist.title != title);
    filtered.push(newVariant);
    setSelectedVariant(filtered);
  };
  const addToCart = (type,product) => {
    if (variant.length == selectedVariant.length) {
      if (!loggedinStatus) {
        toastMessage("Please login", "w");
      } else {
        const cartProduct = {
          product_id: product.id,
          quantity: quantity,
          productVariant_id: selectedVariant[0]?.values?.id,
          variants: selectedVariant[0]?.values?.variant_value,
          price: parseInt(product.price) - parseInt(product.discount_price),
        };
        axios
          .post("http://localhost:4000/add-to-cart", cartProduct, {
            headers: { Authorization: token },
          })
          .then((response) => {
            if (response.data.status == 200) {
              dispatch(getCartProduct());
              if(type=='cart'){
                toastMessage(response.data.message, "s");
              }
              else if(type=='buy'){
                router.push('/checkout');
              }
            }
          })
          .catch((error) => {
            if (error?.response?.data) {
              console.log(error?.response?.data?.message);
              toastMessage(error?.response?.data?.message, "i");
            } else {
              console.log(error);
            }
          });
      }
    } else {
      toastMessage("Please select size and color", "w");
    }
  };
  const manageQuantity = (type) => {
    if (type == "increment") {
      if (details.stock_quantity > quantity) {
        setQuantity(quantity + 1);
      }
    } else {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    }
  };
  const buyProduct = (product)=>{
    addToCart('buy',product);
  }
  useEffect(() => {
    if (router.query.id) {
      detailData();
    }
  }, [router]);
  return (
    <MainLayout>
      <div className="lg:container mx-auto">
        <div className="flex gap-8 h-full mt-[30px]">
          <div className="image w-[50%] h-[70vh] overflow-hidden">
            {/* <ImageSlider productImage={productImage} className="w-full" /> */}
            <img className="object-cover" src={details.image_url} alt="" />
          </div>
          <div className="w-[50%] h-full">
            <div className="grid grid-flow-row gap-y-4">
              <div className="flex justify-between">
                <div>
                  <h1 className="font-semibold text-[30px] text-color-1">
                    {details.title}
                  </h1>
                  {details.stock_quantity == 0 && (
                    <p className="text-red-500">Out of stock</p>
                  )}
                </div>
                <div className="wishlist rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="30"
                    height="30"
                  >
                    <path
                      d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853ZM18.827 6.1701C17.3279 4.66794 14.9076 4.60701 13.337 6.01687L12.0019 7.21524L10.6661 6.01781C9.09098 4.60597 6.67506 4.66808 5.17157 6.17157C3.68183 7.66131 3.60704 10.0473 4.97993 11.6232L11.9999 18.6543L19.0201 11.6232C20.3935 10.0467 20.319 7.66525 18.827 6.1701Z"
                      className="fill-red-500"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path
                    d="M12.0008 17L6.12295 20.5902L7.72105 13.8906L2.49023 9.40983L9.35577 8.85942L12.0008 2.5L14.6458 8.85942L21.5114 9.40983L16.2806 13.8906L17.8787 20.5902L12.0008 17ZM12.0008 14.6564L14.8175 16.3769L14.0517 13.1664L16.5583 11.0192L13.2683 10.7554L12.0008 7.70792L10.7333 10.7554L7.44326 11.0192L9.94991 13.1664L9.18408 16.3769L12.0008 14.6564Z"
                    fill="rgba(240,187,64,1)"
                  ></path>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path
                    d="M12.0008 17L6.12295 20.5902L7.72105 13.8906L2.49023 9.40983L9.35577 8.85942L12.0008 2.5L14.6458 8.85942L21.5114 9.40983L16.2806 13.8906L17.8787 20.5902L12.0008 17ZM12.0008 14.6564L14.8175 16.3769L14.0517 13.1664L16.5583 11.0192L13.2683 10.7554L12.0008 7.70792L10.7333 10.7554L7.44326 11.0192L9.94991 13.1664L9.18408 16.3769L12.0008 14.6564Z"
                    fill="rgba(240,187,64,1)"
                  ></path>
                </svg>
                <p className="ml-4 text-gray-800">
                  {" "}
                  {details.rating} (Customer review){" "}
                </p>
              </div>
              <div className="flex gap-2">
                <p
                  className={`${
                    details.discount_price > 0
                      ? "text-gray-500 line-through text-[20px]"
                      : "text-color-1 font-semibold text-[20px]"
                  }`}
                >
                  {details.price} Tk
                </p>
                {details.discount_price > 0 && (
                  <p className="text-color-1 font-semibold text-[20px]">
                    {details.price - details.discount_price} Tk
                  </p>
                )}
              </div>
            </div>
            <div className="grid gap-y-3 mt-4">
              {variant.length > 0 &&
                variant.map((v, index) => (
                  <div key={index}>
                    <p>{v.title}</p>
                    <div className="flex gap-2 mt-2">
                      {v.values.map((v_value, index) => (
                        <div
                          key={index}
                          className={`h-[30px] w-[80px] border border-color-1 rounded-[5px] flex justify-center items-center cursor-pointer ${
                            v_value.variant_value ==
                            selectedVariant[0]?.values?.variant_value
                              ? "!bg-color-1 !text-color-3"
                              : "text-color-1"
                          }`}
                          onClick={() => getVariant(v.title, v_value)}
                        >
                          <p>{v_value.variant_value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
            <div className="border border-gray-100 mt-8"></div>
            <div className="short-des py-8 specefication">
              {
                <div
                  dangerouslySetInnerHTML={{ __html: details.description }}
                />
              }
            </div>
            <div className="border border-gray-100 mb-8"></div>
            <div className="flex gap-4">
              <div className="flex">
                <div className="quantity px-[30px] py-[10px] border border-color-2">
                  <p className="text-[20px] text-color-1">{quantity}</p>
                </div>
                <div className="quantity-controller">
                  <div
                    className="border border-color-2 cursor-pointer"
                    onClick={() => manageQuantity("increment")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path
                        d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"
                        className="fill-color-1"
                      ></path>
                    </svg>
                  </div>
                  <div
                    className="border border-color-2 cursor-pointer"
                    onClick={() => manageQuantity("decrement")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path
                        d="M5 11V13H19V11H5Z"
                        className="fill-color-1"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div onClick={() => addToCart('cart',details)} className="group">
                <button className="bg-color-1 text-color-3 px-[40px] py-[15px] flex justify-center rounded group-hover:bg-color-3 group-hover:text-color-1 transition duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                  >
                    <path
                      d="M4.00436 6.41662L0.761719 3.17398L2.17593 1.75977L5.41857 5.00241H20.6603C21.2126 5.00241 21.6603 5.45012 21.6603 6.00241C21.6603 6.09973 21.6461 6.19653 21.6182 6.28975L19.2182 14.2898C19.0913 14.7127 18.7019 15.0024 18.2603 15.0024H6.00436V17.0024H17.0044V19.0024H5.00436C4.45207 19.0024 4.00436 18.5547 4.00436 18.0024V6.41662ZM6.00436 7.00241V13.0024H17.5163L19.3163 7.00241H6.00436ZM5.50436 23.0024C4.67593 23.0024 4.00436 22.3308 4.00436 21.5024C4.00436 20.674 4.67593 20.0024 5.50436 20.0024C6.33279 20.0024 7.00436 20.674 7.00436 21.5024C7.00436 22.3308 6.33279 23.0024 5.50436 23.0024ZM17.5044 23.0024C16.6759 23.0024 16.0044 22.3308 16.0044 21.5024C16.0044 20.674 16.6759 20.0024 17.5044 20.0024C18.3328 20.0024 19.0044 20.674 19.0044 21.5024C19.0044 22.3308 18.3328 23.0024 17.5044 23.0024Z"
                      className="fill-color-3 group-hover:fill-color-1 transition duration-300"
                    ></path>
                  </svg>
                  <span className="text-[15px] font-medium ml-2">
                    {" "}
                    ADD TO CART
                  </span>
                </button>
              </div>
              <div className="group" onClick={()=>buyProduct(details)}>
                <button className="bg-color-3 text-color-1 px-[40px] py-[15px] flex justify-center rounded group-hover:bg-color-1 group-hover:text-color-3 transition duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                  >
                    <path
                      d="M7.00488 7.99951V5.99951C7.00488 3.23809 9.24346 0.999512 12.0049 0.999512C14.7663 0.999512 17.0049 3.23809 17.0049 5.99951V7.99951H20.0049C20.5572 7.99951 21.0049 8.44723 21.0049 8.99951V20.9995C21.0049 21.5518 20.5572 21.9995 20.0049 21.9995H4.00488C3.4526 21.9995 3.00488 21.5518 3.00488 20.9995V8.99951C3.00488 8.44723 3.4526 7.99951 4.00488 7.99951H7.00488ZM7.00488 9.99951H5.00488V19.9995H19.0049V9.99951H17.0049V11.9995H15.0049V9.99951H9.00488V11.9995H7.00488V9.99951ZM9.00488 7.99951H15.0049V5.99951C15.0049 4.34266 13.6617 2.99951 12.0049 2.99951C10.348 2.99951 9.00488 4.34266 9.00488 5.99951V7.99951Z"
                      className="fill-color-1 group-hover:fill-color-3 transition duration-300"
                    ></path>
                  </svg>
                  <span className="text-[15px] font-medium ml-2">
                    BUY IT NOW
                  </span>
                </button>
              </div>
            </div>
            <div className="border border-gray-100 mt-8"></div>
          </div>
        </div>
      </div>
      <div>{/* <Section/> */}</div>
    </MainLayout>
  );
};
export default Detail;
