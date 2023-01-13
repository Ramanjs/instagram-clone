import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import baseUrl from '../baseUrl';
import Post from '../components/Post';

const Home = () => {
  const [posts, setPosts] = useState([])
  const handle = useSelector(state => state.user.handle)
  const token = useSelector(state => state.user.token)

  useEffect(() => {
    fetch(baseUrl + '/users/' + handle + '/feed', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.message);
        }
        return response;
      })
      .then(response => response.json())
      .then(response => {
        setPosts(response.data);
      })
      .catch(response => {
        console.log(response.message)
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
