import React, { useState } from 'react';
import instagram from '../images/instagram.png';
import Spinner from '../components/Spinner';
import Error from '../components/Error';
import { Navigate, Link } from 'react-router-dom';
import { login } from '../redux/user';
import { useSelector, useDispatch } from 'react-redux';

const Login = () => {
  const loggedIn = useSelector(state => state.user.loggedIn);
  const dispatch = useDispatch();

  const [userName, setUserName] = useState('')
  const [passwd, setPasswd] = useState('')
  const [passwdMask, setPasswdMask] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handlePasswdChange = (curPasswd) => {
    if (curPasswd.length > passwd.length) { // new character written
      setPasswd(passwd + curPasswd.slice(passwd.length, curPasswd.length))
    } else { // character deleted
      setPasswd(passwd.slice(0, passwd.length - 1))
    }

    setPasswdMask('.'.repeat(curPasswd.length))
  }

  const handleSubmit = (e) => {
    setLoading(true)
    setError('')
    e.preventDefault();
    dispatch(login({
      username: userName,
      password: passwd,
      setLoading,
      setError
    }));
  }

  if (loggedIn) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-slate-100">
      <div className="flex flex-col items-center w-11/12 bg-white p-5 border-2 border-gray-200 space-y-4 shadow-lg">
        <img className="w-1/2" src={instagram} alt="instagram" />
        <form className="flex flex-col w-5/6 space-y-2" onSubmit={handleSubmit}>
          <input type="text" className="w-full border-2 border-gray-200 p-2 focus:border-gray-300 focus:outline-none" placeholder="Username" onChange={e => setUserName(e.target.value)} value={userName} required />
          <input type="text" className="w-full border-2 border-gray-200 p-2 focus:border-gray-300 focus:outline-none font-bold placeholder:font-normal" placeholder="Password" onChange={e => handlePasswdChange(e.target.value)} value={passwdMask} required />
          {error && <Error message={error} />}
          {!loading && <input type="submit" className="w-full bg-blue-400 hover:bg-blue-500 text-white font-bold rounded py-2 cursor-pointer mt-2" value="Log In"/>}
          {loading && <Spinner />}
        </form>
        <p>Don't have an account? <Link to="/signup" className="text-blue-500 font-bold">Sign up</Link></p>
      </div>
    </div>
  )
}

export default Login
