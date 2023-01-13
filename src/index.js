import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Profile from './pages/Profile';
import UserProfile from './pages/UserProfile';
import UserPosts from './pages/UserPosts';
import Search from './pages/Search';
import AddPost from './pages/AddPost';
import Posts from './pages/Posts';
import EditProfile from './pages/EditProfile';
import './index.css';
import store from './redux/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route 
            path="/" 
            element={
              <RequireAuth>
                <Navbar />
                <Home />
              </RequireAuth>
            } 
          />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Navbar />
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            path="/profile/edit"
            element={
              <RequireAuth>
                <Navbar />
                <EditProfile />
              </RequireAuth>
            }
          />
          <Route
            path="/add-post"
            element={
              <RequireAuth>
                <Navbar />
                <AddPost />
              </RequireAuth>
            }
          />
          <Route
            path="/posts"
            element={
              <RequireAuth>
                <Navbar />
                <Posts />
              </RequireAuth>
            }
          />
          <Route
            path="/search"
            element={
              <RequireAuth>
                <Navbar />
                <Search />
              </RequireAuth>
            }
          />
          <Route
            path="/:handle"
            element={
              <RequireAuth>
                <Navbar />
                <UserProfile />
              </RequireAuth>
            }
          />
          <Route
            path="/:handle/posts"
            element={
              <RequireAuth>
                <Navbar />
                <UserPosts />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
