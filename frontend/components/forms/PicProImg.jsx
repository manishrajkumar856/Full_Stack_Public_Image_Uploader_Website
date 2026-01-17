import axios from 'axios';
import React, { useContext, useRef } from 'react'
import { BsFillCameraFill } from "react-icons/bs";
import { DataContaxtProvider } from '../../contaxtApi/DataContaxt';

const PicProImg = () => {
    const fileInputRef = useRef(null);
    const {proInfo, fetchProfile} = useContext(DataContaxtProvider);
    const token = localStorage.getItem("accessToken");

    const handleClick = ()=>{
        fileInputRef.current.click();
    }

    const handleFileChange = async (event)=>{
        const file = event.target.files[0];
        

        try {
            const fd = new FormData();
            fd.append("profilePicUrl", event.target.files[0]);
            fd.append("userId", proInfo._id);

            const response = await axios.post("http://localhost:8000/api/profile/profileImage", 
                fd,
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            fetchProfile();



        } catch (error) {
            
        }
    }
  return (
    <div className='absolute bottom-0 right-0 text-2xl'>
        <input style={{display:"none"}} onChange={handleFileChange} type="file" ref={fileInputRef}  />
        <button onClick={handleClick} ><BsFillCameraFill className='text-[#301414]'/></button>
    </div>
  )
}

export default PicProImg