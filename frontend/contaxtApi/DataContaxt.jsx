import axios from "axios";
import React, { createContext, useState } from "react";

export const DataContaxtProvider = createContext();

const DataContaxt = ({ children }) => {

  const token = localStorage.getItem("accessToken");
  const [proInfo, setProInfo] = useState(null);


//   Handle Fetch Profile
  const fetchProfile = async () => {
    if (!token) return;
    console.log("hellosX")
    try {
      const res = await axios.get(
        "http://localhost:8000/api/profile/profileInfo",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Axios automatically parses JSON responses
      const data = res.data;
      setProInfo(res.data.userData);
      localStorage.setItem("User",JSON.stringify(res.data.userData))
      
    } catch (error) {
      console.error(error);
      setProInfo(null);
    }
  };

//  Handle Logout Form
  const logoutUser = async ()=>{
    console.log("Hello")
    if(!token) return



    try {
        const response = await axios.post('http://localhost:8000/api/v1/user/logout',
            {},
            {
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            }
        )
        const data = response.data;
       
        // Deletion all data 
        setProInfo(null);
        localStorage.removeItem("accessToken");
        console("Hellos")

    } catch (error) {
        console.log(error);
    }

  }
  return (
    <DataContaxtProvider value={{ proInfo: proInfo, fetchProfile:fetchProfile, logoutUser, setProInfo}}>
      {children}
    </DataContaxtProvider>
  );
};

export default DataContaxt;
