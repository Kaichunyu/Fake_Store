import {
	View,
	FlatList,
	Text,
	StyleSheet,
	Pressable,
	Image,
} from "react-native";
import { formatCategory } from "../models/FakeStoreData";

export const List = ({ data, onPress }) => {
	return (
		<View>
			<FlatList
				data={data}
				renderItem={({ item }) => (
					<View style={styles.item}>
						{item.id === undefined ? (
							<Pressable
								style={({ pressed }) => [
									styles.categoryButton,
									{
										opacity: pressed ? 0.5 : 1.0,
									},
								]}
								onPress={() => {
									onPress(item);
								}}
							>
								<Text style={styles.categoryText}>{formatCategory(item)}</Text>
							</Pressable>
						) : (
							<Pressable
								style={({ pressed }) => [
									styles.DetailButton,
									{
										opacity: pressed ? 0.5 : 1.0,
									},
								]}
								onPress={() => {}}
							>
								<View style={styles.imageContainer}>
									<Image source={{ uri: item.image }} style={styles.image} />
								</View>
								<View style={styles.detailContainer}>
									<Text style={styles.detail}>{item.title}</Text>
									<Text style={styles.detail}>Price: ${item.price}</Text>
								</View>
							</Pressable>
						)}
					</View>
				)}
				keyExtractor={(item) => item.id}
			/>
		</View>
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

	DetailButton: {
		flexDirection: "row",
		justifyContent: "flex-start",
	},

	imageContainer: {
		margin: 10,
	},

	image: {
		width: 80,
		height: 80,
		borderRadius: 10,
		borderWidth: 1,
	},

	detailContainer: {
		flexDirection: "column",
		justifyContent: "space-evenly",
		maxWidth: 220,
		maxHeight: 80,
		margin: 10,
	},
	detail: {
		fontSize: 15,
		color: "black",
		margin: 1,
	},
});
