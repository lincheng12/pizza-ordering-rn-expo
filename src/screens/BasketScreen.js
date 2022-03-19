import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppView from "../components/AppView";
import AppText from "../components/AppText";

const BasketScreen = () => {
  return (
    <AppView style={styles.container}>
      <AppText>BasketScreen</AppText>
    </AppView>
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
