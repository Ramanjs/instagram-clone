import React from 'react';
import Post from '../components/Post';
import { useSelector } from 'react-redux';
import { redirect } from 'react-router-dom';

const Home = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  console.log(isLoggedIn);

  if (!isLoggedIn) {
    redirect('/login');
  }

  return (
    <div className="flex flex-col w-full bg-white space-y-2">
      <Post />
    </div>
  )
}

export default Home

