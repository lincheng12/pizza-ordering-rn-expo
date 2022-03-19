import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppView from "../components/AppView";
import AppText from "../components/AppText";

const ProfileScreen = () => {
  return (
    <AppView style={styles.container}>
      <AppText>ProfileScreen</AppText>
    </AppView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
