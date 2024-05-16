import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Category } from "./src/screens/Category";
import { ProductList } from "./src/screens/ProductList";
import { ProductDetail } from "./src/screens/ProductDetail";
import { ShoppingCart } from "./src/screens/ShoppingCart";
import { Ionicons } from "@expo/vector-icons";
import store from "./src/store/Store";
import { Provider } from "react-redux";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { MyOrders } from "./src/screens/MyOrders";
import { UserProfile } from "./src/screens/UserProfile";
import { signinUser } from "./src/service/authService";
import { SignIn } from "./src/screens/SignIn";
import { SignUp } from "./src/screens/SignUp";

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
	// const [content, setContent] = useState({ title: "Unknown", message: "N/A" });
	// useEffect(() => {
	// 	const fetchPage = async () => {
	// 		const res = await fetchWelcomePage();
	// 		setContent(res);
	// 	};
	// 	fetchPage();
	// }, []);
	return (
		<Provider store={store}>
			<TabStack />
		</Provider>
	);
}

export const TabStack = () => {
	const totalQuantity = useSelector((state) => state.cart.totalQuantity);
	return (
		<NavigationContainer>
			<Tabs.Navigator>
				<Tabs.Screen
					name="Home"
					component={ProductStack}
					options={{
						headerShown: false,
						tabBarLabel: "Products",
						tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
						tabBarIcon: ({}) => (
							<Ionicons name="home" size={30} color="black" />
						),
					}}
				/>
				<Tabs.Screen
					name="ShoppingCart"
					component={ShoppingCart}
					options={{
						headerShown: false,
						tabBarLabel: "My Cart",
						tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
						tabBarIcon: ({}) => (
							<Ionicons name="cart" size={30} color="black" />
						),
						tabBarBadge: totalQuantity > 0 ? totalQuantity : null,
					}}
				/>
				<Tabs.Screen
					name="MyOrders"
					component={MyOrders}
					options={{
						headerShown: false,
						tabBarLabel: "My Orders",
						tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
						tabBarIcon: ({}) => (
							<Ionicons name="receipt" size={30} color="black" />
						),
						tabBarBadge: totalQuantity > 0 ? totalQuantity : null,
					}} />
				<Tabs.Screen
					name="UserProfile"
					component={UserProfile}
					options={{
						headerShown: false,
						tabBarLabel: "User Profile",
						tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
						tabBarIcon: ({}) => (
							<Ionicons name="person-circle" size={30} color="black" />
						),
					}} 
				/>
								<Tabs.Screen
					name="SignIn"
					component={SignIn}
					options={{
						headerShown: false,
						tabBarLabel: "Sign In",
						tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
						tabBarIcon: ({}) => (
							<Ionicons name="person-circle" size={30} color="black" />
						),
					}} 
				/>
								<Tabs.Screen
					name="SignUp"
					component={SignUp}
					options={{
						headerShown: false,
						tabBarLabel: "Sign Up",
						tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
						tabBarIcon: ({}) => (
							<Ionicons name="person-circle" size={30} color="black" />
						),
					}} 
				/>
			</Tabs.Navigator>
		</NavigationContainer>
	);
};

export const ProductStack = () => {
	return (
		<Stack.Navigator initialRouteName="Category">
			<Stack.Screen
				name="Category"
				component={Category}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="ProductList"
				component={ProductList}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="ProductDetail"
				component={ProductDetail}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
};
