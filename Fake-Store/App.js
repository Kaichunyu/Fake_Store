import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Category } from "./src/screens/Category";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Category">
      <Stack.Screen name="Category" component={Category}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
}



