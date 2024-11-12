import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isauthenticated: false,
  isloading: false,
  user: null,
}

const authSlice = createSlice({
  name:'auth',
  initialState,
  reducers:{
    setuser:(state,action)=>{
      state.user=action.payload;
      state.isauthenticated=true;
    },
  }
})

export const {setuser}=authSlice.actions;

export default authSlice.reducer;
