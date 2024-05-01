import {
	View,
	FlatList,
	Text,
	StyleSheet,
	Pressable,
} from "react-native";
import { formatCategory } from "../models/FakeStoreData";

export const CategoryList = ({ data, onPress }) => {
	return (
			<FlatList
				data={data}
				renderItem={({ item }) => (
          <View style={styles.item}>
          <Pressable
								style={({ pressed }) => [
									styles.categoryButton,
									{
										opacity: pressed ? 0.5 : 1.0,
									},
								]}
								onPress={() => {
									onPress(item.name);
								}}
							>
								<Text style={styles.categoryText}>
									{formatCategory(item.name)}
								</Text>
							</Pressable>
          </View>
				)}
				keyExtractor={(item) => item.id}
			/>
	);
};

const styles = StyleSheet.create({
	item: {
		backgroundColor: "#8F94FB",
		margin: 10,
		borderWidth: 2,
		minWidth: 300,
		maxWidth: 350,
	},

	categoryText: {
		flex: 0.5,
		fontSize: 20,
		fontWeight: "bold",
		color: "black",
		padding: 10,
	},

	categoryButton: {
		alignItems: "center",
	},

});
