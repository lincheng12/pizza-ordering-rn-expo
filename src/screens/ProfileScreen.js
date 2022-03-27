import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import AppView from "../components/AppView";
import AppText from "../components/AppText";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import { useNavigation, useTheme } from "@react-navigation/native";
import { moderateScale, scale, shadowStyle } from "../assets/Styles";
import AppButton from "../components/AppButton";

const ProfileScreen = () => {
  const { colors } = useTheme();
  const nav = useNavigation();
  const userProfile = useSelector(selectUser);

  return (
    <AppView style={{ flex: 1 }}>
      {userProfile === null ? (
        <View style={styles.container}>
          <AppText
            style={{ fontSize: moderateScale(17.5), marginBottom: scale(8) }}>
            You're not signed in.
          </AppText>
          <AppButton
            onPress={() => nav.navigate("Login")}
            buttonContainerStyle={{ width: moderateScale(180) }}
            bgColor={colors.primary}
            btnText="Click to sign in"
          />
        </View>
      ) : (
        <AppText>Welcome</AppText>
      )}
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
