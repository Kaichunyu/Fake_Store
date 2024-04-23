import { FlatList, StyleSheet, Text, View, Pressable } from "react-native";
import { useState, useEffect } from "react";

const url = "https://fakestoreapi.com/products/";

function formatProductNames(products) {
	// Write your implementation
	return products.map((product) => {
		// const id = product
		// 	.toLowerCase()
		// 	.replace(/[^\w\s]/g, "")
		// 	.replace(/\s+(.)/g, (match, group1) => group1.toUpperCase());

		const title = product.replace(/^[a-z]| [a-z]/gi, (char) =>
			char.toUpperCase()
		);
		return { id, title };
	});
}

async function getCategories() {
	// Write your implementation
	try {
		const response = await fetch(
			"https://fakestoreapi.com/products/categories"
		);
		if (!response.ok) {
			throw new Error("Failed to fetch categories");
		}
		const categories = await response.json();
		return categories;
	} catch (error) {
		console.error("Error fetching categories:", error.message);
		return [];
	}
}

export const Category = () => {
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(url + "categories");
				const data = await res.json();
				// const formattedData = formatProductNames(data)
				setCategories(data);
				// console.log(formattedData)
			} catch (e) {
			} finally {
			}
		};
		fetchData();
	}, [categories]);

	// useEffect(() => {
	//   const data = getCategories()
	//   setCategories(data)
	// }, [categories])

	return (
		<View style={styles.container}>
			<View style={styles.top}>
				<View style={styles.titleBox}>
					<Text style={styles.titleText}>Category</Text>
				</View>
			</View>

			<View style={styles.bottom}>
				<FlatList
					// style={styles.catList}
					data={categories}
					renderItem={({ item, index }) => (
						<View style={styles.item}>
							<Pressable
								style={({ pressed }) => [
									styles.Button,
									{
										opacity: pressed ? 0.5 : 1.0,
									},
								]}
								onPress={() => {}}
							>
								<Text style={styles.categoryText}>{item}</Text>
							</Pressable>
						</View>
					)}
					// keyExtractor = {(item) => item.id}
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
		height: "10%",
		alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
	},
	bottom: {
		height: "80%",
		alignItems: "center",
		justifyContent: "center",
		borderColor: "black",
		borderWidth: 2,
		marginHorizontal: 40,
		padding: 10,
	},

	titleBox: {
		borderBottomColor: "purple",
		// borderRadius: 10,
		borderBottomWidth: 5,
	},

	titleText: {
		fontSize: 40,
		fontWeight: "bold",
    color: "black",
	},

	item: {
		backgroundColor: "lightblue",
		// borderRadius: 10,
		margin: 10,
		borderWidth: 2,
	},

	categoryText: {
		flex: 0.5,
		fontSize: 30,
		fontWeight: "bold",
    color: "black",
    padding: 10,
  },
  
	Button: {
    backgroundColor: "lightblue",
    // justifyContent: "center",
    alignItems: "center",
	},
});
