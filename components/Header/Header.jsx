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
    const sText = searchText.replaceAll(' ','-');
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
            <form onSubmit={searchProduct}>
              <UiInput
                label=""
                type="text"
                id="search"
                value={searchText}
                name="search"
                placeholder="Search by product name"
                onChange={handleSeach}
              />
            </form>
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
                  <ul>
                    <li>
                      <Link href="/profile">Profile</Link>
                    </li>
                    <li>
                      <Link href="/order">Order history</Link>
                    </li>
                    <li>
                      <UiButton
                        buttonName="Logout"
                        type="denger"
                        onClick={logout}
                      />
                    </li>
                  </ul>
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
