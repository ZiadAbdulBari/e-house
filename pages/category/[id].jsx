import FilterOptions from "@/components/FilterOptions/FilterOptions";
import Section from "@/components/Section/Section";
import MainLayout from "@/layout/MainLayout";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilterData } from "@/store/filterSlice";

const Category = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [subcategory,setSubcategory] = useState([]);
  const products = useSelector((state)=>state.filter.products)
  const title = useSelector((state)=>state.filter.title)
  const totalProduct = useSelector((state)=>state.filter.productCount)

  const getFilterProduct = () => {
    const url = `false&${query}&false&false`;
    dispatch(getFilterData(url))
    // axios
    //   .post(`http://localhost:4000/filter/false&${query}&false&false`)
    //   .then((response) => {
    //     if(response?.data?.status==200){
    //         setSubcategory(response.data?.result?.subcategory);
    //         setProducts(response.data?.result?.product);
    //         setTitle(response.data?.result?.title);
    //         setTotalProduct(response.data?.result?.count);

    //     }
    //     // console.log(response);
    //   });
  };
  useEffect(() => {
    if (router?.query?.id) {
      setQuery(router.query.id);
    }
  }, [router]);
  useEffect(() => {
    if (query) {
      getFilterProduct();
    }
  }, [query]);
  return (
    <MainLayout>
      <div className="lg:container mx-auto">
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
