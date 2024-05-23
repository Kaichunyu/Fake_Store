import { View, StyleSheet, Text, TextInput, Alert } from "react-native";
import { Title } from "../components/Title";
import { ImageButton } from "../components/ImageButton";
import { useEffect, useState } from "react";
import { updateUserProfile } from "../service/authService";
import { useSelector, useDispatch } from "react-redux";
import { logOut, updateName } from "../store/AuthSlice";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { clearCart } from "../store/CartSlice";
import { clearOrder } from "../store/OrderSlice";

export const UserProfile = () => {
	const [onUpdate, setOnUpdate] = useState(false);
	const userInfo = useSelector((state) => state.auth.userInfo);
	const orders = useSelector((state) => state.order.order);
	const cart = useSelector((state)=> state.cart.cart)
	const [userName, setUserName] = useState(userInfo.name);
	const [password, setPassword] = useState(userInfo.password);
	const isFocused = useIsFocused();

	const navigation = useNavigation();

	useEffect(() => {
		if (userInfo.name === undefined) {
			navigation.navigate("SignIn");
		}
	}, [isFocused]);

	const dispatch = useDispatch();

	const updateHandler = () => {
		setOnUpdate(!onUpdate);
	};

	const signOutHandler = () => {
		dispatch(logOut());
		dispatch(clearCart());
		dispatch(clearOrder());
		navigation.navigate("SignIn");
	};

	const confirmHandler = async () => {
		const res = await updateUserProfile(userInfo.token, userName, password);
		if (res.status === "error") {
			return;
		} else {
			dispatch(updateName(res));
			setOnUpdate(!onUpdate);
		}
		console.log(res);
		Alert.alert(res.message);
	};

	const cancelHandler = () => {
		setOnUpdate(!onUpdate);
	};

	return (
		<View style={styles.container}>
			<View style={styles.top}>
				{ console.log(userInfo, orders, cart)}
				<Title title="User Profile" />
			</View>
			<View style={styles.bottom}>
				{onUpdate === false ? (
					<View>
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
								value={userName}
								onChangeText={setUserName}
							/>
							<Text style={styles.text}>New Password</Text>
							<TextInput
								style={styles.inputBox}
								value={password}
								onChangeText={setPassword}
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
