import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import AppView from "../components/AppView";
import AppText from "../components/AppText";
import { useNavigation } from "@react-navigation/native";
import { selectUser } from "../redux/slices/userSlice";
import { useSelector } from "react-redux";

const EditInformationScreen = ({ route }) => {
  const { type } = route.params;
  const nav = useNavigation();
  const userProfile = useSelector(selectUser);

  useLayoutEffect(() => {
    // Customizing the top header
    nav.setOptions({
      headerTitle: displayHeaderTitle(),
    });
  }, []);

  const displayHeaderTitle = () => {
    switch (type) {
      case "profile":
        return "Personal Information";
      case "address":
        return "Saved Address";
      case "payment":
        return "Payment Method";
      case "rewards":
        return "Rewards";
    }
  };

  return (
    <AppView style={{ flex: 1 }}>
      <AppText>EditInformationScreen</AppText>
    </AppView>
  );
};

export default EditInformationScreen;

const styles = StyleSheet.create({});
