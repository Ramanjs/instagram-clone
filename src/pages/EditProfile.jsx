import { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {setPfp, setBio as stateSetBio} from '../redux/user';
import {useNavigate} from 'react-router-dom';
import baseUrl from '../baseUrl';

const EditProfile = () => {
  const token = useSelector(state => state.user.token)
  const handle = useSelector(state => state.user.handle)
  const dispatch = useDispatch()
  const [file, setFile] = useState(null)
  const [bio, setBio] = useState(useSelector(state => state.user.bio))

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    if (file) fd.append('image', file)
    fd.append('bio', bio)
    fetch(baseUrl + `/users/${handle}/profile`,
      {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        body: fd
      })
      .then(res => res.json())
      .then(res => {
        dispatch(setPfp(res.data.pfp))
        dispatch(stateSetBio(res.data.bio))
        setFile(null)
        navigate('/profile')
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleFile = (e) => {
    setFile(e.target.files[0])
  }

  const handleBio = (e) => {
    setBio(e.target.value)
  }

  return (
    <div className="w-full flex flex-col">
      <h1 className="text-2xl font-semibold py-2 px-4 border-b-2">Edit Profile</h1>
      <form onSubmit={handleSubmit} className="w-full flex flex-col items-start my-2 px-4" encType="multipart/form-data">
        <label className="my-2" htmlFor="file">Select Profile Picture</label>
        <input type="file" name="file" id="file" onChange={handleFile}/>
        <input className="w-full mt-16 py-1 border-b-2 focus:outline-none" type="textarea" name="desc" onChange={handleBio} value={bio} placeholder="Enter your bio..."/>
        <input className="w-fit py-2 px-4 bg-blue-400 hover:bg-blue-500 text-white font-bold rounded cursor-pointer mt-8" type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default EditProfile;
