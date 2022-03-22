import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useThemePreference from "../hooks/useThemePreference";
import { useTheme } from "@react-navigation/native";
import AppView from "../components/AppView";
import AppText from "../components/AppText";
import { moderateScale, scale, sWidth } from "../assets/Styles";
import { RadioButton } from "react-native-paper";

const SettingsScreen = () => {
  const { themeName, updateGlobalThemePreference } = useThemePreference();
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
    <AppView style={{ flex: 1 }}>
      <View>
        <AppText style={styles.changeThemeHeader}>
          Change your color theme:
        </AppText>
        <RadioButton.Group
          value={localThemeValue}
          onValueChange={(value) => storeThemeValue(value)}>
          <RadioButton.Item
            mode="ios"
            style={[
              styles.radioItemStyle,
              {
                backgroundColor: colors.card,
                borderColor: colors.background,
              },
            ]}
            labelStyle={{ color: colors.text }}
            uncheckedColor={colors.card}
            color={colors.primary}
            label="Light"
            value="light"
          />
          <RadioButton.Item
            mode="ios"
            style={[
              styles.radioItemStyle,
              {
                backgroundColor: colors.card,
                borderColor: colors.background,
              },
            ]}
            labelStyle={{ color: colors.text }}
            uncheckedColor={colors.card}
            color={colors.primary}
            label="Dark"
            value="dark"
          />
          <RadioButton.Item
            mode="ios"
            style={[
              styles.radioItemStyle,
              {
                backgroundColor: colors.card,
                borderColor: colors.background,
              },
            ]}
            labelStyle={{ color: colors.text }}
            uncheckedColor={colors.card}
            color={colors.primary}
            label="Device"
            value="device"
          />
        </RadioButton.Group>
        <AppText style={[styles.changeThemeFooter, { fontSize: sWidth / 30 }]}>
          If device is selected, the app will automatically adjust your
          appearance based on your device's system settings.
        </AppText>
      </View>
    </AppView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  changeThemeHeader: {
    paddingLeft: scale(10),
    fontWeight: "bold",
    fontSize: moderateScale(17),
    marginVertical: scale(6),
  },
  changeThemeFooter: {
    padding: scale(10),
    marginLeft: scale(5),
  },
  radioItemStyle: {
    borderBottomWidth: 1,
    width: "95%",
    alignSelf: "center",
    borderRadius: 10,
  },
});
