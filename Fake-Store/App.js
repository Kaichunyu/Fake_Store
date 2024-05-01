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
import { useSelector, useDispatch } from "react-redux";
import {
	increment,
	decrement,
	incrementByValue,
	incrementAsync,
	selectCount,
} from "./src/store/CartSlice";

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
	return (
		<Provider store={store}>
			<TabStack />
		</Provider>
	);
}

export const TabStack = () => {
	// const count = useSelector(selectCount);
	return (
		<NavigationContainer>
			<Tabs.Navigator>
				<Tabs.Screen
					name="Home"
					component={HomeStack}
					options={{
						headerShown: false,
						tabBarLabel: "Home",
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
						tabBarLabel: "Cart",
						tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
						tabBarIcon: ({}) => (
							<Ionicons name="cart" size={30} color="black" />
						),
						// tabBarBadge: count,
					}}
				/>
			</Tabs.Navigator>
		</NavigationContainer>
	);
};

export const HomeStack = () => {
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
