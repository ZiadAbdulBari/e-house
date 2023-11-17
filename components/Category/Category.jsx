import React from "react";

const Category = ({category_name,children}) => {
  return (
    <div className="header-category group">
      <p className="header-category-name transition-all duration-700 group-hover:font-semibold">
        {category_name}
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              className="fill-secondary"
              d="M11.9997 13.1714L16.9495 8.22168L18.3637 9.63589L11.9997 15.9999L5.63574 9.63589L7.04996 8.22168L11.9997 13.1714Z"
            ></path>
          </svg>
        </span>
      </p>
      <div className="header-sub-category group-hover:block">
        <div className="header-sub-category-parent">
          <ul>
            {/* <li>Pant</li>
            <li>Shirt</li>
            <li>T-shirt</li>
            <li>Shorts</li> */}
            {children}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Category;
