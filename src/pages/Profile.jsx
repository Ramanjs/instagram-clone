import React from 'react';
import { useSelector } from 'react-redux';
import User from '../components/User';

const Profile = () => {
  const user = useSelector(state => state.user);
  return <User user={user} />
}

export default Profile
