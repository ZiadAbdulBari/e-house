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
    <div className="bg-gray-50 shadow-lg shadow-gray-400/20">
      <div className="lg:container mx-auto">
        <div className="flex justify-between items-center w-full">
          <div className="w-[33%]">
            <p className=" text-[40px] font-extrabold text-color-1">
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
          <div className="flex gap-4 items-center w-[33%] justify-end">
            <div className="w-[80%]">
              <form className="w-full" onSubmit={searchProduct}>
                <div className="relative w-full h-[40px] rounded-full">
                  <input
                    className=" px-[20px] py-[5px] w-full h-full rounded-full border border-color-2 outline-gray-300 placeholder:text-color-2 placeholder:text-[16px] text-color-1"
                    type="text"
                    value={searchText}
                    name="search"
                    placeholder="Search by product name"
                    onChange={handleSeach}
                  />
                  <div
                    onClick={searchProduct}
                    className="cursor-pointer absolute top-0 right-0 rounded-full h-full w-[50px] bg-color-1 flex justify-center items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="22"
                      height="22"
                    >
                      <path
                        d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"
                        className="fill-color-3"
                      ></path>
                    </svg>
                  </div>
                </div>
              </form>
            </div>
            <div className="flex gap-2">
              {!isLoggedin && (
                <Link href="/signup" className="login">
                  Login
                </Link>
              )}
              {!isLoggedin && (
                <Link href="/signin" className="reg">
                  Registration
                </Link>
              )}
              {isLoggedin && (
                <Dropdown type="profile" name="Ziad">
                  <li>
                    <Link href="/profile" className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="18"
                        height="18"
                        className="fill-color-1"
                      >
                        <path d="M20 22H18V20C18 18.3431 16.6569 17 15 17H9C7.34315 17 6 18.3431 6 20V22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13ZM12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"></path>
                      </svg>
                      <>Profile</>
                    </Link>
                  </li>
                  <li>
                    <Link href="/order" className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="18"
                        height="18"
                        className="fill-color-1"
                      >
                        <path d="M8.00008 6V9H5.00008V6H8.00008ZM3.00008 4V11H10.0001V4H3.00008ZM13.0001 4H21.0001V6H13.0001V4ZM13.0001 11H21.0001V13H13.0001V11ZM13.0001 18H21.0001V20H13.0001V18ZM10.7072 16.2071L9.29297 14.7929L6.00008 18.0858L4.20718 16.2929L2.79297 17.7071L6.00008 20.9142L10.7072 16.2071Z"></path>
                      </svg>
                      <>History</>
                    </Link>
                  </li>
                  <li
                    className="text-red-500 flex items-center gap-2"
                    onClick={logout}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      className="fill-red-500"
                    >
                      <path d="M5 11H13V13H5V16L0 12L5 8V11ZM3.99927 18H6.70835C8.11862 19.2447 9.97111 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C9.97111 4 8.11862 4.75527 6.70835 6H3.99927C5.82368 3.57111 8.72836 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C8.72836 22 5.82368 20.4289 3.99927 18Z"></path>
                    </svg>
                    <>Logout</>
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
