import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { DataContaxtProvider } from '../../contaxtApi/DataContaxt';

const ProfileForm = ({profileInfo}) => {

    const token = localStorage.getItem("accessToken");
    const {fetchProfile} = useContext(DataContaxtProvider);

    const [getUserDetails, setUserDetails] = useState({
        firstName: "",
        lastName: "",
        phoneNo: "",
        email: profileInfo.email,
        Dob: "",
        address: "",
        country: "",
        city: "",
        state: "",
        pincode: "",
        occupation: "",
        currentQualification: "",
        skills: "",
    })

    useEffect(()=>{
        setUserDetails(profileInfo);
    },[])

    const handleChange = (event)=>{
        setUserDetails((prevDetails)=>({...prevDetails, [event.target.name] : event.target.value}));
    }

    const handleProfileSubmitForm = async (event)=>{
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/profile/update_profile",
                {
                    getUserDetails,
                userId: profileInfo._id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            fetchProfile();
        } catch (error) {
            
        }
        
    }

  return (
    <form onSubmit={handleProfileSubmitForm} >

            {/*  Basic Details */}
          <div>
            <div className="text-2xl font-semibold mb-3">Basic Identity</div>
            <div className="flex gap-3 flex-wrap">
              <div className="flex flex-col">
                <input 
                  onChange={handleChange}
                  value={getUserDetails.firstName }
                  name='firstName'
                  type="text"
                  placeholder="First Name"
                  className="px-3 w-[20em] py-3  bg-[#f04b4b74] rounded-2xl outline-none border border-[#a32a2ab3]"
               
                />
                First Name
              </div>
              <div className="flex flex-col">
                <input 
                  onChange={handleChange}
                  value={getUserDetails.lastName }
                  name='lastName'
                  type="text"
                  placeholder="Last Name"
                  className="px-3 w-[20em] py-3  bg-[#f04b4b74] rounded-2xl outline-none border border-[#a32a2ab3]"
                />
                Last Name
              </div>

              <div className="flex flex-col">
                <input 
                  value={getUserDetails.email }
                  type="email"
                  placeholder="email"
                  className="px-3 w-[20em] py-3  bg-[#f04b4b74] rounded-2xl outline-none border border-[#a32a2ab3]"
                  disabled
                />
                Email
              </div>

              <div className="flex flex-col">
                <input 
                  onChange={handleChange}
                  value={getUserDetails.phoneNo }
                  name='phoneNo'
                  type="number"
                  placeholder="Phone Number"
                  className="px-3 w-[20em] py-3  bg-[#f04b4b74] rounded-2xl outline-none border border-[#a32a2ab3]"
                />
                Phone No.
              </div>

              <div className="flex flex-col">
                <input 
                  onChange={handleChange}
                  name="Dob"
                  value={getUserDetails.Dob }
                    className="px-3 w-[20em] py-3  bg-[#f04b4b74] rounded-2xl outline-none border border-[#a32a2ab3]"
                  type="date"
                  min="1900-01-01"
                  required
                  aria-describedby="dob-help"
                />
                Date of Birth
              </div>
            </div>
          </div>

            {/* Location */}

            <div>
            <div className="text-2xl font-semibold mb-3 mt-10">Location</div>
            <div className="flex gap-3 flex-wrap">
              <div className="flex flex-col">
                <input 
                  onChange={handleChange}
                  value={getUserDetails.address }
                  name='address'
                  type="text"
                  placeholder="Address"
                  className="px-3 w-[20em] py-3  bg-[#f04b4b74] rounded-2xl outline-none border border-[#a32a2ab3]"
                />
                Address
              </div>
              <div className="flex flex-col">
                <input 
                  onChange={handleChange}
                  value={getUserDetails.country }
                  name='country'
                  type="text"
                  placeholder="Country"
                  className="px-3 w-[20em] py-3  bg-[#f04b4b74] rounded-2xl outline-none border border-[#a32a2ab3]"
                />
                Country
              </div>

              <div className="flex flex-col">
                <input 
                  onChange={handleChange}
                  value={getUserDetails.city}
                  name='city'
                  type="text"
                  placeholder="City"
                  className="px-3 w-[20em] py-3  bg-[#f04b4b74] rounded-2xl outline-none border border-[#a32a2ab3]"
                />
                City
              </div>

              <div className="flex flex-col">
                <input 
                  onChange={handleChange}
                  value={getUserDetails.state }
                  name='state'
                  type="text"
                  placeholder="State"
                  className="px-3 w-[20em] py-3  bg-[#f04b4b74] rounded-2xl outline-none border border-[#a32a2ab3]"
                />
                State
              </div>

              <div className="flex flex-col">
                <input 
                  onChange={handleChange}
                  value={getUserDetails.pincode }
                  name='pincode'
                  type="number"
                  placeholder="Pincode"
                  className="px-3 w-[20em] py-3  bg-[#f04b4b74] rounded-2xl outline-none border border-[#a32a2ab3]"
                />
                Pincode
              </div>
              
            </div>
          </div>

          {/* Professional Details */}

          <div>
            <div className="text-2xl font-semibold mb-3 mt-10">Professional Info</div>
            <div className="flex gap-3 flex-wrap">
              <div className="flex flex-col">
                <input 
                  onChange={handleChange}
                  value={getUserDetails.occupation }
                  name='occupation'
                  type="text"
                  placeholder="Occupation"
                  className="px-3 w-[20em] py-3  bg-[#f04b4b74] rounded-2xl outline-none border border-[#a32a2ab3]"
                />
                Occupation
              </div>
              <div className="flex flex-col">
                <input 
                  onChange={handleChange}
                  value={getUserDetails.currentQualification }
                  name='currentQualification'
                  type="text"
                  placeholder="Current Qualification"
                  className="px-3 w-[20em] py-3  bg-[#f04b4b74] rounded-2xl outline-none border border-[#a32a2ab3]"
                />
                Current Qulification
              </div>

              <div className="flex flex-col">
                <input 
                  onChange={handleChange}
                  value={getUserDetails.skills }
                  type="text"
                  placeholder="Skills seperated with ,"
                  name='skills'
                  className="px-3 w-[20em] py-3  bg-[#f04b4b74] rounded-2xl outline-none border border-[#a32a2ab3]"
                />
                Skills
              </div>

              
              
            </div>

          </div>

          <div className="w-full flex justify-center items-center mt-10 font-bold">
            <button className="px-15 py-3 text-[1.3em] rounded-2xl bg-[#47a2ed] text-white">Apply Changes</button>
          </div>

        </form>
  )
}

export default ProfileForm