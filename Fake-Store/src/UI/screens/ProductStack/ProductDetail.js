import { StyleSheet, View, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { fetchProductByID } from "../../../service/fakeStoreAPIService";
import { useNavigation } from "@react-navigation/native";
import { Title } from "../../components/Title";
import { useRoute } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../../datamodel/redux/CartSlice";
import { ProductDetails } from "../../components/Product/ProductDetails";

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
		fetchProductByID(id).then((data) => {
			setProduct(data);
			setIsLoading(false);
		});
	}, []);

	const cart = useSelector((state) => state.cart.cart);
	const dispatch = useDispatch();
	const addItemToCartHandler = () => {
		console.log(cart);
		dispatch(addToCart(product));
	};
	return (
		<View style={styles.container}>
			<View style={styles.top}>
				<Title title="Product Details" />
			</View>

			<View style={styles.bottom}>
				{isLoading ? (
					<ActivityIndicator size="large" color="#0000ff" />
				) : (
					<ProductDetails
						product={product}
						goback={gobackHandler}
						addtocart={addItemToCartHandler}
					/>
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
		height: "91%",
		alignItems: "center",
		justifyContent: "center",
		marginHorizontal: 10,
		padding: 8,
	},
});
