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
import { useSelector, useDispatch } from "react-redux";
import { logIn } from "../store/AuthSlice";
import { fillOrder } from "../store/OrderSlice";
import { fetchOrder } from "../service/orderService";
import { fetchCart } from "../service/cartService";
import { fillCart } from "../store/CartSlice";

export const SignIn = () => {
	const navigation = useNavigation();

	const [email, setEmail] = useState("kai@kai.com");
	const [password, setPassword] = useState("123");

	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.auth.userInfo);

	useEffect(() => {
		const fetchOrders = async () => {
			const orderRes = await fetchOrder(userInfo.token);
			dispatch(fillOrder(orderRes.orders[0]));
		};
		const fetchCartItems = async () => {
			const cartRes = await fetchCart(userInfo.token);
			dispatch(fillCart(cartRes.items));
		};
		if (userInfo.token) {
			fetchOrders();
			fetchCartItems();
		}
	}, [userInfo]);

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
		<View style={styles.container}>
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
						onPress={goToSignUpHander}
					>
						<Text style={styles.button}> Sign up</Text>
					</Pressable>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
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
