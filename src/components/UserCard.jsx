import baseUrl from '../baseUrl'

const User = (props) => {
  return (
    <div className="w-[45%] h-44 flex flex-col items-center justify-between m-1 p-2 border-2 rounded-md shadow-sm">
      <img className="w-16 h-16 border-none rounded-full bg-gray-100" alt="" src={`${baseUrl}/users/images/${props.user.pfp}`}/>
      <p className="">{props.user.handle}</p>
      <div className="w-fit py-2 px-4 bg-blue-400 hover:bg-blue-500 text-white font-bold rounded cursor-pointer">Follow</div>
    </div>
  )
}

export default User
