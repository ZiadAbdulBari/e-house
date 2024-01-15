import React, { useEffect, useState } from "react";
import Dropdown from "../Header/Dropdown";
import Option from "../Header/Option";
import axios from "axios";
import { useSelector } from "react-redux";

const MobileNavbar = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [windowSize, setWindowSize] = useState("");
  const cartCount = useSelector((state) => state.cart.cartCount);
  const cartControl = () => {
    const selectCart = document.getElementById("mobileSidebar");
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
  const getCategory = () => {
    axios.get("http://localhost:4000/get-category").then((response) => {
      // console.log(response);
      if (response?.data?.status == 200) {
        setCategories(response?.data?.categories);
      }
    });
  };
  const getSubCategory = () => {
    axios.get("http://localhost:4000/get-subcategory").then((response) => {
      if (response?.data?.status == 200) {
        setSubcategories(response?.data?.subcategories);
      }
    });
  };
  useEffect(() => {
    const size = window.screen.height;
    setWindowSize(size);
  }, []);
  useEffect(() => {
    getCategory();
    getSubCategory();
  }, []);
  return (
    <div className="bg-gray-50 shadow-lg shadow-gray-400/20">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          {/* home */}
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="32"
              height="32"
              className="fill-color-1"
              onClick={cartControl}
            >
              <path d="M19 21H5C4.44772 21 4 20.5523 4 20V11L1 11L11.3273 1.6115C11.7087 1.26475 12.2913 1.26475 12.6727 1.6115L23 11L20 11V20C20 20.5523 19.5523 21 19 21ZM6 19H18V9.15745L12 3.7029L6 9.15745V19ZM9 9.99998H15V16H9V9.99998ZM11 12V14H13V12H11Z"></path>
            </svg>
          </div>
          {/* category */}
          <div className="flex gap-6 w-[25%] justify-center">
            {categories.length > 0 &&
              categories.map((cat) => (
                <Dropdown
                  type="category"
                  name={cat.category_name}
                  image_url={cat.image_url}
                  id={cat.id}
                  key={cat.id}
                >
                  {subcategories.map(
                    (subcat) =>
                      subcat.categoryId == cat.id && (
                        // HEADER SUB-CATEGORY
                        <Option
                          id={subcat.id}
                          option_name={subcat.subcategory_name}
                          key={subcat.id}
                        />
                      )
                  )}
                </Dropdown>
              ))}
          </div>
          {/* cart */}
          <div
        className=" z-[999] rounded-l cursor-pointer"
        onClick={cartControl}
      >
        <div className="p-2">
          <div className="absolute font-semibold text-color-1 text-[25px] top-[-6px] left-[32px] p-[10px] rounded-full">
            {cartCount}
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="32"
            height="32"
            className="fill-color-1"
          >
            <path d="M4.00436 6.41686L0.761719 3.17422L2.17593 1.76001L5.41857 5.00265H20.6603C21.2126 5.00265 21.6603 5.45037 21.6603 6.00265C21.6603 6.09997 21.6461 6.19678 21.6182 6.29L19.2182 14.29C19.0913 14.713 18.7019 15.0027 18.2603 15.0027H6.00436V17.0027H17.0044V19.0027H5.00436C4.45207 19.0027 4.00436 18.5549 4.00436 18.0027V6.41686ZM6.00436 7.00265V13.0027H17.5163L19.3163 7.00265H6.00436ZM5.50436 23.0027C4.67593 23.0027 4.00436 22.3311 4.00436 21.5027C4.00436 20.6742 4.67593 20.0027 5.50436 20.0027C6.33279 20.0027 7.00436 20.6742 7.00436 21.5027C7.00436 22.3311 6.33279 23.0027 5.50436 23.0027ZM17.5044 23.0027C16.6759 23.0027 16.0044 22.3311 16.0044 21.5027C16.0044 20.6742 16.6759 20.0027 17.5044 20.0027C18.3328 20.0027 19.0044 20.6742 19.0044 21.5027C19.0044 22.3311 18.3328 23.0027 17.5044 23.0027Z"></path>
          </svg>
        </div>
      </div>
        </div>
      </div>
      <div
        className="hidden fixed  bottom-[15%] w-full h-[30%] bg-gray-50 z-[99999] pb-[10px]"
        id="mobileSidebar"
      >
        <div className="flex justify-end items-center h-[10%] px-[10px]">
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
      </div>
    </div>
  );
};

export default MobileNavbar;
