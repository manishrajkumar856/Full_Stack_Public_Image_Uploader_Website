import React, { useContext } from "react";
import { DataContaxtProvider } from "../contaxtApi/DataContaxt";
import ProfileForm from "../components/forms/ProfileForm";
import ProfileContainer from "../components/ProfileContainer";

const ProfilePage = () => {

  const { logoutUser, proInfo } = useContext(DataContaxtProvider);
  console.log(proInfo);

  return (
    <div className="w-full h-screen bg-[#f9b3b3] gap-5 flex items-start px-10  pt-20 pb-10">
      <ProfileContainer logoutUser profileInfo={proInfo}/>

      <div className="w-full h-full px-10 py-10  items-start justify-start  scroll_hiding">
        <ProfileForm profileInfo={proInfo} />
      </div>
    </div>
  );
};

export default ProfilePage;
