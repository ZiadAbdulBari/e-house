import Section from "@/components/Section/Section";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "@/layout/MainLayout";
const inter = Inter({ subsets: ["latin"] });
import { ToastContainer, toast } from "react-toastify";
import CommonSlider from "@/components/CommonSlider/CommonSlider";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [images,setImages] = useState([]);
  const getProduct = () => {
    const URL = "https://dummyjson.com/products";
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
      <div className="lg:container mx-auto mt-20">
        <Section sectionName="New Arrival" products={products} />
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
