import FilterOptions from "@/components/FilterOptions/FilterOptions";
import Section from "@/components/Section/Section";
import MainLayout from "@/layout/MainLayout";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Category = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [subcategory,setSubcategory] = useState([]);
  const [products,setProducts] = useState([]);
  const [title,setTitle] = useState('');
  const [totalProduct,setTotalProduct] = useState(0);
  const getFilterData = () => {
    axios
      .post(`http://localhost:4000/filter/false&${query}&false`)
      .then((response) => {
        if(response?.data?.status==200){
            setSubcategory(response.data?.result?.subcategory);
            setProducts(response.data?.result?.product);
            setTitle(response.data?.result?.title);
            setTotalProduct(response.data?.result?.count);

        }
        // console.log(response);
      });
  };
  useEffect(() => {
    if (router?.query?.id) {
      setQuery(router.query.id);
    }
  }, [router]);
  useEffect(() => {
    if (query) {
      getFilterData();
    }
  }, [query]);
  return (
    <MainLayout>
      <div className="px-[250px]">
        {/* <h2>{title}({totalProduct})</h2> */}
        <div className="flex w-full gap-2">
          {/* <div className="w-[20%] h-screen bg-gray-50">
            <FilterOptions subcategory={subcategory}/>
          </div> */}
          <div className="w-[100%]">
            <Section sectionName={title} count={totalProduct} products={products}/>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Category;