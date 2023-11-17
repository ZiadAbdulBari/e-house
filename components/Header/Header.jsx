import { getLoggedinStatus, getToken } from "../../store/authSlice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Category from "../Category/Category";
import Subcategory from "../Subcategory/Subcategory";
import axios from "axios";

const Header = () => {
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const logout = () => {
    window.localStorage.removeItem("isLoggedin");
    window.localStorage.removeItem("token");
    dispatch(getLoggedinStatus());
    dispatch(getToken());
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
            <p className=" text-[40px] font-semibold !font-['Expletus_Sans'] text-secondary">
              <Link href="/">E-House</Link>
            </p>
          </div>
          {/* Header Category */}
          <div className="flex gap-12">
            {
              categories.length>0 && 
              (
                categories.map((cat) =>(
                  <Category
                    category_name={cat.category_name}
                    key={cat.id}
                  >
                    {
                      subcategories.map((subcat)=>(
                        subcat.categoryId==cat.id && (
                          <Subcategory subcategory_name={subcat.subcategory_name} key={subcat.id} />
                        )
                      ))
                    }
                  </Category>

                ))
              )
            }
          </div>
          <div className="flex gap-4">
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
              <button className="reg" onClick={logout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
