import React, { useEffect, useState } from "react";
import Link from "next/link";
import Cart from "../Cart/Cart";
import { useRouter } from "next/router";
import AccordionWrapper from "../UiKit/Accordion/AccordionWrapper";
import Children from "../UiKit/Accordion/Children";

const MobileNavbar = ({
  categories,
  subcategories,
  onSubmit,
  value,
  onChange,
  onClick,
  isLoggedin,
  logout,
}) => {
  const [leftsidebar, setLeftSidebar] = useState(false);
  const [searchSlider, setSearchSlider] = useState(false);
  const router = useRouter();
  const redirectToAuth = () => {
    if (!isLoggedin) {
      router.push("/signup");
    }
  };
  const userLogout = () => {
    logout();
    setLeftSidebar(false);
  };
  return (
    <>
      <div className="flex lg:hidden justify-between items-center w-full h-[50px]">
        <div className="w-[30%]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            onClick={() => setLeftSidebar(true)}
          >
            <path
              d="M3 8H21C21.2652 8 21.5196 7.89464 21.7071 7.70711C21.8946 7.51957 22 7.26522 22 7C22 6.73478 21.8946 6.48043 21.7071 6.29289C21.5196 6.10536 21.2652 6 21 6H3C2.73478 6 2.48043 6.10536 2.29289 6.29289C2.10536 6.48043 2 6.73478 2 7C2 7.26522 2.10536 7.51957 2.29289 7.70711C2.48043 7.89464 2.73478 8 3 8ZM21 16H3C2.73478 16 2.48043 16.1054 2.29289 16.2929C2.10536 16.4804 2 16.7348 2 17C2 17.2652 2.10536 17.5196 2.29289 17.7071C2.48043 17.8946 2.73478 18 3 18H21C21.2652 18 21.5196 17.8946 21.7071 17.7071C21.8946 17.5196 22 17.2652 22 17C22 16.7348 21.8946 16.4804 21.7071 16.2929C21.5196 16.1054 21.2652 16 21 16ZM21 11H3C2.73478 11 2.48043 11.1054 2.29289 11.2929C2.10536 11.4804 2 11.7348 2 12C2 12.2652 2.10536 12.5196 2.29289 12.7071C2.48043 12.8946 2.73478 13 3 13H21C21.2652 13 21.5196 12.8946 21.7071 12.7071C21.8946 12.5196 22 12.2652 22 12C22 11.7348 21.8946 11.4804 21.7071 11.2929C21.5196 11.1054 21.2652 11 21 11Z"
              className="fill-color-1"
            />
          </svg>
        </div>
        {/* Logo part */}
        <div className="w-[40%]">
          <p className="text-[20px] font-extrabold text-color-1 text-center">
            <Link href="/">Essential</Link>
          </p>
        </div>
        <div className="w-[30%]">
          <div className="flex justify-end gap-2">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                onClick={() => setSearchSlider(true)}
              >
                <g clipPath="url(#clip0_2_862)">
                  <path
                    d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
                    className="fill-color-1"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2_862">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <Cart />
            {!isLoggedin && (
              <div className="lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  onClick={redirectToAuth}
                >
                  <path
                    d="M15.71 12.71C16.6904 11.9387 17.406 10.8809 17.7572 9.68394C18.1085 8.48697 18.0779 7.21027 17.6698 6.03147C17.2617 4.85267 16.4963 3.83039 15.4801 3.10686C14.4639 2.38332 13.2474 1.99451 12 1.99451C10.7525 1.99451 9.53611 2.38332 8.51993 3.10686C7.50374 3.83039 6.73834 4.85267 6.33021 6.03147C5.92208 7.21027 5.89151 8.48697 6.24276 9.68394C6.59401 10.8809 7.3096 11.9387 8.29 12.71C6.61007 13.383 5.14428 14.4994 4.04889 15.9399C2.95349 17.3805 2.26956 19.0913 2.07 20.89C2.05555 21.0213 2.06711 21.1542 2.10402 21.2811C2.14093 21.4079 2.20246 21.5263 2.28511 21.6293C2.45202 21.8375 2.69478 21.9708 2.96 22C3.22521 22.0292 3.49116 21.9518 3.69932 21.7849C3.90749 21.618 4.04082 21.3752 4.07 21.11C4.28958 19.1552 5.22168 17.3498 6.68822 16.0388C8.15475 14.7278 10.0529 14.003 12.02 14.003C13.9871 14.003 15.8852 14.7278 17.3518 16.0388C18.8183 17.3498 19.7504 19.1552 19.97 21.11C19.9972 21.3557 20.1144 21.5827 20.2991 21.747C20.4838 21.9114 20.7228 22.0015 20.97 22H21.08C21.3421 21.9698 21.5817 21.8373 21.7466 21.6313C21.9114 21.4252 21.9881 21.1624 21.96 20.9C21.7595 19.0962 21.0719 17.381 19.9708 15.9382C18.8698 14.4954 17.3969 13.3795 15.71 12.71ZM12 12C11.2089 12 10.4355 11.7654 9.77772 11.3259C9.11992 10.8864 8.60723 10.2616 8.30448 9.53074C8.00173 8.79983 7.92251 7.99557 8.07686 7.21964C8.2312 6.44372 8.61216 5.73099 9.17157 5.17158C9.73098 4.61217 10.4437 4.2312 11.2196 4.07686C11.9956 3.92252 12.7998 4.00173 13.5307 4.30448C14.2616 4.60724 14.8863 5.11993 15.3259 5.77772C15.7654 6.43552 16 7.20888 16 8C16 9.06087 15.5786 10.0783 14.8284 10.8284C14.0783 11.5786 13.0609 12 12 12Z"
                    className="fill-color-1"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* category slider */}
      <div
        className={`w-full h-[100vh] fixed top-0 ${
          leftsidebar ? "right-[0%]" : "right-[100%]"
        } z-[99999] bg-gray-50 transition-all duration-300`}
      >
        <div className="w-full h-[7%] flex items-center justify-between px-[10px] border-b-2 border-gray-100 bg-white">
          <h1 className="text-[25px] font-extrabold text-color-1">Essential</h1>
          <div className="bg-white boxShadow-1 rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              onClick={() => setLeftSidebar(false)}
            >
              <g clipPath="url(#clip0_28_60)">
                <path
                  d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                  className="fill-color-1"
                />
              </g>
              <defs>
                <clipPath id="clip0_28_60">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
        <div className="h-[93%]">
          <div className={`${!isLoggedin?'h-[100%]':'h-[70%] border-b-2 border-gray-100'} w-full overflow-y-auto py-[10px]`}>
            {categories.length > 0 &&
              categories.map((cat) => (
                <AccordionWrapper
                  key={cat.id}
                  id={cat.id}
                  title={cat.category_name}
                >
                  {subcategories.map(
                    (subcat) =>
                      subcat.categoryId == cat.id && (
                        <Children
                          key={subcat.id}
                          id={subcat.id}
                          title={subcat.subcategory_name}
                        />
                      )
                  )}
                </AccordionWrapper>
              ))}
          </div>
          {isLoggedin && (
            <div className="h-[30%] w-full overflow-y-auto py-[10px]">
              <p className="px-[10px] text-gray-700 font-medium mb-3">
                My Account
              </p>
              <Link
                href="/profile"
                className="block px-[10px] py-[5px] text-[16px] text-color-1"
              >
                Profile
              </Link>
              <Link
                href="/order"
                className="block px-[10px] py-[5px] text-[16px] text-color-1"
              >
                Order
              </Link>
              <p
                className=" px-[10px] py-[5px] text-[16px] text-color-1 text-red-500"
                onClick={userLogout}
              >
                Logout
              </p>
            </div>
          )}
        </div>
      </div>
      {/* search slider */}
      <div
        className={`h-[50px] w-[100vw] bg-gray-50 fixed ${
          searchSlider ? "top-0" : "-top-[50px]"
        } right-0 z-[99999] transition-all duration-300`}
      >
        <div className="flex h-full w-full px-[5px] justify-between items-center">
          <form className="w-full h-full" onSubmit={onSubmit}>
            <div className="relative w-full h-full rounded-full">
              <input
                className="absolute top-[50%] left-0 -translate-y-[50%] px-[20px] py-[5px] w-[90%] h-[70%] rounded-full border border-color-2 outline-gray-300 placeholder:text-color-2 placeholder:text-[14px] lg:placeholder:text-[16px] text-color-1"
                type="text"
                value={value}
                name="search"
                placeholder="Search by product name"
                onChange={onChange}
              />
              <div
                onClick={onClick}
                className="cursor-pointer absolute top-[50%] -translate-y-[50%] right-[10%] rounded-full h-[71%] w-[40px] bg-color-1 flex justify-center items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                >
                  <path
                    d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"
                    className="fill-color-3"
                  ></path>
                </svg>
              </div>
            </div>
          </form>
          <div className="py-[5px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              onClick={() => setSearchSlider(false)}
            >
              <g clipPath="url(#clip0_28_60)">
                <path
                  d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                  className="fill-color-1"
                />
              </g>
              <defs>
                <clipPath id="clip0_28_60">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNavbar;
