import { getLoggedinStatus, getToken } from "../../store/authSlice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Option from "./Option";
import axios from "axios";
import Dropdown from "./Dropdown";
import UiButton from "../UiKit/UiButton";
import { useRouter } from "next/router";
import UiInput from "../UiKit/UiInput";

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
    axios.get("http://localhost:4000/get-category").then((response) => {
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
    <div className="bg-gray-50">
      <div className="lg:container mx-auto">
        <div className="flex justify-between items-center w-full">
          <div className="w-[33%]">
            <p className=" text-[40px] font-extrabold text-gray-800">
              <Link href="/">Essential</Link>
            </p>
          </div>
          {/* HEADER CATEGORY */}
          <div className="flex gap-12 w-[34%] justify-center">
            {categories.length > 0 &&
              categories.map((cat) => (
                <Dropdown
                  type="category"
                  name={cat.category_name}
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
          <div className="flex gap-4 items-center w-[33%] justify-end">
            <div className="w-[80%]">
              <form className="w-full" onSubmit={searchProduct}>
                {/* <UiInput
                  label=""
                  type="text"
                  id="search"
                  value={searchText}
                  name="search"
                  placeholder="Search by product name"
                  onChange={handleSeach}
                /> */}
                <div className="relative w-full h-[40px] rounded-full">
                  <input
                    className=" px-[20px] py-[5px] w-full h-full rounded-full border border-gray-200 outline-gray-300 placeholder:text-gray-300 placeholder:text-[16px]"
                    type="text"
                    value={searchText}
                    name="search"
                    placeholder="Search by product name"
                    onChange={handleSeach}
                  />
                  <div onClick={searchProduct} className="cursor-pointer absolute top-0 right-0 rounded-full h-full w-[50px] bg-orange-500 flex justify-center items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="22"
                      height="22"
                    >
                      <path
                        d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"
                        fill="rgba(243,239,239,1)"
                      ></path>
                    </svg>
                  </div>
                </div>
              </form>
            </div>
            <div className="flex gap-2">
              {!isLoggedin && (
                <button className="login">
                  <Link href="/signup">Login</Link>
                </button>
              )}
              {!isLoggedin && (
                <button className="reg">
                  <Link href="/signin">Registration</Link>
                </button>
              )}
              {isLoggedin && (
                <Dropdown type="profile" name="Ziad">
                    <li>
                      <Link href="/profile">Profile</Link>
                    </li>
                    <li>
                      <Link href="/order">Order history</Link>
                    </li>
                    <li>
                      <UiButton
                        buttonName="Logout"
                        externalClass="bg-red-500 text-white py-[2px]"
                        onClick={logout}
                      />
                    </li>
                </Dropdown>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
