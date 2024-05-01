import {
	StyleSheet,
	View,
	Text,
	FlatList,
	Pressable,
	Image,
} from "react-native";
import { Title } from "../components/Title";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
	incrementQuantity,
	decrementQuantity,
	calculateTotals,
} from "../store/CartSlice";

export const ShoppingCart = () => {
	const cart = useSelector((state) => state.cart.cart);
	const totalPrice = useSelector((state) => state.cart.totalPrice);
	const totalQuantity = useSelector((state) => state.cart.totalQuantity);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(calculateTotals());
	}, [cart]);

	return (
		<View style={styles.container}>
			<View style={styles.top}>
				<Title title="Shopping Cart" />
			</View>
			<View style={styles.bottom}>
				{cart.length > 0 ? (
					<View style={styles.content}>
						<View style={styles.status}>
							<Text style={styles.statusText}>
								Total items: {totalQuantity}
							</Text>
							<Text style={styles.statusText}>
								Total Price: ${totalPrice.toFixed(2)}
							</Text>
						</View>
						<FlatList
							data={cart}
							keyExtractor={(item) => item.id}
							renderItem={({ item }) => (
								<View style={styles.item}>
									<Image source={{ uri: item.image }} style={styles.image} />
									<View style={styles.detailContainer}>
										<Text style={styles.detail}>{item.title}</Text>
										<Text style={styles.detail}>Price: ${item.price}</Text>
										<View style={styles.controlPanel}>
											<Pressable
												style={({ pressed }) => [
													styles.button,
													{
														opacity: pressed ? 0.5 : 1.0,
													},
												]}
												onPress={() => {
													dispatch(decrementQuantity(item));
												}}
											>
												<Text style={styles.buttonText}>-</Text>
											</Pressable>
											<Text style={styles.detail}>
												Quantity : {item.quantity}
											</Text>
											<Pressable
												style={({ pressed }) => [
													styles.button,
													{
														opacity: pressed ? 0.5 : 1.0,
													},
												]}
												onPress={() => {
													dispatch(incrementQuantity(item));
													console.log(cart);
												}}
											>
												<Text style={styles.buttonText}> + </Text>
											</Pressable>
										</View>
									</View>
								</View>
							)}
						/>
					</View>
				) : (
					<View style={styles.content}>
						<Text style={styles.emptyText}>This is empty!</Text>
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
	emptyText: {
		fontSize: 30,
		fontWeight: "bold",
	},
	item: {
		backgroundColor: "#8F94FB",
		margin: 10,
		borderWidth: 2,
		borderRadius: 10,
		width: 380,
		height: 150,
		flexDirection: "row",
		alignItems: "center",
	},

	image: {
		width: 110,
		height: 110,
		borderRadius: 10,
		borderWidth: 1,
		resizeMode: "stretch",
		margin: 10,
	},

	detailContainer: {
		flexDirection: "column",
		justifyContent: "space-evenly",
		width: 250,
		height: 140,
		marginTop: 10,
		flex: 1,
	},
	detail: {
		fontSize: 15,
		color: "black",
	},

	controlPanel: {
		marginTop: 5,
		flexDirection: "row",
		justifyContent: "space-around",
		flexWrap: "wrap",
		alignItems: "center",
		width: 250,
	},
	button: {
		backgroundColor: "green",
		justifyContent: "center",
		alignItems: "center",
		width: 30,
		height: 30,
		borderRadius: 20,
	},

	buttonText: {
		fontSize: 20,
		fontWeight: "700",
		color: "white",
	},
});
