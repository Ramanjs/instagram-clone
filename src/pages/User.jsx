import React from 'react';

const User = () => {
  return (
    <div className="w-full flex flex-col py-2">
      <h1 className="text-2xl font-semibold px-4">Username</h1>
      <div className="w-full flex justify-between items-center mt-8 px-4">
        <img className="w-16 h-16 border-none rounded-full bg-gray-100"/>
        <div className="flex flex-col justify-between items-center">
          <span>0</span>
          <span>Posts</span>
        </div>
        <div className="flex flex-col justify-between items-center">
          <span>0</span>
          <span>Followers</span>
        </div>
        <div className="flex flex-col justify-between items-center">
          <span>0</span>
          <span>Following</span>
        </div>
      </div>
      <div className="flex flex-col my-4 px-4">
        <span className="font-semibold">Name</span>
        <span>Bio lorem ipsum doler si amet</span>
      </div>
      <button className="border-none bg-gray-200 rounded-lg p-2 font-medium mx-4">Edit profile</button>
      <div className="w-full flex flex-wrap justify-between mt-8 border-t-2 border-t-gray-300">
        <span>When you share posts, they'll appear on your profile.</span>
      </div>
    </div>
  )
}

export default User
