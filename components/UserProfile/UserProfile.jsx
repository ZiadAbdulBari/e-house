import React from "react";

const UserProfile = ({fieldName,fieldData}) => {
  return (
    <div className="flex w-full">
      <p className="text-[18px] font-medium w-[20%] text-gray-800">{fieldName}</p>
      <p className="text-[18px] font-medium text-gray-800">
        {fieldData}
      </p>
    </div>
  );
};

export default UserProfile;
