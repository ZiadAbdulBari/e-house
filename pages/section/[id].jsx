import Section from "@/components/Section/Section";
import MainLayout from "@/layout/MainLayout";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const SectionFilter = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const [totalProduct, setTotalProduct] = useState(0);
  const getFilterData = () => {
    axios
      .post(`http://localhost:4000/filter/false&false&false&${query}`)
      .then((response) => {
        if (response?.data?.status == 200) {
          //   setSubcategory(response.data?.result?.subcategory);
          setProducts(response.data?.result?.product);
          setTitle(response.data?.result?.title);
          setTotalProduct(response.data?.result?.count);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
      if (router?.query?.id) {
        console.log(router?.query?.id)
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
      <div className="lg:container mx-auto">
        <div className="flex w-full gap-2">
          {/* <div className="w-[20%] h-screen bg-gray-50">
            <FilterOptions subcategory={subcategory}/>
          </div> */}
          <div className="w-[100%]">
            <Section
              sectionName={title}
              count={totalProduct}
              products={products}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SectionFilter;
