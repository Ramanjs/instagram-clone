import {useSelector} from 'react-redux'
import UserCard from '../components/UserCard'

const Search = () => {
  const suggested = useSelector(state => state.user.suggested)

  return (
    <div className="">
      <h1 className="text-2xl font-semibold py-2 px-4 border-b-2">Suggested</h1>
      <div className="w-full flex flex-wrap">
        {suggested.map(suggestion => (
          <UserCard user={suggestion}/>
        ))}
      </div>
    </div>
  )
}

export default Search
