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

export const login = createAsyncThunk('user', async (data, thunkAPI) => {
  fetch(baseUrl + '/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      handle: data.username,
      password: data.password
    })
  })
    .then(async res => {
      if (!res.ok) {
        res = await res.json()
        throw new Error(res.message)
      }
      return res.json()
    })
    .then(res=> {
      thunkAPI.dispatch(loadToken(res.token))
      thunkAPI.dispatch(loggedIn(true))
      thunkAPI.dispatch(setHandle(res.handle))
    })
    .catch(err => {
      data.setError(err.message)
    })
    .finally(() => {
      data.setLoading(false)
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
      thunkAPI.dispatch(setFollowers(response.data.followers))
      thunkAPI.dispatch(setFollowing(response.data.following))
      thunkAPI.dispatch(setProfileLoaded(true));
    })
})

export const fetchUserPosts = createAsyncThunk('user', (creds, thunkAPI) => {
  fetch(baseUrl + '/users/' + creds.handle + '/posts', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${creds.token}`
    }
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

export const fetchSuggested = createAsyncThunk('user', (creds, thunkAPI) => {
  fetch(baseUrl + '/users/' + creds.handle + '/suggested', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${creds.token}`
    }
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
      state.profileLoaded = action.payload
    },
    setPosts: (state, action) => {
      state.posts = action.payload
    },
    setSuggested: (state, action) => {
      state.suggested = action.payload
    },
    setFollowers: (state, action) => {
      state.followers = action.payload
    },
    setFollowing: (state, action) => {
      state.following = action.payload
    },
    logout: (state) => {
      state.loggedIn= false
      state.profileLoaded= false
      state.token = undefined
      state.handle = undefined
      state.name= ''
      state.bio= ''
      state.pfp= ''
      state.posts= []
      state.followers= []
      state.following= []
      state.feed= []
      state.suggested= []
    }
  },
})

export const { loggedIn, loadToken, setHandle, setName, setBio, setPfp, setProfileLoaded, setPosts, setSuggested, setFollowers, setFollowing, logout } = userSlice.actions;

export default userSlice.reducer;
