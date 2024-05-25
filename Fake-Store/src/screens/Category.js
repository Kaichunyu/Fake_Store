import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import { useEffect, useState } from "react";
import { fetchCategories } from "../service/apiService";
import { useNavigation } from "@react-navigation/native";
import { Title } from "../components/Title";
import { CategoryList } from "../components/CategoryList";

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
					<ActivityIndicator size="large" color="#0000ff" />
				) : (
					<CategoryList data={categories} onPress={clickHandler} />
				)}
				<Text>App developed by Kai Chun Yu</Text>
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
