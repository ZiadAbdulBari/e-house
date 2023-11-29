import React from "react";

const CategorySection = ({ iURL,name }) => {
  return (
    <div className={"bg-gray-50 relative overflow-hidden h-full"}>
      <div>
        <img src={iURL} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="w-full h-full bg-[#323232bf] absolute top-0 left-0 p-[50px]">
        <div className="w-full h-full flex justify-center items-center">
          <div className="flex gap-4 items-center group cursor-pointer">
            <p className="text-[40px] font-bold text-white">{name}</p>
            <svg className="transition-all duration-700 group-hover:translate-x-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="36"
              height="36"
            >
              <path
                d="M12 11V8L16 12L12 16V13H8V11H12ZM12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20Z"
                className="fill-orange-500"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
