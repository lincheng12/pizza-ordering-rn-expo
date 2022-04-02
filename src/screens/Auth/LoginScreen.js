import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Platform,
  TouchableOpacity,
  Pressable,
  Keyboard,
  Alert,
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
import AppText from "../../components/AppText";
import useThemePreference from "../../hooks/useThemePreference";
import { auth } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { getUserById } from "../../redux/slices/userSlice";
import { TextInput } from "react-native-paper";
import PaperTextInput from "../../components/PaperTextInput";
import { Controller, useForm } from "react-hook-form";

const LoginScreen = () => {
  const nav = useNavigation();
  const dispatch = useDispatch();
  const { themePreference } = useThemePreference();
  const { colors } = useTheme();
  const insects = useSafeAreaInsets();
  const [passVisible, setPassVisible] = useState(true);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  let [fontsLoaded] = useFonts({
    Lobster_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const onSubmit = async ({ email, password }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch(getUserById(userCredential.user.uid));
      nav.goBack();
    } catch (err) {
      Alert.alert(err.message);
    }
  };

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
                marginBottom: scale(20),
                marginTop: scale(-20),
                width: "100%",
              }}>
              <Controller
                control={control}
                rules={{
                  required: "Field cannot be empty",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Not a valid email format",
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <PaperTextInput
                    label="Email"
                    placeholder="test@email.com"
                    value={value.trim()}
                    onChangeText={onChange}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={{ backgroundColor: "transparent", marginBottom: 0 }}
                  />
                )}
                name="email"
              />
              {errors.email && (
                <Text style={styles.error}>{errors.email.message}</Text>
              )}
              <Controller
                control={control}
                rules={{
                  required: "Field cannot be empty",
                }}
                render={({ field: { onChange, value } }) => (
                  <PaperTextInput
                    label="Password"
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry={passVisible}
                    maxLength={8}
                    right={
                      <TextInput.Icon
                        name={passVisible ? "eye" : "eye-off"}
                        onPress={() => setPassVisible(!passVisible)}
                        color="#aaa"
                      />
                    }
                    style={{ backgroundColor: "transparent", marginBottom: 0 }}
                  />
                )}
                name="password"
              />
              {errors.password && (
                <Text style={styles.error}>{errors.password.message}</Text>
              )}
            </View>
            <AppButton
              buttonContainerStyle={{
                position: "absolute",
                bottom: scale(35),
                width: moderateScale(200),
              }}
              bgColor={colors.primary}
              btnText="Login"
              onPress={handleSubmit(onSubmit)}
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
  error: {
    color: "red",
    marginLeft: scale(3),
  },
});
