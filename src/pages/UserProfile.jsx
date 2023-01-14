import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import baseUrl from '../baseUrl'

const UserProfile = () => {
  const params = useParams()
  const handle = params.handle
  const myHandle = useSelector(state => state.user.handle)
  const navigate = useNavigate()
  const token = useSelector(state => state.user.token)

  const [name, setName] = useState('')
  const [pfp, setPfp] = useState('')
  const [bio, setBio] = useState('')
  const [posts, setPosts] = useState([])
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])
  const [isFollowing, setIsFollowing] = useState(false)

  useEffect(() => {
    followers.forEach(follower => {
      if (follower.handle === myHandle) {
        setIsFollowing(true)
      }
    })
  }, [followers])

  useEffect(() => {
    fetch(baseUrl + '/users/' + handle, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw Error('ofo');
        }
        return response;
      })
      .then(response => response.json())
      .then(response => {
        setName(response.data.name)
        setBio(response.data.bio)
        setPfp(response.data.pfp)
        setFollowers(response.data.followers)
        setFollowing(response.data.following)
      })
  }, [])

  useEffect(() => {
    fetch(baseUrl + '/users/' + handle + '/posts', {
      method: 'GET',
    })
      .then(response => {
        if (!response.ok) {
          throw Error('ofo');
        }
        return response;
      })
      .then(response => response.json())
      .then(response => {
        setPosts(response.message)
      })
  }, [])

  const handleClick = () => {
    navigate(`/${handle}/posts`, {state: {posts, handle, pfp}})
  }

  const addFollower = () => {
    fetch(baseUrl + '/users/' + handle + '/followers', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => res.json())
      .then(() => setIsFollowing(true))
      .catch((err) => {
        console.log(err)
      })
  }

  const handleFollow = () => {
    if (isFollowing) {
      //setIsFollowing(false)
    } else {
      addFollower()
    }
  }

  return (
    <div className="w-full flex flex-col py-2">
      <h1 className="text-2xl font-semibold px-4">{handle}</h1>
      <div className="w-full flex justify-between items-center mt-8 px-4">
        <div className="w-20 h-20 rounded-[50%] border-none bg-gray-100">
          <img className="h-full rounded-[50%] object-cover" alt="" src={pfp}/>
        </div>
        <div className="flex flex-col justify-between items-center">
          <span>{posts.length}</span>
          <span>Posts</span>
        </div>
        <div className="flex flex-col justify-between items-center">
          <span>{followers.length}</span>
          <span>Followers</span>
        </div>
        <div className="flex flex-col justify-between items-center">
          <span>{following.length}</span>
          <span>Following</span>
        </div>
      </div>
      <div className="flex flex-col my-4 px-4">
        <span className="font-semibold">{name}</span>
        <span>{bio}</span>
      </div>
      <div className={"mx-2 py-2 px-4 font-bold rounded cursor-pointer text-center" + (isFollowing ? " bg-gray-200" : " text-white bg-blue-400 hover:bg-blue-500")} onClick={handleFollow}>{isFollowing ? 'Unfollow' : 'Follow'}</div>
      <div className="w-full flex flex-wrap justify-between mt-8 border-t-2 border-t-gray-300">
        {posts.length > 0 ? (
          <div className="w-full flex flex-wrap justify-start">
            {posts.map(post => (
              <div className="w-1/3 h-24 overflow-hidden p-0.5" onClick={handleClick}>
                <img className="w-full h-full object-cover" src={post.image} alt="post"/>
              </div>
            ))}
          </div>
        ) : (
        <span className="w-full mx-2 my-auto text-center">No posts yet.</span>
        )}
      </div>
    </div>
  )
}

export default UserProfile
