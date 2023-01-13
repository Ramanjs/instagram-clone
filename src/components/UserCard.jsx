import baseUrl from '../baseUrl'
import { Link } from 'react-router-dom'

const User = (props) => {
  return (
    <Link to={`/${props.user.handle}`} className="w-[45%] h-40 flex flex-col items-center justify-between m-1 p-2 border-2 rounded-md shadow-sm">
        <img className="w-24 h-24 border-none rounded-full bg-gray-100" alt="" src={`${baseUrl}/users/images/${props.user.pfp}`}/>
        <p className="text-lg text-center font-semibold">{props.user.handle}</p>
    </Link>
  )
}

export default User
