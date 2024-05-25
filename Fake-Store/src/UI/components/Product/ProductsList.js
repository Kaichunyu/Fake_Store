import {
	View,
	FlatList,
	Text,
	StyleSheet,
	Pressable,
	Image,
} from "react-native";

export const ProductsList = ({ data, onPress }) => {
	return (
		<FlatList
			data={data}
			renderItem={({ item }) => (
				<View style={styles.item}>
					<Pressable
						style={({ pressed }) => [
							styles.DetailButton,
							{
								opacity: pressed ? 0.5 : 1.0,
							},
						]}
						onPress={() => {
							onPress(item.id);
						}}
					>
						<View style={styles.imageContainer}>
							<Image source={{ uri: item.image }} style={styles.image} />
						</View>
						<View style={styles.detailContainer}>
							<Text style={styles.detail}>{item.title}</Text>
							<Text style={styles.detail}>Price: ${item.price}</Text>
						</View>
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
		width: 380,
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
		resizeMode: "stretch",
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
