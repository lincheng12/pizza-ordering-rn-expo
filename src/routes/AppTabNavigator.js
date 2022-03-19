import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import BasketScreen from "../screens/BasketScreen";
import HomeScreen from "../screens/HomeScreen";
import OrdersScreen from "../screens/OrdersScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "@react-navigation/native";
import { headerTitleStyle } from "../assets/Styles";

const BottomTabs = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  const { colors } = useTheme();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={HomeScreen}
        options={{
          headerTitle: "Home",
          headerTitleStyle: headerTitleStyle,
          headerTitleAlign: "left",
          headerLeft: () => (
            <TouchableOpacity>
              <View style={{ marginLeft: 15, marginRight: -10 }}>
                <Ionicons name="location" size={23} color={colors.text} />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <Image
              style={{ width: 28, height: 28, marginRight: 15 }}
              source={require("../assets/pizza.png")}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const OrdersStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerTitle: "Orders",
      headerTitleAlign: "left",
      headerTitleStyle: headerTitleStyle,
    }}>
    <Stack.Screen name="UserOrders" component={OrdersScreen} />
  </Stack.Navigator>
);

const BasketStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerTitle: "Basket",
      headerTitleAlign: "left",
      headerTitleStyle: headerTitleStyle,
    }}>
    <Stack.Screen name="UserBasket" component={BasketScreen} />
  </Stack.Navigator>
);

const ProfileStack = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: "Profile",
        headerTitleAlign: "left",
        headerTitleStyle: headerTitleStyle,
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
            <View style={{ marginRight: 15 }}>
              <Ionicons name="settings" size={22} color={colors.text} />
            </View>
          </TouchableOpacity>
        ),
      }}>
      <Stack.Screen name="UserProfile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

const AppTabNavigator = () => {
  const { colors } = useTheme();
  return (
    <BottomTabs.Navigator
      initialRouteName="Home"
      barStyle={{ backgroundColor: colors.primary }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          let icon;
          switch (route.name) {
            case "Home":
              iconName = focused ? "pizza" : "pizza-outline";
              icon = <Ionicons name={iconName} size={22} color={colors.text} />;
              break;
            case "Orders":
              iconName = focused
                ? "ios-document-text"
                : "ios-document-text-outline";
              icon = <Ionicons name={iconName} size={22} color={colors.text} />;
              break;
            case "Basket":
              iconName = focused ? "basket" : "basket-outline";
              icon = <Ionicons name={iconName} size={22} color={colors.text} />;
              break;
            case "Profile":
              iconName = focused ? "person" : "person-outline";
              icon = <Ionicons name={iconName} size={22} color={colors.text} />;
          }
          return (
            <View
              style={{
                alignItems: "center",
              }}>
              {icon}
            </View>
          );
        },
        // tabBarLabel: null,
      })}>
      <BottomTabs.Screen name="Home" component={HomeStack} />
      <BottomTabs.Screen name="Orders" component={OrdersStack} />
      <BottomTabs.Screen name="Basket" component={BasketStack} />
      <BottomTabs.Screen name="Profile" component={ProfileStack} />
    </BottomTabs.Navigator>
  );
};

export default AppTabNavigator;
