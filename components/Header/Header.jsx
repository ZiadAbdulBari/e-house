import { getLoggedinStatus, getToken } from "../../store/authSlice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Option from "./Option";
import axios from "axios";
import Dropdown from "./Dropdown";
import UiButton from "../UiKit/UiButton";
import { useRouter } from "next/router";

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const logout = () => {
    window.localStorage.removeItem("isLoggedin");
    window.localStorage.removeItem("token");
    dispatch(getLoggedinStatus());
    dispatch(getToken());
    router.push('/')
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
  useEffect(()=>{
    dispatch(getLoggedinStatus());
    dispatch(getToken());
  },[])
  useEffect(() => {
    getCategory();
    getSubCategory();
  }, []);

  return (
    <div className="bg-gray-50">
      <div className="lg:container mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <p className=" text-[40px] font-extrabold text-gray-800">
              <Link href="/">Essential</Link>
            </p>
          </div>
          {/* HEADER CATEGORY */}
          <div className="flex gap-12">
            {
              categories.length>0 && 
              (
                categories.map((cat) =>(
                  <Dropdown type='category'
                    name={cat.category_name}
                    key={cat.id}
                  >
                    {
                      subcategories.map((subcat)=>(
                        subcat.categoryId==cat.id && (
                          // HEADER SUB-CATEGORY
                          <Option option_name={subcat.subcategory_name} key={subcat.id} />
                        )
                      ))
                    }
                  </Dropdown>

                ))
              )
            }
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
              <Dropdown type='profile' name="Ziad">
                <Option type="link" option_name="Profile" destination="/profile" />
                <Option type="link" option_name="Order history" destination="/order" />
                <UiButton buttonName="Logout" type="denger" onClick={logout} />
              </Dropdown>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
