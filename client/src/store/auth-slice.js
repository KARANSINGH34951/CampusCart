import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isauthenticated: false,
  isloading: false,
  user: {
    userName: '',
    email: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setuser: (state, action) => {
      
      state.user = {
        userName: action.payload.userName,
        email: action.payload.email,
      };
      state.isauthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = {
        userName: '',
        email: '',
      };
    },
  },
});

export const { setuser } = authSlice.actions;

export default authSlice.reducer;
