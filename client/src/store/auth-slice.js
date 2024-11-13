import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isauthenticated: false,
  isloading: false,
  user: {
    name: '',
    email: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setuser: (state, action) => {
      
      state.user = {
        name: action.payload.name,
        email: action.payload.email,
      };
      state.isauthenticated = true;
    },
  },
});

export const { setuser } = authSlice.actions;

export default authSlice.reducer;
