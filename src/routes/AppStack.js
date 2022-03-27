import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import AppTabNavigator from "./AppTabNavigator";
import SettingsScreen from "../screens/SettingsScreen";
import useThemePreference from "../hooks/useThemePreference";
import { DarkTheme, LightTheme } from "../assets/Colors";
import { headerTitleStyle } from "../assets/Styles";
import PizzaSelectionDetailsScreen from "../screens/PizzaSelectionDetailsScreen";
import ConfigurePizzaScreen from "../screens/ConfigurePizzaScreen";
import CheckoutScreen from "../screens/CheckoutScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";

const Stack = createStackNavigator();

const AppStack = () => {
  const { themePreference } = useThemePreference();

  return (
    <NavigationContainer
      theme={themePreference === "dark" ? DarkTheme : LightTheme}>
      <StatusBar style={themePreference === "dark" ? "light" : "dark"} />
      <Stack.Navigator
        screenOptions={{
          headerTitleStyle: headerTitleStyle,
          headerBackTitle: " ",
        }}>
        <Stack.Screen
          name="AppTabs"
          component={AppTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Group>
        <Stack.Screen
          name="PizzaSelectionDetails"
          component={PizzaSelectionDetailsScreen}
          options={{ headerTitle: "Pizza Details" }}
        />
        <Stack.Screen
          name="ConfigurePizza"
          component={ConfigurePizzaScreen}
          options={{ headerTitle: "Pizza Configuration" }}
        />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
