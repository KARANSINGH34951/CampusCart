import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isauthenticated: false,
  isloading: false,
  user: {
    userName: '',
    email: '',
    role: '',
    id: '' 
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
        role: action.payload.role,
        id: action.payload._id 
      };
      state.isauthenticated = true; 
    },
    logout: (state) => {
      state.isauthenticated = false;
      state.user = {
        userName: '',
        email: '',
        role: '',
        id: '' 
      };
    },
  },
});

export const { setuser, logout } = authSlice.actions; 

export default authSlice.reducer;
