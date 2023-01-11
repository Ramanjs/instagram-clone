import { useRef, useState } from "react";
import {useSelector} from "react-redux";
import baseUrl from '../baseUrl';

const EditProfile = () => {
  const ref = useRef(null);
  const token = useSelector(state => state.user.token)

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(ref.current.files[0])
    await fetch(baseUrl + '/profile/edit',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: {
          img: ref.current.files[0]
        }
      })
  }

  return (
    <div className="w-full flex flex-col p-4">
      <h1 className="text-2xl font-semibold my-2">Edit Profile</h1>
      <form onSubmit={handleSubmit} className="w-full flex flex-col items-start space-y-4 my-2">
        <input type="file" name="pfp" required ref={ref} />
        <input type="submit" value="Submit" className="" />
      </form>
    </div>
  )
}

export default EditProfile;
