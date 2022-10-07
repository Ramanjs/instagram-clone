import React from 'react';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

const Post = () => {
  return (
    <div className="flex flex-col w-full border-b-2 border-b-gray-200 rounded-xl shadow-sm">
      {/* Author Header */}
      <div className="w-full flex justify-start items-center p-2">
        {/* Author pfp */}
        <span className="font-semibold cursor-pointer">Author</span>
      </div>

      {/* Post Image */}
      <img className="w-full h-96 object-cover" />

      {/* Post Meta*/}
      <div className="w-full flex flex-col p-2">
        <div className="w-full flex justify-between items-center">
          <FavoriteBorderOutlinedIcon />
          <span className="font-semibold">0 Likes</span>
        </div>
        <p className="my-2"><span className="font-semibold mr-2 cursor-pointer">Author</span>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
      </div>

      {/* Comments section */}
      <div className="w-full flex flex-col items-start pl-4">
        {/* Comments */}
        <div className="w-full flex flex-col items-start">
          <p><span className="font-semibold mr-2 cursor-pointer">Author</span>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
        </div>
        <span className="text-gray-500 cursor-pointer">view more comments</span>
      </div>

      {/* Add a comment */} 
      <form className="w-full flex justify-between p-2 my-2 border-t-2 border-gray-200">
        <input className="focus:outline-none" type="text" placeholder="Add a comment..." required/>
        <input className="text-blue-400 font-semibold cursor-pointer" type="submit" value="Post" />
      </form>
    </div>
  )
}

export default Post
