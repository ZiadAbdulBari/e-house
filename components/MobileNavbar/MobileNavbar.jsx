import React, { useEffect, useState } from "react";
import Dropdown from "../Header/Dropdown";
import Option from "../Header/Option";
import axios from "axios";

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [windowSize, setWindowSize] = useState("");
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
  useEffect(() => {
    const size = window.screen.height;
    setWindowSize(size);
  }, []);
  return (
    <div className="bg-gray-50 shadow-lg shadow-gray-400/20">
      <div className="container mx-auto">
        <div className="flex justify-evenly items-center">
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
        </div>
      </div>
      <div
        className="hidden fixed  bottom-[15%] w-full h-[30%] bg-gray-50 z-[99999] pb-[10px]"
        id="mobileSidebar"
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
     
      
      </div>
    </div>
  );
};

export default MobileNavbar;
