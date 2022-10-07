import React, {useState} from 'react';
import instagram from '../images/instagram.png';
import { Link } from 'react-router-dom';

const Login = () => {

  const [userName, setUserName] = useState('')
  const [passwd, setPasswd] = useState('')

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-slate-100">
      <div className="flex flex-col items-center w-11/12 bg-white p-5 border-2 border-gray-200 space-y-4 shadow-lg">
        <img className="w-1/2" src={instagram} alt="instagram" />
        <form className="flex flex-col w-5/6 space-y-2">
          <input type="text" className="w-full border-2 border-gray-200 p-2 focus:border-gray-300 focus:outline-none" placeholder="Username" onChange={e => setUserName(e.target.value)} value={userName} />
          <input type="text" className="w-full border-2 border-gray-200 p-2 focus:border-gray-300 focus:outline-none" placeholder="Password" onChange={e => setPasswd(e.target.value)} value={passwd} />
          <input type="submit" className="w-full bg-blue-400 hover:bg-blue-500 text-white font-bold rounded py-2 cursor-pointer mt-2" value="Log In"/>
        </form>
        <p>Don't have an account? <Link to="/signup" className="text-blue-500 font-bold">Sign up</Link></p>
      </div>
    </div>
  )
}

export default Login
