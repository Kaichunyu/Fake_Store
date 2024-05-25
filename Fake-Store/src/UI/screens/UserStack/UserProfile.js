import { View, StyleSheet, Alert } from "react-native";
import { Title } from "../../components/Title";
import { ImageButton } from "../../components/ImageButton";
import { useEffect, useState } from "react";
import { updateUserProfile } from "../../../service/authService";
import { useSelector, useDispatch } from "react-redux";
import { logOut, updateName } from "../../../datamodel/redux/AuthSlice";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { clearCart } from "../../../datamodel/redux/CartSlice";
import { clearOrder } from "../../../datamodel/redux/OrderSlice";
import { UpdateForm } from "../../components/User/Form/UpdateForm";
import { UserDetails } from "../../components/User/UserDetails";

export const UserProfile = () => {
	const [onUpdate, setOnUpdate] = useState(false);
	const userInfo = useSelector((state) => state.auth.userInfo);
	const isFocused = useIsFocused();
	const navigation = useNavigation();
	const dispatch = useDispatch();

	useEffect(() => {
		if (userInfo.name === undefined) {
			navigation.navigate("SignIn");
		}
	}, [isFocused]);

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
			Alert.alert(res.message);
			return;
		} else {
			dispatch(updateName(res));
			setOnUpdate(!onUpdate);
			setPassword("");
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
				{console.log(userInfo)}
				<Title title="User Profile" />
			</View>
			<View style={styles.bottom}>
				{onUpdate === false ? (
					<View>
						<UserDetails />
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
						<UpdateForm confirm={confirmHandler} cancel={cancelHandler} />
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
	buttonPanel: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		padding: 8,
		margin: 10,
	},
	content: {
		alignItems: "center",
	},
});
