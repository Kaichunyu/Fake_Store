import { View, StyleSheet, Text, Alert } from "react-native";
import { useState } from "react";
import { ImageButton } from "../../ImageButton";
import { useNavigation } from "@react-navigation/native";
import { signinUser } from "../../../../service/authService";
import { useDispatch } from "react-redux";
import { logIn } from "../../../../datamodel/redux/AuthSlice";
import { TInput } from "../../TInput";
import { NavigateButton } from "../../NavigateButton";

export const LogInForm = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const clearHander = () => {
		setEmail("");
		setPassword("");
	};

	const signInHander = async () => {
		const res = await signinUser(email, password);
		if (res.status === "error") {
			Alert.alert(res.message);
		}
		dispatch(logIn(res));
		navigation.navigate("User");
	};

	const goToSignUpHander = () => {
		navigation.navigate("SignUp");
	};

	return (
		<View style={styles.signInForm}>
			<Text style={styles.title}>Sign in with your email and password</Text>
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
					buttonname="Sign In"
					iconname="log-in"
					action={signInHander}
				/>
			</View>

			<NavigateButton navigation={goToSignUpHander} name="Switch to: Sign Up" />
		</View>
	);
};

const styles = StyleSheet.create({
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
		alignSelf: "center",
	},

	buttonPanel: {
		flexDirection: "row",
		justifyContent: "space-around",
		padding: 8,
		margin: 10,
	},
});
