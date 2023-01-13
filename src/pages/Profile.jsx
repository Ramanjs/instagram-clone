import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import baseUrl from '../baseUrl'
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const user = useSelector(state => state.user);
  const navigate = useNavigate();

  const handleClick = (image) => {
    navigate("/posts", {state: {post: image}})
  }

  return (
    <div className="w-full flex flex-col py-2">
      <h1 className="text-2xl font-semibold px-4">{user.handle}</h1>
      <div className="w-full flex justify-between items-center mt-8 px-4">
        <div className="w-20 h-20 border-none rounded-[50%] bg-gray-100 overflow-hidden">
          <img className="h-full rounded-[50%] object-cover" alt="" src={`${baseUrl}/users/images/${user.pfp}`}/>
        </div>
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
      <Link to="/profile/edit" className="border-none bg-gray-200 rounded-lg p-2 font-medium mx-4 text-center">Edit profile</Link>
      <div className="w-full flex flex-wrap justify-between mt-8 border-t-2 border-t-gray-300">
        {user.posts.length > 0 ? (
          <div className="w-full flex flex-wrap justify-start">
            {user.posts.map(post => (
              <div className="w-1/3 h-24 overflow-hidden p-0.5" onClick={handleClick.bind(null, [post.image])}>
                <img className="h-full object-cover" src={`${baseUrl}/users/images/${post.image}`} alt="post"/>
              </div>
            ))}
          </div>
        ) : (
        <span className="px-2">When you share posts, they'll appear on your profile.</span>
        )}
      </div>
    </div>
  )
}
export default Profile
