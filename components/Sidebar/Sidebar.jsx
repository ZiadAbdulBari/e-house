import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Sidebar = () => {
  const router = useRouter();
  const [pagename, setPagename] = useState("");
  useEffect(() => {
    setPagename(router.pathname);
  }, [router]);
  return (
    <div className="w-[15%] h-[75vh] bg-color-1 rounded py-[20px]">
      <ul>
        <li className="py-[5px]">
          <Link
            className={`${
              pagename == "/profile" && "bg-color-3 !text-color-1"
            } px-[20px] text-color-3 font-medium text-[18px] py-[5px] block`}
            href="/profile"
          >
            Profile
          </Link>
        </li>
        <li className="py-[5px]">
          <Link
            className={`${
              pagename == "/order" && "bg-color-3 !text-color-1"
            } px-[20px] text-color-3 font-medium text-[18px] py-[5px] block`}
            href="/order"
          >
            Order
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
