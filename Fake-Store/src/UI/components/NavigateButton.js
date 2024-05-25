import { View, Pressable, StyleSheet, Text } from "react-native";

export const NavigateButton = ({ navigation, name }) => {
	return (
		<View style={styles.navigator}>
			<Pressable
				style={({ pressed }) => [
					{
						opacity: pressed ? 0.5 : 1.0,
					},
				]}
				onPress={navigation}
			>
				<Text style={styles.button}> {name}</Text>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	navigator: {
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		flex: 1,
	},
	button: {
		color: "blue",
		fontWeight: "bold",
	},
});
