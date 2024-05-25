import { View, StyleSheet, Text } from "react-native";
import { ImageButton } from "../../ImageButton";
import { TInput } from "../../TInput";
import { useState } from "react";
import { useSelector } from "react-redux";

export const UpdateForm = ({ confirm, cancel }) => {
	const userInfo = useSelector((state) => state.auth.userInfo);

	const [userName, setUserName] = useState(userInfo.name);
	const [password, setPassword] = useState("");

	return (
		<View style={styles.updateForm}>
			<Text style={styles.title}>Update new username and password</Text>
			<TInput name="New Username" value={userName} onChange={setUserName} />
			<TInput
				name="New Password"
				value={password}
				onChange={setPassword}
				secure={true}
			/>
			<View style={styles.buttonPanel}>
				<ImageButton
					buttonname="Confirm"
					iconname="checkmark-sharp"
					action={confirm}
				/>
				<ImageButton
					buttonname="Cancel"
					iconname="close-sharp"
					action={cancel}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	updateForm: {
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

	buttonPanel: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		padding: 8,
		margin: 10,
	},
});
