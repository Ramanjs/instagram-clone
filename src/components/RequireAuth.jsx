import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { fetchSuggested, fetchUserDetails, fetchUserPosts } from '../redux/user';
import { useDispatch, useSelector } from 'react-redux';

const RequireAuth = (props) => {
  const loggedIn = useSelector(state => state.user.loggedIn);
  const profileLoaded = useSelector(state => state.user.profileLoaded);
  const user = useSelector(state => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (profileLoaded === false && loggedIn) {
      const creds = {
        handle: user.handle,
        token: user.token
      }
      dispatch(fetchUserDetails(creds));
      dispatch(fetchUserPosts(creds));
      dispatch(fetchSuggested(creds));
    }
  }, [])

  if (!loggedIn) {
    return <Navigate to="/login" replace />
  }

  return props.children;
}

export default RequireAuth;
