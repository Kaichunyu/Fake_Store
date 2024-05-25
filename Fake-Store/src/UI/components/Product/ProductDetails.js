import { View, StyleSheet, Image, Text, ScrollView } from "react-native";
import { ImageButton } from "../ImageButton";

export const ProductDetails = ({ goback, addtocart, product }) => {
	return (
		<View style={{ justifyContent: "center", alignItems: "center" }}>
			<Image style={styles.image} source={{ uri: product.image }} />
			<Text style={styles.title}>{product.title}</Text>
			<View style={styles.details}>
				<Text style={styles.detailsText}>Rate: {product.rating.rate}</Text>
				<Text style={styles.detailsText}>Count: {product.rating.count}</Text>
				<Text style={styles.detailsText}>Price: ${product.price}</Text>
			</View>
			<View style={styles.buttonPanel}>
				<ImageButton iconname="backspace" buttonname="Back" action={goback} />
				<ImageButton
					iconname="cart"
					buttonname="Add to Cart"
					action={addtocart}
				/>
			</View>
			<Text style={styles.description}>Description: </Text>
			<ScrollView style={styles.descriptionContainer}>
				<Text style={styles.descriptionText}> {product.description}</Text>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	image: {
		width: 360,
		height: 360,
		borderRadius: 10,
		borderWidth: 1,
		resizeMode: "contain",
	},

	title: {
		padding: 8,
		fontSize: 20,
		fontWeight: "bold",
		alignSelf: "flex-start",
	},

	details: {
		flexDirection: "row",
		justifyContent: "space-around",
		width: 360,
		height: 40,
		borderWidth: 1,
		borderRadius: 10,
		backgroundColor: "#8F94FB",
	},
	detailsText: {
		fontSize: 18,
		fontWeight: "bold",
		padding: 8,
	},

	buttonPanel: {
		flexDirection: "row",
		justifyContent: "space-around",
		width: 360,
		padding: 8,
	},

	description: {
		fontSize: 18,
		fontWeight: "bold",
		padding: 8,
		alignSelf: "flex-start",
	},

	descriptionContainer: {
		backgroundColor: "lightgrey",
		width: 360,
		borderWidth: 2,
		borderRadius: 10,
	},

	descriptionText: {
		padding: 8,
		fontSize: 15,
	},
});
