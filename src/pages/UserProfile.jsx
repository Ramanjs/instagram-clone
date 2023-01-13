import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import baseUrl from '../baseUrl'

const UserProfile = () => {
  const params = useParams()
  const handle = params.handle
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

  const handleFollow = () => {
    fetch(baseUrl + '/users/' + handle + '/followers', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(response => {
        if (!response.ok) {
          throw Error('ofo');
        }
        return response;
      })
      .then(response => response.json())
      .then(response => {
        console.log(response.message)
        setFollowing(!isFollowing)
      })
  }

  return (
    <div className="w-full flex flex-col py-2">
      <h1 className="text-2xl font-semibold px-4">{handle}</h1>
      <div className="w-full flex justify-between items-center mt-8 px-4">
        <img className="w-16 h-16 border-none rounded-full bg-gray-100" alt="pfp" src={`${baseUrl}/users/images/${pfp}`}/>
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
      <div className={"mx-2 py-2 px-4 text-white font-bold rounded cursor-pointer text-center" + (isFollowing ? " bg-slate-100" : " bg-blue-400 hover:bg-blue-500")} onClick={handleFollow}>{isFollowing ? 'Unfollow' : 'Follow'}</div>
      <div className="w-full flex flex-wrap justify-between mt-8 border-t-2 border-t-gray-300">
        {posts.length > 0 ? (
          <div className="w-full flex flex-wrap justify-start">
            {posts.map(post => (
              <div className="w-1/3 overflow-hidden p-0.5" onClick={handleClick}>
                <img className="h-full" src={`${baseUrl}/users/images/${post.image}`} alt="post"/>
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
