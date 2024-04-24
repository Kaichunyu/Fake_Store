import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { fetchCategories } from "../models/FakeStoreData";
import { useNavigation } from "@react-navigation/native";
import { Title } from "../components/Title";
import { List } from "../components/List";

export const Category = () => {
	const navigation = useNavigation();

	const [categories, setCategories] = useState([]);

	fetchCategories().then((data) => {
		setCategories(data);
	});

	const clickHandler = (category) => {
		console.log(category);
		navigation.navigate("ProductList", { category: category });
	};

	return (
		<View style={styles.container}>
			<View style={styles.top}>
				<Title title="Category" />
			</View>

			<View style={styles.bottom}>
				<List data={categories} onPress={clickHandler} />
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
		height: "82%",
		alignItems: "center",
		justifyContent: "center",
		borderColor: "black",
		borderWidth: 2,
		marginHorizontal: 40,
		padding: 10,
	},
});
