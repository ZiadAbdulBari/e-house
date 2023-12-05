import FilterOptions from "@/components/FilterOptions/FilterOptions";
import Section from "@/components/Section/Section";
import MainLayout from "@/layout/MainLayout";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Filter = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const [totalProduct, setTotalProduct] = useState(0);
  const getFilterData = () => {
    console.log(query);
    axios
      .post(`http://localhost:4000/filter/${query}&false&false`)
      .then((response) => {
        console.log(response);
        setProducts(response.data?.result?.product);
        setTitle(response.data?.result?.title);
        setTotalProduct(response.data?.result?.count);
      });
  };
  useEffect(() => {
    if (router?.query?.name) {
      console.log(router);
      setQuery(router.query.name);
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
        <div className="flex w-full gap-2">
          <div className="w-[20%] h-screen bg-gray-50">
            <FilterOptions />
          </div>
          <div className="w-[80%]">
            <Section sectionName={title} count={totalProduct} products={products} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Filter;
