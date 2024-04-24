import {
	StyleSheet,
	Text,
	View,
	Image,
	ScrollView,
	ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { fetchProduct } from "../models/FakeStoreData";
import { useNavigation } from "@react-navigation/native";
import { Title } from "../components/Title";
import { useRoute } from "@react-navigation/native";
import { ImageButton } from "../components/ImageButton";

export const ProductDetail = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const id = route.params?.id;

	const gobackHandler = () => {
		navigation.navigate("ProductList", { category: product.category });
	};

	const [product, setProduct] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetchProduct(id).then((data) => {
			setProduct(data);
			setIsLoading(false);
		});
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.top}>
				<Title title="Product Details" />
			</View>

			<View style={styles.bottom}>
				{isLoading ? (
					<ActivityIndicator />
				) : (
					<ScrollView>
						<Image style={styles.image} source={{ uri: product.image }} />
						<Text style={styles.title}>{product.title}</Text>
						<View style={styles.details}>
							<Text style={styles.detailsText}>
								Rate: {product.rating.rate}
							</Text>
							<Text style={styles.detailsText}>
								Sold: {product.rating.count}
							</Text>
							<Text style={styles.detailsText}>Price: ${product.price}</Text>
						</View>
						<View style={styles.buttonPanel}>
							<ImageButton
								iconname="backspace"
								buttonname="Back"
								action={gobackHandler}
							/>
							<ImageButton
								iconname="cart"
								buttonname="Add to Cart"
								action={gobackHandler}
							/>
						</View>

						<Text style={styles.detailsText}>Description: </Text>
						<View style={styles.descriptionContainer}>
							<Text style={styles.descriptionText}> {product.description}</Text>
						</View>
					</ScrollView>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		flexDirection: "column",
	},
	top: {
		height: "8%",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 10,
	},
	bottom: {
		height: "88%",
		alignItems: "center",
		justifyContent: "center",
		borderColor: "black",
		borderWidth: 2,
		marginHorizontal: 20,
		padding: 8,
	},

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

	descriptionContainer: {
		backgroundColor: "lightgrey",
		width: 360,
		minheight: 100,
		borderWidth: 2,
		borderRadius: 10,
	},

	descriptionText: {
		padding: 8,
		fontSize: 15,
	},
});
