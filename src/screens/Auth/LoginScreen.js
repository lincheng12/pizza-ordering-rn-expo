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
import AppLoading from "expo-app-loading";
import { useFonts, Lobster_400Regular } from "@expo-google-fonts/lobster";
import { FloatingLabelInput } from "react-native-floating-label-input";
import { Ionicons } from "@expo/vector-icons";
import AppText from "../../components/AppText";
import useThemePreference from "../../hooks/useThemePreference";

const LoginScreen = () => {
  const nav = useNavigation();
  const { themePreference } = useThemePreference();
  const { colors } = useTheme();
  const insects = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
          source={
            themePreference === "dark"
              ? require("../../assets/pizza_light.jpg")
              : require("../../assets/background.jpg")
          }>
          <View style={{ position: "absolute", top: scale(65) }}>
            <AppText
              style={[
                {
                  color: colors.card,
                  fontSize: scale(40),
                  fontFamily: "Lobster_400Regular",
                },
                shadowStyle,
              ]}>
              Mar's Pizzeria
            </AppText>
          </View>
          <View
            style={[
              {
                backgroundColor: colors.card,
                opacity: 0.9,
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
              <AppText style={{ fontSize: scale(18), fontWeight: "bold" }}>
                Your account information:
              </AppText>
            </View>
            <View
              style={{
                marginBottom: scale(15),
                marginTop: scale(-20),
                width: "100%",
              }}>
              <FloatingLabelInput
                label="Email"
                keyboardType="email-address"
                value={email}
                animationDuration={120}
                leftComponent={
                  <Ionicons name="ios-person-outline" size={24} color="gray" />
                }
                containerStyles={styles.outerInputContainer}
                customLabelStyles={{
                  colorFocused: colors.primary,
                  fontSizeFocused: scale(12),
                  colorBlurred: "gray",
                  fontSizeBlurred: scale(14),
                }}
                labelStyles={styles.labelContainerStyle}
                inputStyles={{
                  color: colors.text,
                  paddingHorizontal: scale(10),
                  paddingVertical: scale(8),
                }}
                onChangeText={setEmail}
              />
              <FloatingLabelInput
                label="Password"
                value={password}
                animationDuration={120}
                maxLength={8}
                showCountdown
                showCountdownStyles={{
                  color: colors.text,
                  position: "absolute",
                  bottom: scale(-14),
                }}
                leftComponent={
                  <Ionicons name="key-outline" size={24} color="gray" />
                }
                customShowPasswordComponent={
                  <Ionicons name="eye-outline" size={24} color="gray" />
                }
                customHidePasswordComponent={
                  <Ionicons name="eye-off-outline" size={24} color="gray" />
                }
                isPassword={true}
                containerStyles={styles.outerInputContainer}
                customLabelStyles={{
                  colorFocused: colors.primary,
                  fontSizeFocused: scale(12),
                  colorBlurred: "gray",
                  fontSizeBlurred: scale(14),
                }}
                labelStyles={styles.labelContainerStyle}
                inputStyles={{
                  color: colors.text,
                  paddingHorizontal: scale(10),
                  paddingVertical: scale(8),
                }}
                onChangeText={setPassword}
              />
            </View>
            <AppButton
              buttonContainerStyle={{
                position: "absolute",
                bottom: scale(35),
                width: moderateScale(200),
                opacity: 1,
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
  outerInputContainer: {
    borderBottomWidth: 2,
    paddingHorizontal: scale(3),
    borderColor: "gray",
    marginVertical: Platform.OS === "android" ? scale(6) : scale(12),
  },
  labelContainerStyle: {
    paddingHorizontal: scale(5),
  },
  inputStyle: {
    color: "black",
    paddingHorizontal: scale(10),
    paddingVertical: scale(8),
  },
});
