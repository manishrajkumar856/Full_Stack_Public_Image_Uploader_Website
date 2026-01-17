import React, { useContext, useEffect, useState } from "react";
import { DataContaxtProvider } from "../contaxtApi/DataContaxt";
import ImageItems from "../components/imgContainer/ImageItems";
import SearchBox from "../components/forms/SearchBox";

const Favourite = () => {
  const { proInfo, fetchProfile } = useContext(DataContaxtProvider);
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#f9b3b3] flex flex-col items-center pt-25 px-10">
      <div className="w-full  px-30 mb-10">
        <SearchBox />
      </div>
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
        {proInfo &&
          proInfo.favouriteList.map((data, idx) => {
            return <ImageItems key={idx} postUrl={data} />;
          })}
      </div>
    </div>
  );
};

export default Favourite;
