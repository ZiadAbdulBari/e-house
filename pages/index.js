import Section from "@/components/Section/Section";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "@/layout/MainLayout";
const inter = Inter({ subsets: ["latin"] });
import { ToastContainer, toast } from 'react-toastify';
export default function Home() {
  const [products, setProducts] = useState([]);
  const getProduct = () => {
    const URL = "https://dummyjson.com/products";
    axios.get(URL).then((response) => {
      setProducts(response.data.products);
    });
  };
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <MainLayout>
      <div>
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
