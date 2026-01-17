import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ImagePost from '../components/imgContainer/ImagePost';
import SearchBox from '../components/forms/SearchBox';

const HomePage = () => {

  const [getPost, setPost] = useState(null);
  useEffect(()=>{
    fetchPost();
  }, []);

  const fetchPost = async ()=>{
    const post = await axios.get('http://localhost:8000/api/post/allpost/');
    setPost(post.data.allPost);
  }
  return (
    <div className='w-full min-h-screen bg-[#f9b3b3] flex flex-col items-center pt-25 px-10'>

      <div className='w-full  px-30 mb-10'>
        <SearchBox />
      </div>

      <div className='columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4'>
        {getPost && getPost.map((data, idx)=>{
          return  <div key={idx}> 
                <ImagePost data={data} fetchPost={fetchPost} />
          </div>
        })}
      </div>
    </div>
  )
}

export default HomePage