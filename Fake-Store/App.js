import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Category } from "./src/UI/screens/ProductStack/Category";
import { ProductList } from "./src/UI/screens/ProductStack/ProductList";
import { ProductDetail } from "./src/UI/screens/ProductStack/ProductDetail";
import { ShoppingCart } from "./src/UI/screens/ShoppingCart";
import { Ionicons } from "@expo/vector-icons";
import store from "./src/datamodel/redux/Store";
import { Provider } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { MyOrders } from "./src/UI/screens/MyOrders";
import { UserProfile } from "./src/UI/screens/UserStack/UserProfile";
import { SignIn } from "./src/UI/screens/UserStack/SignIn";
import { SignUp } from "./src/UI/screens/UserStack/SignUp";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { calculateTotals } from "./src/datamodel/redux/CartSlice";
import { updateCart } from "./src/service/cartService";
import { calculateOrderTotals } from "./src/datamodel/redux/OrderSlice";
const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<TabStack />
			</NavigationContainer>
		</Provider>
	);
}

export const TabStack = () => {
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart.cart);
	const order = useSelector((state) => state.order.order);
	const token = useSelector((state) => state.auth.userInfo.token);
	useEffect(() => {
		dispatch(calculateTotals());
		dispatch(calculateOrderTotals());
		updateCart(token, cart);
	}, [cart, order]);

	const totalQuantity = useSelector((state) => state.cart.totalQuantity);
	const orderBadge = useSelector((state) => state.order.myOrders[0].totalQty);
	const authGuard = (name, { navigation }) => ({
		tabPress: (e) => {
			e.preventDefault();
			if (token) {
				navigation.navigate(name);
			} else {
				Alert.alert("Not Logged In", "You must log in to view this tab.");
			}
		},
	});
	return (
		<Tabs.Navigator initialRouteName="UserProfile">
			<Tabs.Screen
				name="ProductStack"
				component={ProductStack}
				options={{
					headerShown: false,
					tabBarLabel: "Products",
					tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
					tabBarIcon: ({}) => <Ionicons name="home" size={30} color="black" />,
				}}
				listeners={authGuard.bind(null, "ProductStack")}
			/>
			<Tabs.Screen
				name="ShoppingCart"
				component={ShoppingCart}
				options={{
					headerShown: false,
					tabBarLabel: "My Cart",
					tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
					tabBarIcon: ({}) => <Ionicons name="cart" size={30} color="black" />,
					tabBarBadge: totalQuantity > 0 ? totalQuantity : null,
				}}
				listeners={authGuard.bind(null, "ShoppingCart")}
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
					tabBarBadge: orderBadge > 0 ? orderBadge : null,
				}}
				listeners={authGuard.bind(null, "MyOrders")}
			/>
			<Tabs.Screen
				name="UserProfile"
				component={UserStack}
				options={{
					headerShown: false,
					tabBarLabel: "User Profile",
					tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
					tabBarIcon: ({}) => (
						<Ionicons name="person-circle" size={30} color="black" />
					),
				}}
			/>
		</Tabs.Navigator>
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

export const UserStack = () => {
	return (
		<Stack.Navigator initialRouteName="SignIn">
			<Stack.Screen
				name="SignIn"
				component={SignIn}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="SignUp"
				component={SignUp}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="User"
				component={UserProfile}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
};
