import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Category } from "./src/screens/Category";
import { ProductList } from "./src/screens/ProductList";
import { ProductDetail } from "./src/screens/ProductDetail";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Category">
        <Stack.Screen name="Category" component={Category} />
        <Stack.Screen name="ProductList" component={ProductList} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}



