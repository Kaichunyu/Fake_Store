import { View, StyleSheet, Text, TextInput, Alert } from "react-native";
import { Title } from "../components/Title";
import { ImageButton } from "../components/ImageButton";
import { useState } from "react";
import { updateUserProfile } from "../service/authService";

export const UserProfile = () => {
	const [newUserName, setNewUserName] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [update, setUpdate] = useState(false);

	const token = "a";
	// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEwLCJpYXQiOjE3MTU5MTkxODgsImV4cCI6MTcxNTkyMjc4OH0.WsotQB9HHt9REBIMA-sy5Tk8wY5jNyA7GHOwnowWfhY";

	const updateHandler = () => {
		setUpdate(!update);
	};

	const signOutHandler = () => {};

	const confirmHandler = async () => {
		const res = await updateUserProfile(token, newUserName, newPassword);
		if (res.status === "error") {
			Alert.alert(res.message);
		} else {
			console.log(res);
			setUpdate(!update);
		}
	};

	const cancelHandler = () => {
		setUpdate(!update);
	};
	return (
		<View style={styles.container}>
			<View style={styles.top}>
				<Title title="User Profile" />
			</View>
			<View style={styles.bottom}>
				{update === false ? (
					<View>
						<View style={styles.detailsContainer}>
							<View>
								<Text style={styles.column}>User Name:</Text>
								<Text style={styles.column}>Email:</Text>
							</View>
							<View>
								<Text style={styles.details}>kai</Text>
								<Text style={styles.details}>
									kaichun.yu@griffithuni.edu.au
								</Text>
							</View>
						</View>

						<View style={styles.buttonPanel}>
							<ImageButton
								buttonname="Update"
								iconname="construct"
								action={updateHandler}
							/>

							<ImageButton
								buttonname="Sign Out"
								iconname="log-out"
								action={signOutHandler}
							/>
						</View>
					</View>
				) : (
					<View style={styles.content}>
						<View style={styles.signInForm}>
							<Text style={styles.title}>Update new username and password</Text>
							<Text style={styles.text}>New Username</Text>
							<TextInput
								style={styles.inputBox}
								value={newUserName}
								onChangeText={setNewUserName}
							/>
							<Text style={styles.text}>New Password</Text>
							<TextInput
								style={styles.inputBox}
								value={newPassword}
								onChangeText={setNewPassword}
								secureTextEntry={true}
							/>
							<View style={styles.buttonPanel}>
								<ImageButton
									buttonname="Confirm"
									iconname="checkmark-sharp"
									action={confirmHandler}
								/>
								<ImageButton
									buttonname="Cancel"
									iconname="close-sharp"
									action={cancelHandler}
								/>
							</View>
						</View>
					</View>
				)}
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
	},
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

	buttonPanel: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		padding: 8,
		margin: 10,
	},

	signInForm: {
		backgroundColor: "#8F94FB",
		width: 400,
		height: 320,
		borderRadius: 10,
	},

	title: {
		fontSize: 20,
		color: "white",
		fontWeight: "bold",
		padding: 10,
	},

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
	content: {
		alignItems: "center",
	},
});
