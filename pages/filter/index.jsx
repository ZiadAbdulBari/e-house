import FilterOptions from "@/components/FilterOptions/FilterOptions";
import Section from "@/components/Section/Section";
import MainLayout from "@/layout/MainLayout";
import React from "react";

const Filter = () => {
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

export default Filter;
