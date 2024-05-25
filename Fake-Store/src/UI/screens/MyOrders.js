import { View, StyleSheet } from "react-native";
import { Title } from "../components/Title";
import { MyOrdersList } from "../components/Order/MyOrdersList";

export const MyOrders = () => {
	return (
		<View style={styles.container}>
			<View style={styles.top}>
				<Title title="My Orders" />
			</View>
			<View style={styles.bottom}>
				<MyOrdersList />
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
		height: "92%",
		alignItems: "center",
	},
});
