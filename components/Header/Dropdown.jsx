import Link from "next/link";
import React from "react";

const Dropdown = ({ type, name, id, children }) => {
  return (
    <div className="header-category group">
      <div className="flex gap-2 items-center">
        <div>
          {type == "category" ? (
            <Link href={`/category/${id}`}>
              <p className="header-category-name transition-all duration-300 group-hover:font-semibold">
                {name}
              </p>
            </Link>
          ) : (
            <div className="h-[35px] w-[35px] rounded-full border-2 border-gray-800">
              <img src="../../image/default-image.jpg" alt="" className="w-[30px]" />
            </div>
          )}
        </div>
        <svg
          className="rotate-0 duration-300 group-hover:rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="20"
          height="20"
        >
          <path
            className="fill-orange-500"
            d="M11.9997 13.1714L16.9495 8.22168L18.3637 9.63589L11.9997 15.9999L5.63574 9.63589L7.04996 8.22168L11.9997 13.1714Z"
          ></path>
        </svg>
      </div>
      <div className="header-sub-category group-hover:block">
        <div className="header-sub-category-parent">
          <ul>{children}</ul>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
