import { View, StyleSheet, Text, Alert } from "react-native";
import { useState } from "react";
import { ImageButton } from "../../ImageButton";
import { useNavigation } from "@react-navigation/native";
import { signupUser } from "../../../../service/authService";
import { useDispatch } from "react-redux";
import { logIn } from "../../../../datamodel/redux/AuthSlice";
import { TInput } from "../../TInput";
import { NavigateButton } from "../../NavigateButton";

export const SignUpForm = () => {
	const navigation = useNavigation();
	const [userName, setUserName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();

	const clearHander = () => {
		setUserName("");
		setEmail("");
		setPassword("");
	};

	const signUpHander = async () => {
		const res = await signupUser(userName, email, password);
		if (res.status === "error") {
			Alert.alert(res.message);
		} else {
			dispatch(logIn(res));
			navigation.navigate("User");
		}

		console.log(res);
	};

	const goToSignInHander = () => {
		navigation.navigate("SignIn");
	};

	return (
		<View style={styles.signUpForm}>
			<Text style={styles.title}>Sign up a new user</Text>
			<TInput name="User Name" value={userName} onChange={setUserName} />
			<TInput name="Email" value={email} onChange={setEmail} />
			<TInput
				name="Password"
				value={password}
				onChange={setPassword}
				secure={true}
			/>
			<View style={styles.buttonPanel}>
				<ImageButton buttonname="Clear" iconname="trash" action={clearHander} />
				<ImageButton
					buttonname="Sign Up"
					iconname="log-in"
					action={signUpHander}
				/>
			</View>
			<NavigateButton navigation={goToSignInHander} name="Switch to: Sign In" />
		</View>
	);
};

const styles = StyleSheet.create({
	signUpForm: {
		backgroundColor: "#8F94FB",
		width: 400,
		height: 400,
		borderRadius: 10,
	},

	title: {
		fontSize: 20,
		color: "white",
		fontWeight: "bold",
		padding: 10,
		alignSelf: "center",
	},

	buttonPanel: {
		flexDirection: "row",
		justifyContent: "space-around",
		padding: 8,
		margin: 10,
	},
});
