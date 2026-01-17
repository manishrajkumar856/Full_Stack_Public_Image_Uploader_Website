import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HoverImage from "./hoverImage";
import { DataContaxtProvider } from "../../contaxtApi/DataContaxt";
import HoverImage2 from "./HoverImage2";

const ImageItems = ({ postUrl }) => {
  const [postData, setPostData] = useState(null);
  const token = localStorage.getItem("accessToken");
  const { proInfo, fetchProfile } = useContext(DataContaxtProvider);

  const navigate = useNavigate();

  const handlePostData = async (userId) => {
    try {
      const response = await axios.get(postUrl);
      setPostData(response.data.findPost);

      console.log("DFJKSDKJFskdflsdjlkdjslfsjfj", response.data.findPost);
    } catch (error) {
      console.log("Error! ", error);
    }
  };

  useEffect(() => {
    handlePostData();
    console.log("Post Data :", postUrl);
  }, [postUrl]);

  const [getPorfileUserData, setProfileUserData] = useState("");

  useEffect(() => {
    if (postData?.userId) {
    handleGetUserInfo(postData.userId);
  }

  }, [postData]);

  // Get Profile Info
  const handleGetUserInfo = async (userId) => {
    console.log("User", userId);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/profile/user_profile/${userId}`
      );
      console.log("Datadsfkslk",response);
      setProfileUserData(response.data.userData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImagePostClick = (event) => {
    console.log(postData);
    navigate(`/post/singlepost/${postData._id}`);
  };

  const handleDeleteFav = async (event) => {
    event.stopPropagation();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/favourites/remove",
        {
          postImgUrl: postUrl,
          userId: proInfo._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      if (response.data.success) {
        fetchProfile();
      }
    } catch (error) {}
  };

  const [getHover, setHover] = useState(false);
  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  return (
    <div
      onClick={handleImagePostClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="max-w-[25em] break-inside-avoid mb-4 rounded-2xl overflow-hidden relative"
    >
      {
        postData && <img
        className="w-full h-full"
        src={`http://localhost:8000${postData.imgFilePath}`}
      />
      }

      
      {getHover && postData && (
        <HoverImage2
          imgData={postData}
          getPorfileUserData={getPorfileUserData}
          handleDeleteFav={handleDeleteFav}
          handlePostData = {handlePostData}
        />
      )}
    </div>
  );
};

export default ImageItems;
