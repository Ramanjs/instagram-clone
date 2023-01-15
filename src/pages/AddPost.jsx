import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {fetchUserPosts} from '../redux/user'
import baseUrl from '../baseUrl'

const AddPost = () => {
  const token = useSelector(state => state.user.token)
  const handle = useSelector(state => state.user.handle)
  const dispatch = useDispatch()
  const [file, setFile] = useState(null)
  const [caption, setCaption] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('image', file)
    fd.append('caption', caption)
    fetch(baseUrl + `/users/${handle}/posts`,
      {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        body: fd
      })
      .then(() => {
        dispatch(fetchUserPosts({handle, token}))
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

  const handleCaption = (e) => {
    setCaption(e.target.value)
  }

  return (
    <div className="w-full flex flex-col p-4">
      <h1 className="text-2xl font-semibold my-2">Add Post</h1>
      <form onSubmit={handleSubmit} className="w-full flex flex-col items-start my-2" encType="multipart/form-data">
        <label htmlFor="file">Select Photo</label>
        <input type="file" name="file" id="file" onChange={handleFile} required/>
        <input className="w-full mt-8 py-1 border-b-2 focus:outline-none" type="textarea" name="desc" onChange={handleCaption} value={caption} placeholder="Enter a caption for your post..."/>
        <input className="w-fit py-2 px-4 bg-blue-400 hover:bg-blue-500 text-white font-bold rounded cursor-pointer mt-8" type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default AddPost;
