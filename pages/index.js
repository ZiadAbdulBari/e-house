import Section from "@/components/Section/Section";
import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "@/layout/MainLayout";
import { ToastContainer, toast } from "react-toastify";
import CommonSlider from "@/components/CommonSlider/CommonSlider";
import CategorySection from "@/components/Home/CategorySection";
import Promotion from "@/components/Home/Promotion";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);
  const getProduct = () => {
    const URL = "https://dummyjson.com/products?limit=8";
    axios.get(URL).then((response) => {
      setProducts(response.data.products);
    });
  };
  const getSliderImage = () => {
    const URL =
      "https://gist.githubusercontent.com/ZiadAbdulBari/4c3ed9b5a0f6d1c133b776504ed90d42/raw/30964284222d77757ab43d5c3491fab8bfb89b14/gistfile1.txt";
    axios.get(URL).then((response) => {
      console.log(response);
      setImages(response.data.images);
    });
  };
  useEffect(() => {
    getSliderImage();
    getProduct();
  }, []);
  return (
    <MainLayout>
      <CommonSlider images={images} />
      {/* CATEGORY */}
      <div className="px-[250px] grid grid-flow-row grid-cols-2 gap-6 my-[100px] h-[800px] overflow-hidden">
        <div>
          <CategorySection
            iURL="https://shorturl.at/bjWX9"
            height="h-[800px]"
            name="MEN"
          />
        </div>
        <div className="grid grid-flow-row gap-6">
          <CategorySection
            iURL="https://shorturl.at/hkBQ0"
            height="h-[390px]"
            name="WOMEN"
          />
          <CategorySection
            iURL="https://shorturl.at/awzEZ"
            height="h-[390px]"
            name="ACCESSORIES"
          />
        </div>
      </div>
      <div className="px-[80px] mt-20">
        <Section sectionName="You Must Have" products={products} />
      </div>
      <div className="my-[100px]">
        <Promotion pIURL="https://images.unsplash.com/photo-1511511450040-677116ff389e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80" />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </MainLayout>
  );
}
