import { StyleSheet, View, Text } from "react-native";

export const ShoppingCart = () => {
  return (
    <View style={styles.container}>
      <Text>This is empty.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
		flex: 1,
		flexDirection: "column",
		marginTop: 60,
	},
})