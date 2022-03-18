import { StyleSheet, Text, View } from "react-native";
import React from "react";

const BasketScreen = () => {
  return (
    <View style={styles.container}>
      <Text>BasketScreen</Text>
    </View>
  );
};

export default BasketScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
