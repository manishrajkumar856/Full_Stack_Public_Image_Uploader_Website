import React, { useContext } from 'react'
import { DataContaxtProvider } from '../contaxtApi/DataContaxt';
import PicProImg from './forms/PicProImg';
import { useNavigate } from 'react-router-dom';

const ProfileContainer = ({ profileInfo}) => {
    const { logoutUser, proInfo } = useContext(DataContaxtProvider);
    const navigate = useNavigate();

  return (
    <div
        style={{
          boxShadow: "0 6px 12px rgba(0,0,0,0.25)",
        }}
        className="w-90 h-full rounded-2xl px-5 py-8 bg-[#e3dede57] flex flex-col items-center justify-start"
      >
        <div className="w-30  relative h-30 text-6xl flex items-center justify-center border border-[#ccc8c8c5] rounded-full bg-red-300 cursor-pointer ">
          {!proInfo.profilePicUrl && <h3>{proInfo.firstName.charAt(0)}</h3>}
          {proInfo.profilePicUrl && <img className="w-full h-full object-cover rounded-full" src={proInfo.profilePicUrl} /> }


          <div>
                <PicProImg />
          </div>
        </div>

        <div className="w-full mt-3">
          <div className="text-2xl font-semibold text-[#454444]">
            <span className="text-2xl font-semibold text-black">Name : </span>{" "}
            {profileInfo.firstName + profileInfo.lastName}
          </div>
          <div className="text-1xl font-semibold text-[#454444]">
            <span className="text-2xl font-semibold text-black whitespace-nowrap">Email : </span>{" "}
                {profileInfo.email}
          </div>
        </div>

        <button
          onClick={()=>{
            logoutUser()
            navigate('/');
          }}
          className="active:scale-95 bg-[#68b4ee] px-20 py-3 mt-5 uppercase rounded-2xl text-1xl font-semibold text-[#ffff]"
        >
          Logout
        </button>
      </div>
  )
}

export default ProfileContainer