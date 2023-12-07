import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Sidebar = () => {
  const router = useRouter();
  const [pagename, setPagename] = useState("");
  useEffect(()=>{
    setPagename(router.pathname);
  },[router])
  return (
    <div className="w-[15%] h-[75vh] bg-gray-800 rounded py-[20px]">
      <ul>
        <li className="py-[5px]">
          <Link className={`${pagename=='/profile' && 'block bg-orange-500'} px-[20px] text-white font-medium text-[18px] py-[5px]`} href="/profile">Profile</Link>
        </li>
        <li className="py-[5px]">
          <Link className={`${pagename=='/order' && 'block bg-orange-500'} px-[20px] text-white font-medium text-[18px] py-[5px]`} href="/order">Order</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
