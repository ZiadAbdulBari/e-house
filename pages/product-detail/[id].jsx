import ImageSlider from "@/components/ProductDetail/ImageSlider";
import Section from "@/components/Section/Section";
import UiTab from "@/components/UiTab/UiTab";
import { AuthContext } from "@/contaxt/AuthContext";
import { CartContext } from "@/contaxt/CartContext";
import MainLayout from "@/layout/MainLayout";
import toastMessage from "@/plugings/toastify";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
const Detail = () => {
  const router = useRouter();
  const { isLoggedIn } = useContext(AuthContext);
  const { addCartData, cartData } = useContext(CartContext);
  const [details, setDetails] = useState([]);
  const [productImage, setProductImage] = useState([]);
  const detailData = () => {
    const URL = `https://dummyjson.com/products/${router.query.id}`;
    axios
      .get(URL)
      .then((response) => {
        setDetails(response.data);
        if (response.data.images.length > 0) {
          const images = response.data.images;
          images.push(response.data.thumbnail);
          setProductImage(images);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const addToCart = (product) => {
    if (!isLoggedIn) {
      toastMessage("Please login", "w");
    } else {
      const cartProduct = {
        id: product.id,
        image: product.thumbnail,
        title: product.title,
        price: product.price,
      };
      const alreadyExist = cartData.filter((data) => data.id == cartProduct.id);
      if (alreadyExist.length > 0) {
        toastMessage("Already exist", "i");
      } else {
        addCartData(cartProduct);
        toastMessage("Successfully added to cart", "s");
      }
    }
  };
  useEffect(() => {
    detailData();
  }, []);
  return (
    <MainLayout>
      <div className="px-[300px]">
        <div className="flex gap-8 h-full mt-[30px]">
          <div className="image w-[50%] h-[500px]">
            <ImageSlider productImage={productImage} className="w-full" />
          </div>
          <div className="w-[50%] h-full">
            <div className="grid grid-flow-row gap-y-4">
              <div className="flex justify-between">
                <h1 className="font-semibold text-[30px] text-gray-700">{details.title}</h1>
                <div className="wishlist bg-gray-100 p-2 rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="30"
                    height="30"
                  >
                    <path
                      d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853ZM18.827 6.1701C17.3279 4.66794 14.9076 4.60701 13.337 6.01687L12.0019 7.21524L10.6661 6.01781C9.09098 4.60597 6.67506 4.66808 5.17157 6.17157C3.68183 7.66131 3.60704 10.0473 4.97993 11.6232L11.9999 18.6543L19.0201 11.6232C20.3935 10.0467 20.319 7.66525 18.827 6.1701Z"
                      fill="rgba(245,0,0,1)"
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
                <p className="ml-4 text-gray-700"> {details.rating} (Customer review) </p>
              </div>
              <p className="font-semibold text-[20px] text-gray-700">
                ${details.price}
              </p>

            </div>
            <div className="border border-gry-300 mt-8"></div>
            <div className="short-des py-12">
              <p className="text-gray-400">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </p>
            </div>
            <div className="border border-gry-300 mb-8"></div>
            <div className="flex gap-8">
              <div className="flex">
                <div className="quantity px-[30px] py-[10px] border border-gray-400">
                  <p className="text-[20px]">1</p>
                </div>
                <div className="quantity-controller">
                  <div className="border border-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path
                        d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"
                        fill="rgba(90,90,90,1)"
                      ></path>
                    </svg>
                  </div>
                  <div className="border border-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path
                        d="M5 11V13H19V11H5Z"
                        fill="rgba(90,90,90,1)"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div onClick={() => addToCart(details)}>
                <button className="bg-orange-700 text-white px-[40px] py-[15px] flex justify-center">
                  <span className="text-[15px]"> ADD TO CART</span>
                </button>
              </div>
              <div onClick={() => addToCart(details)}>
                <button className="bg-orange-700 text-white px-[40px] py-[15px] flex justify-center">
                  <span className="text-[15px]">BUY IT NOW</span>
                </button>
              </div>
            </div>
            <div className="border border-gry-300 mt-8"></div>
            <div className="tab mt-8">
              <UiTab/>
            </div>
          </div>
        </div>
      </div>
      <div>
        {/* <Section/> */}
      </div>
    </MainLayout>
  );
};
export default Detail;
