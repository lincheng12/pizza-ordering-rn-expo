import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import AppTabNavigator from "./AppTabNavigator";
import SettingsScreen from "../screens/SettingsScreen";
import useThemePreference from "../hooks/useThemePreference";
import { DarkTheme, LightTheme } from "../assets/Colors";
import { headerTitleStyle } from "../assets/Styles";

const Stack = createStackNavigator();

const AppStack = () => {
  const { themePreference } = useThemePreference();

  return (
    <NavigationContainer
      theme={themePreference === "dark" ? DarkTheme : LightTheme}>
      <StatusBar style={themePreference === "dark" ? "light" : "dark"} />
      <Stack.Navigator>
        <Stack.Screen
          name="AppTabs"
          component={AppTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            headerTitleStyle: headerTitleStyle,
            headerBackTitle: "Back",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
