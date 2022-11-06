import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  loggedIn: false,
  token: '',
  name: '',
  handle: '',
  bio: '',
};

export const login = createAsyncThunk('user', async (creds) => {
  //return fetch('http://localhost:3000/auth', {
    //method: 'POST',
    //body: {
      //username: creds.username,
      //password: creds.password
    //}
  //})
  return Promise.resolve().then(() => 42);
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [login.pending]: (state) => {
      state.loggedIn = false
    },
    [login.fulfilled]: (state) => {
      state.loggedIn = true
    },
    [login.rejected]: (state) => {
      state.loggedIn = 'rejected bitch'
    }
  }
})

export default userSlice.reducer;
