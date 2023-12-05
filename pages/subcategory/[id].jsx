import FilterOptions from "@/components/FilterOptions/FilterOptions";
import MainLayout from "@/layout/MainLayout";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Subcategory = () => {
    const router = useRouter();
  const [query, setQuery] = useState("");
  const getFilterData = () => {
    // console.log(query);
    axios
      .post(`http://localhost:4000/filter/false&false&${query}`)
      .then((response) => {
        console.log(response);
      });
  };
  useEffect(() => {
    console.log(router);
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
        <div className="flex w-full gap-2">
          <div className="w-[20%] h-screen bg-gray-50">
            <FilterOptions />
          </div>
          <div className="w-[80%]">{/* <Section/> */}</div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Subcategory;
