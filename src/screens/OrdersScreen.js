import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppView from "../components/AppView";
import AppText from "../components/AppText";

const OrdersScreen = () => {
  return (
    <AppView style={styles.container}>
      <AppText>OrdersScreen</AppText>
    </AppView>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
