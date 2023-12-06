import Link from "next/link";
import toastMessage from "@/plugings/toastify";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getCartProduct } from "@/store/cartSlice";

const ProductCart = ({ product }) => {
  const dispatch = useDispatch();
  const loggedinStatus = useSelector((state) => state.auth.isLoggedin);
  const token = useSelector((state) => state.auth.token);
  const addTOCart = (product) => {
    if (!loggedinStatus) {
      toastMessage("Please login", "w");
    } else {
      
      const cartProduct = {
        product_id: product.id,
        quantity: 1,
        price:parseInt(product.price)-parseInt(product.discount_price)
      };
      axios
        .post("http://localhost:4000/add-to-cart", cartProduct, {
          headers: { Authorization: token },
        })
        .then((response) => {
          if (response.data.status == 200) {
            dispatch(getCartProduct());
            toastMessage(response.data.message, "s");
          }
        })
        .catch((error) => {
          if (error?.response?.data) {
            toastMessage(error?.response?.data?.message, "i");
          } else {
            console.log(error);
          }
        });
    }
  };

  return (
    <div className="h-[500px] border bg-gray-50 relative rounded">
      <div className="h-[350px] w-full bg-white overflow-hidden">
        <img
          src={product.image_url}
          className="h-full w-full object-contain hover:scale-125 transition-all duration-700"
        />
      </div>
      <div className="p-[10px] grid grid-flow-row gap-2">
        <h1 className="font-semibold text-gray-800">{product.title}</h1>
        <div className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
          >
            <path
              d="M12.0008 17L6.12295 20.5902L7.72105 13.8906L2.49023 9.40983L9.35577 8.85942L12.0008 2.5L14.6458 8.85942L21.5114 9.40983L16.2806 13.8906L17.8787 20.5902L12.0008 17Z"
              fill="rgba(245,191,13,1)"
            ></path>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
          >
            <path
              d="M12.0008 17L6.12295 20.5902L7.72105 13.8906L2.49023 9.40983L9.35577 8.85942L12.0008 2.5L14.6458 8.85942L21.5114 9.40983L16.2806 13.8906L17.8787 20.5902L12.0008 17Z"
              fill="rgba(245,191,13,1)"
            ></path>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
          >
            <path
              d="M12.0008 17L6.12295 20.5902L7.72105 13.8906L2.49023 9.40983L9.35577 8.85942L12.0008 2.5L14.6458 8.85942L21.5114 9.40983L16.2806 13.8906L17.8787 20.5902L12.0008 17Z"
              fill="rgba(245,191,13,1)"
            ></path>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
          >
            <path
              d="M12.0008 17L6.12295 20.5902L7.72105 13.8906L2.49023 9.40983L9.35577 8.85942L12.0008 2.5L14.6458 8.85942L21.5114 9.40983L16.2806 13.8906L17.8787 20.5902L12.0008 17Z"
              fill="rgba(245,191,13,1)"
            ></path>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
          >
            <path
              d="M12.0008 14.6564L14.8175 16.3769L14.0517 13.1664L16.5583 11.0192L13.2683 10.7554L12.0008 7.70792V14.6564ZM12.0008 17L6.12295 20.5902L7.72105 13.8906L2.49023 9.40983L9.35577 8.85942L12.0008 2.5L14.6458 8.85942L21.5114 9.40983L16.2806 13.8906L17.8787 20.5902L12.0008 17Z"
              fill="rgba(245,191,13,1)"
            ></path>
          </svg>
        </div>
        <div className="flex gap-2">
          <p
            className={`${
              product.discount_price > 0
                ? "text-gray-500 line-through"
                : "text-gray-800 font-semibold"
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
        <div className="grid grid-flow-col grid-cols-6 transition-all duration-900">
          <Link href={`/product-detail/${encodeURIComponent(product.id)}`}>
            <div className="group flex items-center">
              <div className="w-[35px] h-[35px] flex justify-center items-center rounded-full border border-gray-600 transition-all duration-300 group-hover:bg-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                >
                  <path
                    d="M1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12ZM12.0003 17C14.7617 17 17.0003 14.7614 17.0003 12C17.0003 9.23858 14.7617 7 12.0003 7C9.23884 7 7.00026 9.23858 7.00026 12C7.00026 14.7614 9.23884 17 12.0003 17ZM12.0003 15C10.3434 15 9.00026 13.6569 9.00026 12C9.00026 10.3431 10.3434 9 12.0003 9C13.6571 9 15.0003 10.3431 15.0003 12C15.0003 13.6569 13.6571 15 12.0003 15Z"
                    className="fill-gray-600 transition-all duration-300 group-hover:fill-white"
                  ></path>
                </svg>
              </div>
            </div>
          </Link>
          <div className="group">
            <div
              className="w-[35px] h-[35px] flex justify-center items-center border border-gray-600 rounded-full cursor-pointer transition-all duration-300 group-hover:bg-gray-600"
              onClick={() => addTOCart(product)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
              >
                <path
                  d="M6.50488 2H17.5049C17.8196 2 18.116 2.14819 18.3049 2.4L21.0049 6V21C21.0049 21.5523 20.5572 22 20.0049 22H4.00488C3.4526 22 3.00488 21.5523 3.00488 21V6L5.70488 2.4C5.89374 2.14819 6.19013 2 6.50488 2ZM18.5049 6L17.0049 4H7.00488L5.50488 6H18.5049ZM9.00488 10H7.00488V12C7.00488 14.7614 9.24346 17 12.0049 17C14.7663 17 17.0049 14.7614 17.0049 12V10H15.0049V12C15.0049 13.6569 13.6617 15 12.0049 15C10.348 15 9.00488 13.6569 9.00488 12V10Z"
                  className="fill-gray-600 transition-all duration-300 group-hover:fill-white"
                ></path>
              </svg>
            </div>
          </div>
          <div className="group">
            <div
              className="w-[35px] h-[35px] flex justify-center items-center border border-gray-600 rounded-full cursor-pointer transition-all duration-300 group-hover:bg-gray-600"
              onClick={() => addTOWishlist(product)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
              >
                <path
                  d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853ZM18.827 6.1701C17.3279 4.66794 14.9076 4.60701 13.337 6.01687L12.0019 7.21524L10.6661 6.01781C9.09098 4.60597 6.67506 4.66808 5.17157 6.17157C3.68183 7.66131 3.60704 10.0473 4.97993 11.6232L11.9999 18.6543L19.0201 11.6232C20.3935 10.0467 20.319 7.66525 18.827 6.1701Z"
                  // fill="rgba(176,0,0,1)"
                  className="fill-gray-600 transition-all duration-300 group-hover:fill-white"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        {product.discount_price > 0 && (
          <div className="absolute top-4 left-4 bg-red-500 py-[5px] px-[10px] rounded-[100px]">
            <p className="text-white">-{product.discount_price} Tk</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default ProductCart;
