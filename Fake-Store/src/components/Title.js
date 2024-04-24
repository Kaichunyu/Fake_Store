import { View, Text, StyleSheet } from "react-native";

export const Title = ({ title }) => {
	return (
		<View style={styles.titleBox}>
			<Text style={styles.titleText}>{title}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	titleBox: {
		borderBottomColor: "purple",
    borderBottomWidth: 5,
    padding: 5,
    minWidth: 300,
    alignItems: 'center',
	},

	titleText: {
		fontSize: 25,
		fontWeight: "bold",
		color: "#8F94FB",
	},
});
