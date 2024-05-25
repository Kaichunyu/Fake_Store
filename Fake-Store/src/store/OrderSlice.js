import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
	name: "order",
	initialState: {
		order: [],
		myOrders: [
			{
				id: 1,
				name: "New Orders",
				orders: [],
				is_Expanded: false,
				totalQty: 0,
			},
			{
				id: 2,
				name: "Paid Orders",
				orders: [],
				is_Expanded: false,
				totalQty: 0,
			},
			{
				id: 3,
				name: "Delivered Orders",
				orders: [],
				is_Expanded: false,
				totalQty: 0,
			},
		],
	},

	reducers: {
		fillOrder: (state, action) => {
			state.order = action.payload;
			state.order.forEach((order) => {
				order.is_Expanded = false;
			});
		},

		clearOrder: (state) => {
			state.order = [];
		},

		addOrder: (state, action) => {
			state.order.push({ ...action.payload });
		},

		calculateOrderTotals: (state) => {
			const newOrders = state.order.filter(
				(item) => (item.is_paid === 0) & (item.is_delivered === 0)
			);

			const paidOrders = state.order.filter(
				(item) => (item.is_paid === 1) & (item.is_delivered === 0)
			);

			const delivereOrders = state.order.filter(
				(item) => item.is_delivered === 1
			);

			state.myOrders[0].orders = newOrders;
			state.myOrders[1].orders = paidOrders;
			state.myOrders[2].orders = delivereOrders;
			state.myOrders[0].totalQty = newOrders.length;
			state.myOrders[1].totalQty = paidOrders.length;
			state.myOrders[2].totalQty = delivereOrders.length;
		},

		expandCategory: (state, action) => {
			const val = action.payload - 1;
			state.myOrders[val].is_Expanded = !state.myOrders[val].is_Expanded;
		},

		expandOrder: (state, action) => {
			// state.myOrders.find((item) => item.id == action.payload)

			state.myOrders.forEach((category) => {
				category.orders.forEach((order) => {
					if (order.id === action.payload) {
						order.is_Expanded = !order.is_Expanded;
					}
				});
			});
		},
	},
});

export const {
	fillOrder,
	clearOrder,
	addOrder,
	calculateOrderTotals,
	expandCategory,
	expandOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
