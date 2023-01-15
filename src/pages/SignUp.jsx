import React, {useState} from 'react';
import instagram from '../images/instagram.png';
import ErrorMessage from '../components/Error';
import Spinner from '../components/Spinner';
import baseUrl from '../baseUrl';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [fullName, setFullName] = useState('')
  const [userName, setUserName] = useState('')
  const [passwd, setPasswd] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    setError('')
    setLoading(true)
    e.preventDefault();
    fetch(baseUrl + '/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: fullName,
        handle: userName,
        password: passwd
      })
    })
      .then(async res => {
        if (!res.ok) {
          res = await res.json()
          throw new Error(res.message)
        } else {
          navigate('/login');
        }
      })
      .catch(err => {
        setTimeout(() => setError(err.message), 2000)
        setTimeout(() => setLoading(false), 2000)
      })
  }

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-slate-100">
      <div className="flex flex-col items-center w-11/12 bg-white p-5 border-2 border-gray-200 space-y-4 shadow-lg">
        <img className="w-1/2" src={instagram} alt="instagram" />
        <form className="flex flex-col w-5/6 space-y-2" onSubmit={handleSubmit}>
          <input type="text" className="w-full border-2 border-gray-200 p-2 focus:border-gray-300 focus:outline-none" placeholder="Full Name" onChange={e => setFullName(e.target.value)} value={fullName} required/>
          <input type="text" className="w-full border-2 border-gray-200 p-2 focus:border-gray-300 focus:outline-none" placeholder="Username" onChange={e => setUserName(e.target.value)} value={userName} required/>
          <input type="text" className="w-full border-2 border-gray-200 p-2 focus:border-gray-300 focus:outline-none" placeholder="Password" onChange={e => setPasswd(e.target.value)} value={passwd} required/>
          {error && <ErrorMessage message={error}/>}
          {!loading && <input type="submit" className="w-full bg-blue-400 hover:bg-blue-500 text-white font-bold rounded py-2 cursor-pointer mt-2" value="Sign Up"/>}
          {loading && <Spinner />}
        </form>
        <p>Already have an account? <Link to="/login" className="text-blue-500 font-bold">Log In</Link></p>
      </div>
    </div>
  )
}

export default SignUp
