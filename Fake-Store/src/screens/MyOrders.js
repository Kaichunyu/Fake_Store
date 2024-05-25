import {
	View,
	StyleSheet,
	Text,
	Pressable,
	FlatList,
	Image,
} from "react-native";
import { Title } from "../components/Title";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { fetchOrder, updateOrder } from "../service/orderService";
import { useDispatch } from "react-redux";
import { fillOrder, expandOrder, expandCategory } from "../store/OrderSlice";
import { ImageButton } from "../components/ImageButton";

export const MyOrders = () => {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.auth.userInfo.token);
	const orders = useSelector((state) => state.order.order);

	const myOrders = useSelector((state) => state.order.myOrders);

	const catExpandHandler = (id) => {
		dispatch(expandCategory(id));
		console.log(id);
	};

	const paidHandler = async (id) => {
		console.log(id);
		const updateRes = await updateOrder(token, id, 1, 0);
		console.log(updateRes);
		if (updateRes.status === "OK") {
			const fetchOrders = async () => {
				const orderRes = await fetchOrder(token);
				dispatch(fillOrder(orderRes.orders));
			};
			fetchOrders();
		}
	};

	const receivedHandler = async (id) => {
		console.log(id);
		const updateRes = await updateOrder(token, id, 1, 1);
		console.log(updateRes);
		if (updateRes.status === "OK") {
			const fetchOrders = async () => {
				const orderRes = await fetchOrder(token);
				dispatch(fillOrder(orderRes.orders));
			};
			fetchOrders();
		}
	};

	const orderExpandHandler = (id) => {
		dispatch(expandOrder(id));
		console.log(id);
	};


	return (
		<View style={styles.container}>
			<View style={styles.top}>
				<Title title="My Orders" />
			</View>
			<View style={styles.bottom}>
				<FlatList
					data={myOrders}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<View>
							<Pressable
								style={styles.button}
								onPress={() => catExpandHandler(item.id)}
							>
								<View style={styles.buttonContent}>
									<Text style={styles.buttonText}>
										{item.name}: {item.totalQty}
									</Text>
									<Ionicons
										style={styles.arrowicon}
										name={item.is_Expanded == false ? "caret-down" : "caret-up"}
									/>
								</View>
							</Pressable>
							{item.is_Expanded === false ? (
								<View></View>
							) : (
								<View>
									<FlatList
										data={item.orders}
										keyExtractor={(item) => item.id}
										renderItem={({ item }) => (
											<View>
												<Pressable onPress={() => orderExpandHandler(item.id)}>
													<View style={styles.orderContainer}>
														<Text style={styles.orderText}>
															Order ID: {item.id}
														</Text>
														<Text style={styles.orderText}>
															Items: {item.item_numbers}
														</Text>
														<Text style={styles.orderText}>
															Total: ${(item.total_price / 100).toFixed(2)}
														</Text>
														<Ionicons
															style={styles.arrowicon}
															name={
																item.is_Expanded === false
																	? "caret-down"
																	: "caret-up"
															}
														/>
													</View>
												</Pressable>
												{item.is_Expanded === false ? (
													<View></View>
												) : (
													<View>
														<FlatList
															data={JSON.parse(item.order_items)}
															keyExtractor={(item, index) => index}
															renderItem={({ item }) => (
																<View style={styles.item}>
																	<Image
																		source={{ uri: item.image }}
																		style={styles.image}
																	/>
																	<View style={styles.detailContainer}>
																		<Text style={styles.title}>
																			{item.title}
																		</Text>
																		<View style={styles.bottomText}>
																			<Text style={styles.detail}>
																				Price: ${item.price}
																			</Text>
																			<Text style={styles.detail}>
																				Quantity: {item.quantity}
																			</Text>
																		</View>
																	</View>
																</View>
															)}
														/>
														<View style={styles.paidButton}>
															{console.log(item.is_paid)}
															{item.is_paid === 0 ? (
																<ImageButton
																	buttonname="Pay"
																	iconname="wallet"
																	action={() => paidHandler(item.id)}
																/>
															) : item.is_delivered === 0 ? (
																<ImageButton
																	buttonname="Receive"
																	iconname="checkmark"
																	action={() => receivedHandler(item.id)}
																/>
															) : (
																<View></View>
															)}
														</View>
													</View>
												)}
											</View>
										)}
									/>
								</View>
							)}
						</View>
					)}
				/>
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
		padding: 10,
		alignItems: "center",
	},
	button: {
		borderWidth: 1,
		width: 380,
		height: 60,
		backgroundColor: "#8F94FB",
		borderRadius: 10,
		margin: 5,
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
	orderContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		flex: 1,
		borderBottomWidth: 1,
		padding: 5,
	},
	orderText: {
		fontSize: 18,
		fontWeight: "bold",
	},

	item: {
		margin: 10,
		borderWidth: 1,
		borderRadius: 10,
		flexDirection: "row",
		alignItems: "center",
	},

	image: {
		width: 80,
		height: 80,
		borderRadius: 10,
		borderWidth: 1,
		resizeMode: "stretch",
		margin: 10,
	},

	detailContainer: {
		flexDirection: "column",
		justifyContent: "space-around",
		flex: 1,
	},

	title: {
		fontSize: 15,
		color: "black",
		padding: 5,
		alignSelf: "flex-start",
	},
	detail: {
		fontSize: 15,
		color: "black",
		fontWeight: "bold",
		padding: 5,
		marginTop: 5,
		alignSelf: "flex-start",
	},

	bottomText: {
		flexDirection: "row",
	},
	paidButton: {
		width: 180,
		alignSelf: "center",
		padding: 10,
	},
});
