import React, { useContext } from "react";
import { GrFavorite } from "react-icons/gr";
import { FaRegBookmark } from "react-icons/fa";
import axios from "axios";
import { DataContaxtProvider } from "../../contaxtApi/DataContaxt";
import { useNavigate } from "react-router-dom";
import ProfileBox from "../ProfileBox";
import { FaHeart } from "react-icons/fa";

const HoverImage = ({ imgData, getPorfileUserData, fetchPost }) => {
  console.log("Datas", getPorfileUserData);

  const token = localStorage.getItem("accessToken");
  const { proInfo, fetchProfile } = useContext(DataContaxtProvider);

  const navigate = useNavigate();

  const handleAddFevourite = async (event) => {
    event.stopPropagation();
    const imgID = imgData._id;

    if(!proInfo){
      navigate('/login');
    }

    try {
      const response = axios.post(
        "http://localhost:8000/api/favourites/fav",
        {
          imgId: imgID,
          userId: proInfo._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/favourites");
    } catch (error) {}
  };

  const handleLikeBtn = async (event) => {
    event.stopPropagation();

    if(!proInfo){
      navigate('/login');
    }

    try {
      const response = await axios.post(
        `http://localhost:8000/api/likes/likepost/${imgData._id}`,
        { userId: proInfo._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      fetchPost();
      fetchProfile();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full bg-[#151515c5] absolute top-0 left-0 z-10 flex flex-col justify-between px-5 py-5">
      <div className="text-2xl text-white">
        <div className="w-full flex  justify-between">
          <div className="flex flex-col items-center justify-center">
            {imgData && proInfo && imgData.likes.includes(proInfo._id) ? (
              <FaHeart onClick={handleLikeBtn} className="text-red-500" />
            ) : (
              <GrFavorite
                onClick={handleLikeBtn}
                className="text-[#efb8b8f2]"
              />
            )}
            <div className="text-[#e3d8d8a9] text-xl font-semibold">
              {imgData.likeCount}
            </div>
          </div>
          <FaRegBookmark onClick={handleAddFevourite} />
        </div>
      </div>
      <div className="text-white flex gap-3 items-center justify-start">
        <div>
          <ProfileBox proInfo={getPorfileUserData} />
        </div>
        {getPorfileUserData && (
          <h3>
            {getPorfileUserData.firstName + " " + getPorfileUserData.lastName}
          </h3>
        )}
      </div>
    </div>
  );
};

export default HoverImage;
