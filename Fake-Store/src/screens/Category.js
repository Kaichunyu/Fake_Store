import { StyleSheet, View, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { fetchCategories } from "../models/FakeStoreData";
import { useNavigation } from "@react-navigation/native";
import { Title } from "../components/Title";
import { List } from "../components/List";

export const Category = () => {
	const navigation = useNavigation();

	const [categories, setCategories] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetchCategories().then((data) => {
			setCategories(data);
			setIsLoading(false);
		});
	}, []);

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
				{isLoading ? (
					<ActivityIndicator />
				) : (
					<List data={categories} onPress={clickHandler} />
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
		height: "82%",
		alignItems: "center",
		justifyContent: "center",
		borderColor: "black",
		borderWidth: 2,
		marginHorizontal: 40,
		padding: 10,
	},
});
