import { View, StyleSheet, Text, Pressable } from "react-native";
import { Title } from "../components/Title";
import Ionicons from "@expo/vector-icons/Ionicons";

export const MyOrders = () => {
	return (
		<View style={styles.container}>
			<View style={styles.top}>
				<Title title="My Orders" />
			</View>
			<View style={styles.bottom}>
				<Pressable
					style={styles.button}
					onPress={() => {
						console.log("orders clicked");
					}}
				>
					<View style={styles.buttonContent}>
						<Text style={styles.buttonText}>New Orders: 0</Text>
						<Ionicons
							style={styles.arrowicon}
							name="caret-down"
							// name={item.isExpanded == false ? "caret-down" : "caret-up"}
						/>
					</View>
				</Pressable>

				<Pressable
					style={styles.button}
					onPress={() => {
						console.log("orders clicked");
					}}
				>
					<View style={styles.buttonContent}>
						<Text style={styles.buttonText}>Paid Orders: 0</Text>
						<Ionicons
							style={styles.arrowicon}
							name="caret-down"
							// name={item.isExpanded == false ? "caret-down" : "caret-up"}
						/>
					</View>
				</Pressable>
				<Pressable
					style={styles.button}
					onPress={() => {
						console.log("orders clicked");
					}}
				>
					<View style={styles.buttonContent}>
						<Text style={styles.buttonText}>Delivered Orders: 0</Text>
						<Ionicons
							style={styles.arrowicon}
							name="caret-down"
							// name={item.isExpanded == false ? "caret-down" : "caret-up"}
						/>
					</View>
				</Pressable>
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
		marginHorizontal: 20,
		padding: 10,
	},
	button: {
		borderWidth: 1,
		width: 380,
		height: 60,
		backgroundColor: "#8F94FB",
		borderRadius: 10,
	},
	buttonContent: {
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
		flex: 1,
    margin: 10,
	},
	buttonText: {
		fontSize: 20,
    fontWeight: "bold",
	},
	arrowicon: {
		color: "green",
    fontSize: 25,
	},
});
