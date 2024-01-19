import React, { useEffect, useState } from "react";
import Dropdown from "../Header/Dropdown";
import Option from "../Header/Option";
import axios from "axios";
import { useSelector } from "react-redux";
import Link from "next/link";

const MobileNavbar = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [windowSize, setWindowSize] = useState("");
  const cartCount = useSelector((state) => state.cart.cartCount);
  const loggedinStatus = useSelector((state) => state.auth.isLoggedin);
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
    axios.get(`${process.env.baseurl}/get-category`).then((response) => {
      // console.log(response);
      if (response?.data?.status == 200) {
        setCategories(response?.data?.categories);
      }
    });
  };
  const getSubCategory = () => {
    axios.get(`${process.env.baseurl}/get-subcategory`).then((response) => {
      if (response?.data?.status == 200) {
        setSubcategories(response?.data?.subcategories);
      }
    });
  };
  useEffect(() => {
    const size = window.screen.height;
    setWindowSize(size - 50);
  }, [isOpen]);
  useEffect(() => {
    getCategory();
    getSubCategory();
  }, []);
  return (
    <div className="xs:flex lg:hidden justify-between items-center w-full">
      <div className="w-[30%]">1</div>
      <div className="w-[40%]">
      <p className="text-[20px] font-extrabold text-color-1 text-center">
          <Link href="/">Essential</Link>
        </p>
      </div>
      <div className="w-[30%]">3</div>
    </div>
  );
};

export default MobileNavbar;
