import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout';
import { logout as logoutAction } from '../redux/user';
import baseUrl from '../baseUrl'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const user = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (image) => {
    navigate("/posts", {state: {post: image}})
  }
  
  const logout = () => {
    Cookies.remove('instagram_handle')
    Cookies.remove('instagram_token')
    dispatch(logoutAction())
    navigate("/login")
  }

  return (
    <div className="w-full flex flex-col py-2">
      <div className="flex justify-between items-center px-4 text-2xl">
        <h1 className="font-semibold">{user.handle}</h1>
        <LogoutIcon className="cursor-pointer" onClick={logout} fontSize="inherit"/>
      </div>
      <div className="w-full flex justify-between items-center mt-8 px-4">
        <div className="w-20 h-20 border-none rounded-[50%] bg-gray-100 overflow-hidden">
          <img className="h-full rounded-[50%] object-cover" alt="" src={user.pfp}/>
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
                <img className="w-full h-full object-cover" src={post.image} alt="post"/>
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
