import React from "react";

const UiInput = ({label,type,id,value,name,placeholder,onChange}) => {
  return (
    <div className={`w-full ${type=='checkbox' && 'flex gap-x-2'}`}>
      <label className={`text-[18px] font-medium text-gray-800 ${type=='checkbox' && 'order-last'}`} htmlFor={id}>{label}</label>
      <input className={`text-[16px] font-medium mt-1 ${type!='checkbox' && 'h-[40px] w-full'} px-[20px] rounded border border-gray-200 outline-gray-300 placeholder:text-gray-300 placeholder:text-[16px]`} type={type} id={id} value={value} name={name} placeholder={placeholder} onChange={onChange} />
    </div>
  );
};

export default UiInput;
