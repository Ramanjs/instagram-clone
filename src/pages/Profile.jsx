import React from 'react';
import { useSelector } from 'react-redux';
import { Link, redirect } from 'react-router-dom';
import baseUrl from '../baseUrl';

const Profile = () => {
  const user = useSelector(state => state.user);

  return (
    <div className="w-full flex flex-col py-2">
      <h1 className="text-2xl font-semibold px-4">{user.handle}</h1>
      <div className="w-full flex justify-between items-center mt-8 px-4">
        <img className="w-16 h-16 border-none rounded-full bg-gray-100" alt="pfp" src={`${baseUrl}/users/images/${user.pfp}`}/>
        <div className="flex flex-col justify-between items-center">
          <span>{user.posts.length}</span>
          <span>Posts</span>
        </div>
        <div className="flex flex-col justify-between items-center">
          <span>{user.followers.length}</span>
          <span>Followers</span>
        </div>
        <div className="flex flex-col justify-between items-center">
          <span>{user.following.length}</span>
          <span>Following</span>
        </div>
      </div>
      <div className="flex flex-col my-4 px-4">
        <span className="font-semibold">{user.name}</span>
        <span>{user.bio}</span>
      </div>
      <button className="border-none bg-gray-200 rounded-lg p-2 font-medium mx-4"><Link to="/profile/edit">Edit profile</Link></button>
      <div className="w-full flex flex-wrap justify-between mt-8 border-t-2 border-t-gray-300">
        {user.posts.length > 0 ? (
          <div className="w-full flex flex-wrap justify-start">
            {user.posts.map(post => (
              <div className="w-1/3 overflow-hidden">
                <img src={`${baseUrl}/users/images/${post.image}`} alt="post"/>
              </div>
            ))}
          </div>
        ) : (
        <span>When you share posts, they'll appear on your profile.</span>
        )}
      </div>
    </div>
  )
}

export default Profile
