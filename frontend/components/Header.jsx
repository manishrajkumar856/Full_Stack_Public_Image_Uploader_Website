import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import DataContaxt, { DataContaxtProvider } from "../contaxtApi/DataContaxt";
import ProfileBox from "./ProfileBox";

const Header = () => {
  
   const {proInfo, fetchProfile} = useContext(DataContaxtProvider);
   useEffect(() => {
    fetchProfile();  
  }, []);

  return (
    <div className="w-full px-10 py-3 bg-red-200 flex justify-between items-center fixed z-100" style={{
            boxShadow: "0 6px 12px rgba(0,0,0,0.25)"
          }}>
      <div className="text-3xl font-semibold"><span className="text-[#f41515]">pic</span>Flesh</div>

      <nav className="flex gap-5 items-center">
        <ul className="flex gap-5 text-[1.1em] font-semibold">
          <li className="">
            <NavLink className={({isActive})=>( isActive ? "bg-[#cb6565d1] text-[#ffff] px-5 py-2 rounded-2xl border-2 border-[#cb4c4c99]" : "")} to="/">Home</NavLink>
          </li>
          {
            proInfo && 
            <>
            
              <li className="">
            <NavLink className={({isActive})=>( isActive ? "bg-[#cb6565d1] text-[#ffff] px-5 py-2 rounded-2xl border-2 border-[#cb4c4c99]" : "")} to="/favourites">Favourites</NavLink>
          </li>
          <li className="">
            <NavLink className={({isActive})=>( isActive ? "bg-[#cb6565d1] text-[#ffff] px-5 py-2 rounded-2xl border-2 border-[#cb4c4c99]" : "")} to="/upload">Upload</NavLink>
          </li>
          
            </>
          }
        </ul>
        
        {!proInfo && <div className="px-10 py-2 font-semibold text-[#ffff] text-[1.3em] bg-[#f46464] rounded-2xl">
          <Link to="/login">Login</Link>
        </div>  }

        {proInfo && <ProfileBox proInfo = {proInfo} />}
        
      </nav>
    </div>
  );
};

export default Header;
