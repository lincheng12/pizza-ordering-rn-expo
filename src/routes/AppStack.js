import React, { useEffect } from "react";
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
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserById,
  selectLoading,
  selectUser,
} from "../redux/slices/userSlice";
import { auth } from "../../firebase";
import AppLoading from "expo-app-loading";
import EditInformationScreen from "../screens/EditInformationScreen";

const Stack = createStackNavigator();

const AppStack = () => {
  const { themePreference } = useThemePreference();
  const dispatch = useDispatch();
  const loadingState = useSelector(selectLoading);
  const localUserState = useSelector(selectUser);

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user && localUserState === null) {
          dispatch(getUserById(user.uid));
        }
      }),
    []
  );

  if (loadingState) <AppLoading />;

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
        <Stack.Group
          screenOptions={{
            presentation: "modal",
            headerTitleStyle: headerTitleStyle,
          }}>
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
        <Stack.Screen
          name="EditInformation"
          component={EditInformationScreen}
        />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
