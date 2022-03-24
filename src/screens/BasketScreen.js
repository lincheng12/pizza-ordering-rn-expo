import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppView from "../components/AppView";
import AppText from "../components/AppText";
import { useSelector } from "react-redux";
import { selectItems } from "../redux/slices/basketSlice";

const BasketScreen = () => {
  const pizzaItems = useSelector(selectItems);

  return (
    <AppView style={styles.container}>
      <AppText>{pizzaItems.length}</AppText>
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
