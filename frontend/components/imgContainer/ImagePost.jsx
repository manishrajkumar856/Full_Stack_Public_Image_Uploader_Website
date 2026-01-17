import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import HoverImage from './hoverImage';
import axios from 'axios';

const ImagePost = ({data, fetchPost}) => {
    const navigate = useNavigate();
    const [getPorfileUserData, setProfileUserData] = useState("");

    useEffect(()=>{
      handleGetUserInfo(data.userId);
    },[])

    const handleImagePostClick = (event)=>{
        navigate(`/post/singlepost/${data._id}`);
    }

    const [getHover, setHover] = useState(false);

    const handleMouseEnter = ()=>{
      setHover(true);
    }

    const handleMouseLeave = ()=>{
      setHover(false);
    }

    // Get Profile Info
    const handleGetUserInfo = async (userId)=>{
      console.log("User", userId);
        try {
            const response = await axios.get(`http://localhost:8000/api/profile/user_profile/${userId}`);
            console.log(response);
            setProfileUserData(response.data.userData);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div onClick={handleImagePostClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className='max-w-[25em] break-inside-avoid mb-4 rounded-2xl overflow-hidden relative'> 
            <img className='w-full h-full' src={`http://localhost:8000${data.imgFilePath}`} />

            {
              getHover && <HoverImage fetchPost={fetchPost} imgData={data} getPorfileUserData={getPorfileUserData}  />
            }
          </div>
  )
}

export default ImagePost