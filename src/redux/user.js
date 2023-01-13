import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import baseUrl from '../baseUrl';
import Cookies from 'js-cookie';

const initialState = {
  loggedIn: false,
  profileLoaded: false,
  token: Cookies.get('instagram_token'),
  handle: Cookies.get('instagram_handle'),
  name: '',
  bio: '',
  pfp: '',
  posts: [],
  followers: [],
  following: [],
  feed: [],
  suggested: []
};

if (initialState.token && initialState.handle) {
  initialState.loggedIn = true;
}

export const signup = createAsyncThunk('user', async (creds, thunkAPI) => {
  fetch(baseUrl + '/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: creds.fullname,
      handle: creds.username,
      password: creds.password
    })
  })
    .then(response => {
      if (!response.ok) {
        throw Error('Error occured while signing up')
      }
      return response;
    })
    .then(response => response.json())
    .then(response => {
      console.log(response);
    })
});

export const login = createAsyncThunk('user', async (creds, thunkAPI) => {
  fetch(baseUrl + '/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      handle: creds.username,
      password: creds.password
    })
  })
    .then(response => {
      if (!response.ok) {
        throw Error('Error occured while logging in')
      }
      return response;
    })
    .then(response => response.json())
    .then(response => {
      thunkAPI.dispatch(loadToken(response.token))
      thunkAPI.dispatch(loggedIn(true))
      thunkAPI.dispatch(setHandle(response.handle))
    })
});

export const fetchUserDetails = createAsyncThunk('user', (creds, thunkAPI) => {
  fetch(baseUrl + '/users/' + creds.handle, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + creds.token
    },
  })
    .then(response => {
      if (!response.ok) {
        throw Error('ofo');
      }
      return response;
    })
    .then(response => response.json())
    .then(response => {
      thunkAPI.dispatch(setName(response.data.name));
      thunkAPI.dispatch(setBio(response.data.bio));
      thunkAPI.dispatch(setPfp(response.data.pfp));
      thunkAPI.dispatch(setProfileLoaded(true));
    })
})

export const fetchUserPosts = createAsyncThunk('user', (handle, thunkAPI) => {
  fetch(baseUrl + '/users/' + handle + '/posts', {
    method: 'GET',
  })
    .then(response => {
      if (!response.ok) {
        throw Error('ofo');
      }
      return response;
    })
    .then(response => response.json())
    .then(response => {
      thunkAPI.dispatch(setPosts(response.message));
    })
})

export const fetchFeed = createAsyncThunk('user', () => {

})

export const fetchSuggested = createAsyncThunk('user', (handle, thunkAPI) => {
  fetch(baseUrl + '/users/' + handle + '/suggested', {
    method: 'GET',
  })
    .then(response => {
      if (!response.ok) {
        throw Error('ofo');
      }
      return response;
    })
    .then(response => response.json())
    .then(response => {
      thunkAPI.dispatch(setSuggested(response.message));
    })
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
    loadToken: (state, action) => {
      state.token = action.payload;
      Cookies.set('instagram_token', action.payload);
    },
    setHandle: (state, action) => {
      state.handle = action.payload;
      Cookies.set('instagram_handle', action.payload);
    },
    setName: (state, action) => {
      state.name = action.payload
    },
    setBio: (state, action) => {
      state.bio = action.payload
    },
    setPfp: (state, action) => {
      state.pfp = action.payload
    },
    setProfileLoaded: (state, action) => {
      state.profileLoaded = action.payload;
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setSuggested: (state, action) => {
      state.suggested = action.payload;
    }
  },
})

export const { loggedIn, loadToken, setHandle, setName, setBio, setPfp, setProfileLoaded, setPosts, setSuggested } = userSlice.actions;

export default userSlice.reducer;
