import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
	name: "order",
	initialState: {
		order: [],
  },
  
  reducers: {
    fillOrder: (state, action) => {
      state.order = action.payload
    },

    clearOrder: (state) => {
      state.order = [];
    },

  },
});

export const {
  fillOrder,
  clearOrder,

} = orderSlice.actions;

export default orderSlice.reducer;