import {
	View,
	StyleSheet,
	Text,
	TextInput,
	Pressable,
	Alert,
} from "react-native";
import { useState } from "react";
import { ImageButton } from "../components/ImageButton";
import { useNavigation } from "@react-navigation/native";
import { signinUser } from "../service/authService";
import { useEffect } from "react";

export const SignIn = () => {
	const navigation = useNavigation();

	const [email, setEmail] = useState("kai@kai.com");
	const [password, setPassword] = useState("Aa12345678");

	const clearHander = () => {
		setEmail("");
		setPassword("");
	};

	const signInHander = async () => {
		const res = await signinUser(email, password);
		if (res.status === "error") {
			Alert.alert(res.message);
		}
		console.log(res);
	};

	const signUpHander = () => {
		navigation.navigate("SignUp");
	};

	return (
		<View style={styles.contain}>
			<View style={styles.signInForm}>
				<Text style={styles.title}>Sign In with your email and password</Text>
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
						buttonname="Sign In"
						iconname="log-in"
						action={signInHander}
					/>
				</View>
				<View style={styles.navigator}>
					<Text style={styles.text}>Switch to:</Text>
					<Pressable
						style={({ pressed }) => [
							{
								opacity: pressed ? 0.5 : 1.0,
							},
						]}
						onPress={signUpHander}
					>
						<Text style={styles.button}> Sign up</Text>
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
		height: 320,
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
