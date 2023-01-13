import {useEffect} from 'react'
import {useSelector} from 'react-redux'
import { useLocation } from 'react-router-dom'
import Post from '../components/Post'

const Posts = () => {
  const { state } = useLocation()
  const handle = useSelector(state => state.user.handle)
  const pfp = useSelector(state => state.user.pfp)
  const posts = useSelector(state => state.user.posts)

  useEffect(() => {

  }, [])

  return (
    <div className="w-full flex flex-col py-2">
      <h1 className="text-2xl font-semibold py-2 px-4 border-b-2">Posts</h1>
      {posts.map(post => {
        let postCopy = {...post}
        postCopy.author = handle;
        postCopy.pfp = pfp;
        return <Post post={postCopy}/>
      })}
      {/* marging to accomodate navbar */}
      <div className="mb-8"></div>
    </div>
  )
}

export default Posts
