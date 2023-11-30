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
    <div className="w-[20%] h-[75vh] bg-gray-700 rounded py-[20px]">
      <ul>
        <li>
          <Link className={`${pagename=='/profile' && 'block bg-gray-800'} px-[20px] text-white font-medium text-[18px]`} href="/profile">Profile</Link>
        </li>
        <li>
          <Link className={`${pagename=='/order' && 'block bg-gray-800'} px-[20px] text-white font-medium text-[18px]`} href="/order">Order</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
