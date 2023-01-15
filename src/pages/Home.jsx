import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../redux/user';
import baseUrl from '../baseUrl';
import Post from '../components/Post';

const Home = () => {
  const [posts, setPosts] = useState([])
  const handle = useSelector(state => state.user.handle)
  const token = useSelector(state => state.user.token)
  const dispatch = useDispatch()

  useEffect(() => {
    fetch(baseUrl + '/users/' + handle + '/feed', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(async res=> {
        if (!res.ok) {
          res = await res.json()
          throw new Error(res.message);
        }
        return res.json();
      })
      .then(res=> {
        setPosts(res.data);
      })
      .catch(err=> {
        if (err.message === 'jwt expired') {
          dispatch(logout())
        } 
      })
  }, [])

  return (
    <div className="w-full flex flex-col py-2">
      <h1 className="text-2xl font-semibold py-2 px-4 border-b-2">Feed</h1>
      {posts.map(post => (
        <Post post={post}/>
      ))}
      {posts.length === 0 && <p className="text-center">Follow people to see their posts</p> }
      {/* marging to accomodate navbar */}
      <div className="mb-8"></div>
    </div>
  )
}

export default Home
