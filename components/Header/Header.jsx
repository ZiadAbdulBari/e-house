import { getLoggedinStatus, getToken } from "../../store/authSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Option from "./Option";
import axios from "axios";
import Link from "next/link";
import Dropdown from "./Dropdown";
import UiButton from "../UiKit/UiButton";
import { useRouter } from "next/router";
import UiInput from "../UiKit/UiInput";
import DesktopNavbar from "../Navbar/DesktopNavbar";
import MobileNavbar from "../Navbar/MobileNavbar";

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [searchText, setSearchText] = useState("");
  const logout = () => {
    window.localStorage.removeItem("isLoggedin");
    window.localStorage.removeItem("token");
    dispatch(getLoggedinStatus());
    dispatch(getToken());
    router.push("/");
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
  const handleSeach = (e) => {
    setSearchText(e.target.value);
  };
  const searchProduct = (e) => {
    e.preventDefault();
    const sText = searchText.replaceAll(" ", "-");
    router.push(`/search/${sText}`);
  };
  useEffect(() => {
    dispatch(getLoggedinStatus());
    dispatch(getToken());
  }, []);
  useEffect(() => {
    getCategory();
    getSubCategory();
  }, []);

  return (
    <div className="bg-gray-50 shadow-lg shadow-gray-400/20 py-[10px] lg:py-0">
      <div className="px-[10px] lg:px-0 lg:container mx-auto">
        <DesktopNavbar
          categories={categories}
          subcategories={subcategories}
          onSubmit={searchProduct}
          value={searchText}
          onChange={handleSeach}
          onClick={searchProduct}
          isLoggedin={isLoggedin}
          logout={logout}
        />
        <MobileNavbar 
          categories={categories}
          subcategories={subcategories}
          onSubmit={searchProduct}
          value={searchText}
          onChange={handleSeach}
          onClick={searchProduct}
          isLoggedin={isLoggedin}
          logout={logout}
        />
      </div>
    </div>
  );
};

export default Header;
