import {
	View,
	StyleSheet,
	Text,
	Pressable,
	Image,
	FlatList,
} from "react-native";
import { useDispatch } from "react-redux";
import {
	incrementQuantity,
	decrementQuantity,
} from "../../../datamodel/redux/CartSlice";

export const CartList = ({ data }) => {
	const dispatch = useDispatch();
	return (
		<FlatList
			data={data}
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
							<Text style={styles.detail}>Quantity : {item.quantity}</Text>
							<Pressable
								style={({ pressed }) => [
									styles.button,
									{
										opacity: pressed ? 0.5 : 1.0,
									},
								]}
								onPress={() => {
									dispatch(incrementQuantity(item));
								}}
							>
								<Text style={styles.buttonText}> + </Text>
							</Pressable>
						</View>
					</View>
				</View>
			)}
		/>
	);
};

const styles = StyleSheet.create({
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
		fontWeight: "900",
		color: "white",
	},
});
