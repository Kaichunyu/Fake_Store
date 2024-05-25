import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		userInfo: [],
  },
  
  reducers: {
    logIn: (state, action) => {
      state.userInfo = action.payload
    },

    logOut: (state) => {
      state.userInfo = []
    },

    updateName: (state, action) => {
      state.userInfo.name = action.payload.name
    },

  },
});

export const {
  logIn,
  logOut,
  updateName
} = authSlice.actions;

export default authSlice.reducer;