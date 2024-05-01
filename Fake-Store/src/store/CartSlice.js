import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
	name: "cart",
	initialState: {
		cart: [],
	},
	reducers: {
		addToCart: (state, action) => {
			const itemInCart = state.cart.find(
				(item) => item.id == action.payload.id
			);
			if (itemInCart) {
				itemInCart.quantity += 1;
			} else {
				state.cart.push({ ...action.payload, quantity: 1 });
			}
		},

		removeFromCart: (state, action) => {
			const removeFromCart = state.cart.filter(
				(item) => item.id !== action.payload.id
			);
			state.cart = removeFromCart;
		},
		incrementQuantity: (state, action) => {
			const itemInCart = state.cart.find(
				(item) => item.id == action.payload.id
			);
			itemInCart.quantity += 1;
		},
		decrementQuantity: (state, action) => {
			const itemInCart = state.cart.find(
				(item) => item.id == action.payload.id
			);
			if (itemInCart.quantity == 1) {
				const removeFromCart = state.cart.filter(
					(item) => item.id !== action.payload.id
				);
				state.cart = removeFromCart;
			} else {
				itemInCart.quantity -= 1;
			}
		},
	},
});

export const {
	addToCart,
	removeFromCart,
	incrementQuantity,
	decrementQuantity,
} = cartSlice.actions;
export const selectCount = (state) => state.cart.length;
export default cartSlice.reducer;
