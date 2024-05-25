import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fillOrder } from "../../../datamodel/redux/OrderSlice";
import { fetchOrder } from "../../../service/orderService";
import { fetchCart } from "../../../service/cartService";
import { fillCart } from "../../../datamodel/redux/CartSlice";
import { LogInForm } from "../../components/User/Form/LogInForm";

export const SignIn = () => {
	const navigation = useNavigation();

	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.auth.userInfo);

	useEffect(() => {
		const fetchOrders = async () => {
			const orderRes = await fetchOrder(userInfo.token);
			dispatch(fillOrder(orderRes.orders));
		};
		const fetchCartItems = async () => {
			const cartRes = await fetchCart(userInfo.token);
			dispatch(fillCart(cartRes.items));
		};
		if (userInfo.token) {
			fetchOrders();
			fetchCartItems();
		}
	}, [userInfo]);

	useEffect(() => {
		if (userInfo.token) {
			navigation.navigate("User");
		}
	}, []);

	return (
		<View style={styles.container}>
			<LogInForm />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
