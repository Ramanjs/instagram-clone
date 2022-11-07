import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { baseUrl } from '../baseUrl';
import { dispatch } from '@reduxjs/toolkit';
import {act} from 'react-dom/test-utils';

const initialState = {
  loggedIn: false,
  token: '',
  name: '',
  handle: '',
  bio: '',
};

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
      console.log(response);
      thunkAPI.dispatch(loadToken(response.token))
      thunkAPI.dispatch(loggedIn(true))
    })
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
    loadToken: (state, action) => {
      state.token = action.payload;
    }
  },
})

export const { loggedIn, loadToken } = userSlice.actions;

export default userSlice.reducer;
