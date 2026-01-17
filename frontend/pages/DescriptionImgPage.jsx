import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const DescriptionImgPage = () => {

  const { id } = useParams(); // ✅ get :id from URL
  const [getPost, setPost] = useState("");

  useEffect(() => {
    postData();
  }, []);

  const postData = async ()=>{
    const response = await axios.get(`http://localhost:8000/api/post/singlepost/${id}`);
   
    setPost(response.data.findPost);
  }


  return (
    <div className='w-full min-h-screen bg-[#f9b3b3] flex flex-col items-center pt-25 px-10'>
        <div className='w-full flex items-center justify-center gap-5'>
          <div className='w-full flex items-center justify-center'>
             <img className='h-120 object-top rounded-2xl' src={`http://localhost:8000${getPost.imgFilePath}`} alt="" />
          </div>



          <div className='w-[30vw] flex flex-col items-start justify-start bg-[#e5dfdfc4] rounded-2xl px-5 py-5 '
          style={{
            boxShadow: "0 6px 12px rgba(0,0,0,0.25)"
          }}
          >
            <h3 className='text-2xl font-semibold'>{getPost.imgTitle}</h3>
            <h2>Category:- {getPost.imgCategory}</h2>
            <div>Upload Date:- {getPost.createdAt}</div>
            <div className='flex flex-wrap gap-2 mb-2'>

              {
              getPost && getPost.imgTags.map((data)=>{
                return <div className='px-5 whitespace-nowrap py-1 mt-2 rounded-2xl bg-[#b9b9b9de] text-[0.8em] font-semibold'>{data}</div>
              })
            }

            </div>
            <div className='text-[1.2em] font-semibold'>Description</div>
            
            <div className='text-[0.9em] text-[#525050]'>{getPost.imgDesc}</div>
            <div className='flex gap-5'>
              <div>like</div>
              <div>share</div>
              <div>suscribe</div>
            </div>
            
            <div className='w-full'>
              <button className='w-full mt-3 py-2 rounded-2xl bg-[#f35c5c] text-[#ffff] mb-3'>Download</button>
            </div>
            
          </div>
        </div>
    </div>
  )
}

export default DescriptionImgPage