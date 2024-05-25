import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./CartSlice";
import AuthReducer from "./AuthSlice";
import OrderReducer from "./OrderSlice";

export default configureStore({
	reducer: {
		cart: CartReducer,
		auth: AuthReducer,
		order: OrderReducer,
	},
});
