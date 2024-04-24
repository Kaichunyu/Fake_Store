import { StyleSheet, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export const ImageButton = ({ buttonname, iconname, action }) => {
	return (
		<Ionicons.Button
			style={styles.icon}
			name={iconname}
			onPress={action}
			color={"white"}
			size={20}
		>
			<Text style={styles.text}>{buttonname}</Text>
		</Ionicons.Button>
	);
};

const styles = StyleSheet.create({
	text: {
		fontSize: 17,
		fontWeight: "bold",
		color: "white",
	},

	icon: {
		backgroundColor: "dodgerblue",
    padding: 10,
    minWidth: 130,
    flexDirection: "row",
		justifyContent: "space-around",
	},
});
