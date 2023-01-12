import { useRef, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {setPfp} from '../redux/user';
import baseUrl from '../baseUrl';

const EditProfile = () => {
  const token = useSelector(state => state.user.token)
  const handle = useSelector(state => state.user.handle)
  const dispatch = useDispatch()
  const [file, setFile] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('image', file)
    console.log(file)
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
        console.log(res)
        setFile(null)
        dispatch(setPfp(res.message))
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleFile = (e) => {
    setFile(e.target.files[0])
  }

  return (
    <div className="w-full flex flex-col p-4">
      <h1 className="text-2xl font-semibold my-2">Edit Profile</h1>
      <form onSubmit={handleSubmit} className="w-full flex flex-col items-start space-y-4 my-2" encType="multipart/form-data">
        <input type="file" name="file" id="file" onChange={handleFile} required/>
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default EditProfile;
