import React, { useContext } from "react";
import { GrFavorite } from "react-icons/gr";
import { FaRegBookmark } from "react-icons/fa";
import axios from "axios";
import { DataContaxtProvider } from "../../contaxtApi/DataContaxt";
import { useNavigate } from "react-router-dom";
import ProfileBox from "../ProfileBox";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaHeart } from "react-icons/fa";

const HoverImage2 = ({
  imgData,
  getPorfileUserData,
  handleDeleteFav,
  handlePostData,
}) => {
  console.log("Datas", getPorfileUserData);

  const token = localStorage.getItem("accessToken");
  const { proInfo, fetchProfile } = useContext(DataContaxtProvider);

  const navigate = useNavigate();

  const handleAddFevourite = async (event) => {
    event.stopPropagation();
    const imgID = imgData._id;

    try {
      const response = await axios.post(
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
    } catch (error) {
      console.error("Error adding favourite:", error);
    }
  };

  const handleLikeBtn = async (event) => {
    event.stopPropagation();

    try {
      fetchProfile();
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
      fetchProfile();
      handlePostData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full bg-[#151515c5] absolute top-0 left-0 z-10 flex flex-col justify-between px-5 py-5">
      <div className="text-2xl text-white">
        <div className="w-full flex  justify-between">
          {imgData && proInfo && imgData.likes.includes(proInfo._id) ? (
            <FaHeart onClick={handleLikeBtn} className="text-red-500" />
          ) : (
            <GrFavorite onClick={handleLikeBtn} className="text-[#efb8b8f2]" />
          )}

          <button
            onClick={handleDeleteFav}
            className="absolute top-2 right-3 px-3 py-3 text-3xl text-[#ffffff] hover:bg-[#eb4040a2] transition-all  ease rounded-full"
          >
            <RiDeleteBin6Line />
          </button>
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

export default HoverImage2;
