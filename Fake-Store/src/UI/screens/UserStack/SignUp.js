import { View, StyleSheet } from "react-native";
import { SignUpForm } from "../../components/User/Form/SignUpForm";

export const SignUp = () => {
	return (
		<View style={styles.container}>
			<SignUpForm />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
