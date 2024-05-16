import { View, StyleSheet, Text } from "react-native";
import { Title } from "../components/Title";
import { ImageButton } from "../components/ImageButton";

export const UserProfile = () => {
	return (
		<View style={styles.container}>
			<View style={styles.top}>
				<Title title="User Profile" />
			</View>
			<View style={styles.bottom}>
				<View style={styles.detailsContainer}>
					<View>
						<Text style={styles.column}>User Name:</Text>
						<Text style={styles.column}>Email:</Text>
					</View>
					<View>
						<Text style={styles.details}>Kai</Text>
						<Text style={styles.details}>kaichun.yu@griffithuni.edu.au</Text>
					</View>
				</View>

				<View style={styles.buttonPanel}>
					<ImageButton buttonname="Update" iconname="construct" action />

					<ImageButton buttonname="Sign Out" iconname="log-out" action />
				</View>
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
	},
	bottom: {
		height: "88%",
		marginHorizontal: 20,
		padding: 10,
		width: 360,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
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

	buttonPanel: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		width: 360,
    padding: 8,
    margin: 10,
	},
});
