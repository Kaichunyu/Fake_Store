import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export const UserDetails = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
	return (
		<View style={styles.detailsContainer}>
			<View>
				<Text style={styles.column}>User Name:</Text>
				<Text style={styles.column}>Email:</Text>
			</View>
			<View>
				<Text style={styles.details}>{userInfo.name}</Text>
				<Text style={styles.details}>{userInfo.email}</Text>
      </View>
  
		</View>
	);
};

const styles = StyleSheet.create({
	detailsContainer: {
		flexDirection: "row",
		justifyContent: "center",
	},

	column: {
		fontSize: 15,
		fontWeight: "bold",
		margin: 10,
	},

	details: {
		fontSize: 15,
		margin: 10,
  },
});
