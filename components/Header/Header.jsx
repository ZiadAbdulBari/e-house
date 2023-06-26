import { AuthContext } from "@/contaxt/AuthContext";
import Link from "next/link";
import React, { useContext } from "react";

const Header = () => {
  const { setAuthData, isLoggedIn } = useContext(AuthContext);
  const logout = () => {
    setAuthData(false);
  };
  return (
    <div className="bg-gray-50">
      <div className="lg:container mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <p className=" text-[40px] font-semibold !font-['Expletus_Sans'] text-secondary">
              <Link href="/">E-House</Link>
            </p>
          </div>
          <div className="flex gap-12">
            <div className="header-category group">
              <p className="header-category-name transition-all duration-700 group-hover:font-semibold">
                Men{" "}
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
                    <li>Pant</li>
                    <li>Shirt</li>
                    <li>T-shirt</li>
                    <li>Shorts</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="header-category group">
              <p className="header-category-name transition-all duration-700 group-hover:font-semibold">
                Women{" "}
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path
                      d="M11.9997 13.1714L16.9495 8.22168L18.3637 9.63589L11.9997 15.9999L5.63574 9.63589L7.04996 8.22168L11.9997 13.1714Z"
                      className="fill-secondary"
                    ></path>
                  </svg>
                </span>
              </p>
              <div className="header-sub-category group-hover:block">
                <div className="header-sub-category-parent">
                  <ul>
                    <li>Pant</li>
                    <li>Shirt</li>
                    <li>T-shirt</li>
                    <li>Shorts</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="header-category group">
              <p className="header-category-name transition-all duration-700 group-hover:font-semibold">
                Accessorise{" "}
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path
                      d="M11.9997 13.1714L16.9495 8.22168L18.3637 9.63589L11.9997 15.9999L5.63574 9.63589L7.04996 8.22168L11.9997 13.1714Z"
                      className="fill-secondary"
                    ></path>
                  </svg>
                </span>
              </p>
              <div className="header-sub-category group-hover:block">
                <div className="header-sub-category-parent">
                  <ul>
                    <li>Sunglass</li>
                    <li>Wallet</li>
                    <li>Balt</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            {!isLoggedIn && (
              <button className="login">
                <Link href="/signup">Login</Link>
              </button>
            )}
            {!isLoggedIn && (
              <button className="reg">
                <Link href="/signin">Registration</Link>
              </button>
            )}
            {isLoggedIn && (
              <button className="reg" onClick={logout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
