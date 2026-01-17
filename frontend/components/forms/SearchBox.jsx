import React from 'react'
import { IoMdSearch } from "react-icons/io";
const SearchBox = () => {
  return (
    <div className='w-full'>
        <form className="w-full relative bg-red-3 items-center justify-center">
            <IoMdSearch className='absolute right-10 text-[#535252] top-1/2 text-2xl transform -translate-y-1/2' />
            <input type="text" placeholder='Search here...' className='w-full py-4 px-10 outline-none rounded-full bg-[#c283836d] border-2 border-[#dd8b8b96]' />
        </form>
    </div>
  )
}

export default SearchBox