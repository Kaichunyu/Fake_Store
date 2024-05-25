import { View, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";

export const CartStatus = () => {

  const totalPrice = useSelector((state) => state.cart.totalPrice);
	const totalQuantity = useSelector((state) => state.cart.totalQuantity);
	return (
		<View style={styles.status}>
			<Text style={styles.statusText}>Total items: {totalQuantity}</Text>
			<Text style={styles.statusText}>
				Total Price: ${totalPrice.toFixed(2)}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
  status: {
		flexDirection: "row",
		justifyContent: "space-around",
		width: 400,
		height: 50,
		borderWidth: 1,
		borderRadius: 10,
		backgroundColor: "#8F94FB",
	},
	statusText: {
		fontSize: 18,
		fontWeight: "bold",
		alignSelf: "center",
	},
});
