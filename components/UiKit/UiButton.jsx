import React, { useEffect, useState } from "react";

const UiButton = ({buttonName,type,onClick}) => {
    const [bgColor,setBgColor] = useState('');
    useEffect(()=>{
        if(type=='success'){
            setBgColor('bg-green-300');
        }
        if(type=='denger'){
            setBgColor('bg-red-300');
        }
    },[])
  return (
    <>
      <button className={`${bgColor} py-[10px] px-[20px] rounded font-semibold text-black`} onClick={onClick}>
        {buttonName}
      </button>
    </>
  );
};

export default UiButton;
