import { StyleSheet, View, Text, Alert } from "react-native";
import { Title } from "../components/Title";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../datamodel/redux/CartSlice";
import { ImageButton } from "../components/ImageButton";
import { newOrder, fetchOrder } from "../../service/orderService";
import { fillOrder } from "../../datamodel/redux/OrderSlice";
import { CartStatus } from "../components/Cart/CartStatus";
import { CartList } from "../components/Cart/CartList";

export const ShoppingCart = () => {
	const token = useSelector((state) => state.auth.userInfo.token);
	const cart = useSelector((state) => state.cart.cart);
	const totalQuantity = useSelector((state) => state.cart.totalQuantity);
	const dispatch = useDispatch();

	const checkOutHander = async () => {
		const res = await newOrder(token, cart);
		if (res.status === "error") {
			Alert.alert(res.message);
		} else {
			dispatch(clearCart());
			const fetchOrders = async () => {
				const orderRes = await fetchOrder(token);
				dispatch(fillOrder(orderRes.orders));
			};
			fetchOrders();
			Alert.alert("Check out successfully!", "A new order has been created.");
		}
		console.log(res);
	};

	return (
		<View style={styles.container}>
			<View style={styles.top}>
				<Title title="Shopping Cart" />
			</View>
			<View style={styles.bottom}>
				{totalQuantity == 0 ? (
					<View style={styles.content}>
						<Text style={styles.emptyText}>Your Cart is Empty!</Text>
					</View>
				) : (
					<View style={styles.content}>
						<CartStatus />

						<CartList data={cart} />
						<View style={styles.checkOutButton}>
							<ImageButton
								buttonname="Check Out"
								iconname="bag-check"
									action={checkOutHander}
							/>
						</View>
					</View>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		marginTop: 60,
	},
	top: {
		height: "8%",
		alignItems: "center",
		justifyContent: "center",
	},
	bottom: {
		height: "88%",
		justifyContent: "center",
		marginHorizontal: 20,
		padding: 10,
	},
	content: {
		alignSelf: "center",
	},
	emptyText: {
		fontSize: 25,
		fontWeight: "bold",
	},
	checkOutButton: {
		width: 150,
		alignSelf: "center",
	},
});
