import React, { useEffect, useState } from "react";

const Footer = () => {
    const [year,setYear] = useState('');
  useEffect(() => {
    const d = new Date();
    let year = d.getFullYear();
    setYear(year);
  }, [year]);
  return (
    <div className="bg-gray-800 w-full py-[10px] mt-12">
      <p className="text-white text-center text-[18px]">
        Made by Essential © {year}
      </p>
    </div>
  );
};

export default Footer;
