import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
	name: "cart",
	initialState: {
		cart: [],
		totalQuantity: 0,
		totalPrice: 0,
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

		calculateTotals: (state) => {
			let totalQuantity = 0;
			let totalPrice = 0;
			state.cart.forEach((item) => {
				totalQuantity += item.quantity;
				totalPrice += item.quantity * item.price;
			});
			state.totalQuantity = totalQuantity;
			state.totalPrice = totalPrice;
		},
	},
});

export const {
	addToCart,
	removeFromCart,
	incrementQuantity,
	decrementQuantity,
	calculateTotals,
} = cartSlice.actions;

export default cartSlice.reducer;
