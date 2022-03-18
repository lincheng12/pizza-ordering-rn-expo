import React from "react";
import { useColorScheme } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import AppTabNavigator from "./AppTabNavigator";
import SettingsScreen from "../screens/SettingsScreen";

const Stack = createStackNavigator();

const AppStack = () => {
  const scheme = useColorScheme();
  let theme = "light";

  return (
    <NavigationContainer theme={theme === "dark" ? DarkTheme : DefaultTheme}>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
      <Stack.Navigator>
        <Stack.Screen
          name="AppTabs"
          component={AppTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
