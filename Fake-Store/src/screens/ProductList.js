import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { formatCategory } from "../models/FakeStoreData";
import { useNavigation } from "@react-navigation/native";
import { Title } from "../components/Title";
import { ImageButton } from "../components/ImageButton";
import { useRoute } from "@react-navigation/native";
import { fetchProducts } from "../models/FakeStoreData";
import { List } from "../components/List";

export const ProductList = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const category = route.params?.category;

	const gobackHandler = () => {
		navigation.navigate("Category");
	};

	const [products, setProducts] = useState([]);

	fetchProducts(category).then((data) => {
		setProducts(data);
	});

	const clickHandler = (category) => {
		console.log(category);
	};

	return (
		<View style={styles.container}>
			<View style={styles.top}>
				<Title title={formatCategory(category)} />
			</View>

			<View style={styles.middle}>
				<List data={products} onPress={clickHandler} />
			</View>

			<View style={styles.bottom}>
				<ImageButton
					iconname="backspace"
					buttonname="Back"
					action={gobackHandler}
				/>
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
	middle: {
		height: "82%",
		alignItems: "center",
		justifyContent: "center",
		borderColor: "black",
		borderWidth: 2,
		marginHorizontal: 20,
		padding: 10,
	},

	bottom: {
		height: "10%",
		alignItems: "center",
		justifyContent: "flex-start",
		padding: 10,
	},
});
