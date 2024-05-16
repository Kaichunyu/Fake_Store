import { View, StyleSheet, Text, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { ImageButton } from "../components/ImageButton";

export const SignUp = () => {
  const [userName, setUserName] = useState("")
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

  const clearHander = () => {
    setUserName("")
		setEmail("");
		setPassword("");
	};

	const signUpHander = () => {
		console.log("sign Up");
  };
  
  const signInHander = () => {
    console.log("signIn")
  }

	return (
		<View style={styles.contain}>
			<View style={styles.signInForm}>
        <Text style={styles.title}>Sign up a new user</Text>
        <Text style={styles.text}>User Name</Text>
				<TextInput
					style={styles.inputBox}
					value={userName}
					onChangeText={setUserName}
				/>
				<Text style={styles.text}>Email</Text>
				<TextInput
					style={styles.inputBox}
					value={email}
					onChangeText={setEmail}
				/>
				<Text style={styles.text}>Password</Text>
				<TextInput
					style={styles.inputBox}
					value={password}
					onChangeText={setPassword}
					secureTextEntry={true}
				/>
				<View style={styles.buttonPanel}>
					<ImageButton
						buttonname="Clear"
						iconname="trash"
						action={clearHander}
					/>
					<ImageButton
						buttonname="Sign Up"
						iconname="log-in"
						action={signUpHander}
					/>
				</View>
				<View style={styles.signIn}>
					<Pressable onPress={signInHander}>
						<Text style={styles.text}>Switch to: Sign In</Text>
					</Pressable>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	contain: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	signInForm: {
		backgroundColor: "#8F94FB",
		width: 400,
		height: 400,
		borderRadius: 10,
		// padding: 10,
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
	buttonPanel: {
		flexDirection: "row",
		justifyContent: "space-around",
		padding: 8,
		margin: 10,
	},
	signIn: {
		justifyContent: "center",
		alignItems: "center",
	},
});
