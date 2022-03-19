import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useThemePreference from "../hooks/useThemePreference";
import { useTheme } from "@react-navigation/native";
import AppView from "../components/AppView";
import AppText from "../components/AppText";
import { sWidth } from "../assets/Styles";
import { Circle } from "react-native-animated-spinkit";

const themePickerOption = [
  {
    label: "Use Device Theme",
    value: "device",
  },
  {
    label: "Use Light Theme",
    value: "light",
  },
  {
    label: "Use Dark Theme",
    value: "dark",
  },
];

const SettingsScreen = () => {
  const {
    themePreference,
    themeName,
    updateGlobalThemePreference,
    loadingTheme,
  } = useThemePreference();
  const [localThemeValue, setLocalThemeValue] = useState(themeName);
  const { colors } = useTheme();

  const storeThemeValue = async (value) => {
    try {
      await AsyncStorage.setItem("@theme_preference", value);
      setLocalThemeValue(value);
      updateGlobalThemePreference(value);
    } catch (err) {
      console.log("async storage saving: ", err);
    }
  };

  return (
    <>
      {loadingTheme ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Circle size={48} color={colors.text} />
          <AppText style={{ marginTop: 10 }}>Changing your theme</AppText>
        </View>
      ) : (
        <AppView>
          <View style={styles.changeThemeContainer}>
            <AppText style={styles.changeThemeHeader}>
              Change your color theme:
            </AppText>
            <RNPickerSelect
              useNativeAndroidPickerStyle={false}
              value={localThemeValue}
              style={
                themePreference === "dark"
                  ? pickerSelectDarkStyles
                  : pickerSelectLightStyles
              }
              onValueChange={(value) => storeThemeValue(value)}
              items={themePickerOption}
            />
            <AppText
              style={[styles.changeThemeFooter, { fontSize: sWidth / 30 }]}>
              If device is selected, the app will automatically adjust your
              appearance based on your device's system settings.
            </AppText>
          </View>
        </AppView>
      )}
    </>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  changeThemeContainer: {
    paddingHorizontal: 4,
  },
  changeThemeHeader: {
    paddingLeft: 3,
    fontWeight: "bold",
    fontSize: 17,
    marginVertical: 6,
  },
  changeThemeFooter: {
    padding: 10,
  },
});

const pickerSelectDarkStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 15,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    color: "white",
    fontWeight: "bold",
    paddingLeft: -5, // to ensure the text is never behind the icon
  },
  inputIOSContainer: {
    backgroundColor: "#2C3333", //colors.card
    borderRadius: 8,
  },
  inputAndroid: {
    fontSize: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    fontWeight: "bold",
    color: "white",
    //paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroidContainer: {
    backgroundColor: "#2C3333", //colors.card
    borderRadius: 8,
  },
});

const pickerSelectLightStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 15,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    color: "rgb(28, 28, 30)", //colors.text
    fontWeight: "bold",
    paddingLeft: -5, // to ensure the text is never behind the icon
  },
  inputIOSContainer: {
    backgroundColor: "rgb(255, 255, 255)", //colors.card
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  inputAndroid: {
    fontSize: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    fontWeight: "bold",
    color: "rgb(28, 28, 30)", //colors.text
    //paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroidContainer: {
    backgroundColor: "rgb(255, 255, 255)", //colors.card
    borderRadius: 8,
  },
});
