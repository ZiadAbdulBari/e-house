import Link from "next/link";
import React from "react";

const Dropdown = ({ type, name, image_url, id, children }) => {
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
            <div className="h-[35px] w-[35px] rounded-full border-2 border-color-1 overflow-hidden">
              <img
                src="../../image/default-image.jpg"
                alt="User image"
                className="w-[35px]"
              />
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
            className="fill-color-2"
            d="M11.9997 13.1714L16.9495 8.22168L18.3637 9.63589L11.9997 15.9999L5.63574 9.63589L7.04996 8.22168L11.9997 13.1714Z"
          ></path>
        </svg>
      </div>
      <div
        className={`header-sub-category group-hover:block transition-all duration-300 ${
          type == "category"
            ? "max-w-[800px] w-[700px] left-[50%] -translate-x-[50%]"
            : "max-w-[300px] w-[200px] left-[-20px]"
        }`}
      >
        <div className={`header-sub-category-parent ${type == "category" && 'flex justify-between'}`}>
          <div>
            <ul>{children}</ul>
          </div>
          {type == "category" && (
            <div className="w-[30%] rounded py-[10px] overflow-hidden">
              <img src={image_url} alt="Category image" className="rounded" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
