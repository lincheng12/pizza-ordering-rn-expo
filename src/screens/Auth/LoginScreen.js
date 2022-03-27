import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Platform,
  TouchableOpacity,
  Pressable,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import AppButton from "../../components/AppButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  moderateScale,
  scale,
  shadowStyle,
  sHeight,
  verticalScale,
} from "../../assets/Styles";
import TextInputWithIcon from "../../components/TextInputWithIcon";
import AppLoading from "expo-app-loading";
import { useFonts, Lobster_400Regular } from "@expo-google-fonts/lobster";

const LoginScreen = () => {
  const nav = useNavigation();
  const { colors } = useTheme();
  const insects = useSafeAreaInsets();
  let [fontsLoaded] = useFonts({
    Lobster_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Pressable style={{ height: sHeight }} onPress={() => Keyboard.dismiss()}>
      <View
        style={{
          flex: 1,
          paddingTop: Platform.OS === "android" ? insects.top : 0,
        }}>
        <ImageBackground
          blurRadius={8}
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
          source={require("../../assets/background.jpg")}>
          <View style={{ position: "absolute", top: scale(65) }}>
            <Text
              style={{
                color: "white",
                fontSize: scale(40),
                fontFamily: "Lobster_400Regular",
              }}>
              Mar's Pizzeria
            </Text>
          </View>
          <View
            style={[
              {
                backgroundColor: "whitesmoke",
                width: "80%",
                height: verticalScale(300),
                borderRadius: 10,
                padding: scale(15),
                alignItems: "center",
                justifyContent: "center",
                marginTop: scale(-75),
                position: "relative",
              },
              shadowStyle,
            ]}>
            <View style={{ position: "absolute", top: scale(35) }}>
              <Text style={{ fontSize: scale(18), fontWeight: "bold" }}>
                Your account information:
              </Text>
            </View>
            <View style={{ marginBottom: scale(15), marginTop: scale(-20) }}>
              <TextInputWithIcon
                iconName="ios-person-outline"
                focused={colors.primary}
                blur="gray"
                blurIcon="gray"
                placeholderColor="gray"
                placeholderText="Email"
                keyboardType="email-address"
              />
            </View>
            <View style={{ marginBottom: scale(10) }}>
              <TextInputWithIcon
                iconName="key-outline"
                focused={colors.primary}
                blur="gray"
                blurIcon="gray"
                placeholderColor="gray"
                placeholderText="Password"
                thirdIcon
                thirdIconColor="black"
                secureTextEntry
              />
            </View>
            <AppButton
              buttonContainerStyle={{
                position: "absolute",
                bottom: scale(35),
                width: moderateScale(200),
              }}
              bgColor={colors.primary}
              btnText="Login"
              // onPress={() => nav.navigate("Register")}
            />
          </View>
          <TouchableOpacity
            onPress={() => nav.navigate("Register")}
            style={[{ position: "absolute", bottom: scale(150) }, shadowStyle]}>
            <Text
              style={{
                color: "white",
                fontSize: scale(16),
                fontWeight: "bold",
              }}>
              New user? Click to sign up
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </Pressable>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  textInputContainer: {
    flexDirection: "row",
    width: "100%",
    height: 40,
    borderBottomWidth: 2,
    paddingHorizontal: scale(3),
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    width: "100%",
    height: "100%",
    fontSize: moderateScale(16),
    justifyContent: "center",
    paddingLeft: scale(5),
  },
});
