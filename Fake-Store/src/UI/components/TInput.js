import { View, StyleSheet, TextInput, Text } from "react-native";

export const TInput = ({ name, value, onChange, secure }) => {
	return (
		<View>
			<Text style={styles.text}>{name}</Text>
			<TextInput
				style={styles.inputBox}
				value={value}
				onChangeText={onChange}
				secureTextEntry={secure}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	text: {
		padding: 10,
		color: "white",
	},
	inputBox: {
		width: 380,
		height: 40,
		borderRadius: 5,
		padding: 10,
		alignSelf: "center",
		backgroundColor: "white",
	},
});
