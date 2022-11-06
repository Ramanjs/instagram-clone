import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RequireAuth = (props) => {
  const loggedIn = useSelector(state => state.user.loggedIn);

  if (!loggedIn) {
    return <Navigate to="/login" replace />
  }

  return props.children;
}

export default RequireAuth;
