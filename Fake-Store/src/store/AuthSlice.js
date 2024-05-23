import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		userInfo: [],
    error: null,
    isLoggedIn: false,
  },
  
  reducers: {
    logIn: (state, action) => {
      state.userInfo = action.payload
      state.isLoggedIn = true
    },

    logOut: (state) => {
      state.userInfo = []
      state.isLoggedIn = false
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