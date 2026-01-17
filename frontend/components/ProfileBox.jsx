import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import LogoutContainer from "./LogoutContainer";
import { useNavigate } from "react-router-dom";

const ProfileBox = ({ proInfo }) => {
  // console.log(proInfo.firstName.charAt(0));
  // console.log(proInfo);

  const navigate = useNavigate();
  const handleProfileClick = ()=>{
    navigate('/profile');
  }
  return (
    <div className="flex items-center gap-2 text-3xl relative">
      <div onClick={handleProfileClick} className="w-10 h-10 text-2xl overflow-hidden flex items-center justify-center border border-[#ccc8c8c5] rounded-full bg-red-300 cursor-pointer ">
      {!proInfo.profilePicUrl && proInfo.firstName && <h3>{proInfo.firstName.charAt(0)}</h3>}
        {proInfo.profilePicUrl && <img className="w-full h-full object-cover" src={proInfo.profilePicUrl} /> }
      </div>
    </div>
  );
};

export default ProfileBox;
