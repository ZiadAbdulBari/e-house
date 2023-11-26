import React from "react";

const UiInput = ({label,type,value,name,placeholder,onChange}) => {
  return (
    <div className="w-full">
      <label className="text-[20px] font-medium">{label}</label>
      <input className="text-[20px] font-medium w-full mt-1 h-[50px] px-[20px] rounded" type={type} value={value} name={name} placeholder={placeholder} onChange={onChange} />
    </div>
  );
};

export default UiInput;
