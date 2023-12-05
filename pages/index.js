import Section from "@/components/Section/Section";
import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "@/layout/MainLayout";
import { ToastContainer, toast } from "react-toastify";
import CommonSlider from "@/components/CommonSlider/CommonSlider";
import CategorySection from "@/components/Home/CategorySection";
import Promotion from "@/components/Home/Promotion";
import { useDispatch } from "react-redux";
import { getLoggedinStatus, getToken } from "@/store/authSlice";
import { getCartProduct } from "@/store/cartSlice";
export default function Home() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const getProduct = () => {
    const URL = "http://localhost:4000/get-product";
    axios.get(URL).then((response) => {
      console.log(response);
      setProducts(response.data.products);
    });
  };
  const getSliderImage = () => {
    const img = [
      "../image/banner-1.jpg",
      "../image/banner-2.jpg",
      "../image/banner-3.jpg",
    ];
    setImages(img);
  };
  const homepageCategory = () => {
    axios.get("http://localhost:4000/get-category").then((response) => {
      if (response?.data?.status == 200) {
        setCategories(response?.data?.categories);
      }
    });
  };
  useEffect(() => {
    dispatch(getLoggedinStatus());
    dispatch(getToken());
  }, []);
  useEffect(() => {
    homepageCategory();
    getSliderImage();
    getProduct();
  }, []);
  return (
    <MainLayout>
      <CommonSlider images={images} />
      {/* CATEGORY */}
      {categories.length > 0 ? (
        <div className="px-[250px] grid grid-cols-3 gap-6 my-[100px] max-h-[300px] overflow-hidden">
          {/* {categories.length > 0 &&
              categories.map(
                (cat) =>
                  cat.category_name == "Men" && (
                    <div key={cat.id}>
                      <CategorySection
                        iURL={cat.image_url}
                        height="h-[800px]"
                        name={cat.category_name}
                      />
                    </div>
                  )
              )} */}
          {/* className="grid grid-flow-row gap-6" */}
          {categories.map((cat) => (
            <CategorySection
              iURL={cat.image_url}
              // height="h-[390px]"
              name={cat.category_name}
              key={cat.id}
            />
          ))}
        </div>
      ) : (
        <div>
          <p className="text-center font-semibold text-[18px] text-gary-800">
            Categories are not found
          </p>
        </div>
      )}
      <div className="px-[250px] mt-20">
        {products.length > 0 ? (
          <Section sectionName="New Arrival" count='0' products={products} />
        ) : (
          <div>
            <p className="text-center font-semibold text-[18px] text-gary-800">
              Products are not found
            </p>
          </div>
        )}
      </div>
      <div className="my-[100px]">
        <Promotion pIURL="https://images.unsplash.com/photo-1511511450040-677116ff389e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80" />
      </div>
    </MainLayout>
  );
}
