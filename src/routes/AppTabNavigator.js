import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import BasketScreen from "../screens/BasketScreen";
import HomeScreen from "../screens/HomeScreen";
import OrdersScreen from "../screens/OrdersScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";

const BottomTabs = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Main" component={HomeScreen} />
  </Stack.Navigator>
);

const ProfileStack = ({ navigation }) => (
  <Stack.Navigator
    screenOptions={{
      headerTitle: "Profile",
      // headerStyle: {
      //   backgroundColor: Colors.third,
      // },
      // headerTintColor: Colors.textDark,
      headerTitleAlign: "left",
      headerTitleStyle: {
        fontSize: 25,
        fontWeight: "bold",
      },
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <View style={{ marginRight: 20 }}>
            <Ionicons name="settings" size={25} color="black" />
          </View>
        </TouchableOpacity>
      ),
    }}>
    <Stack.Screen name="UserProfile" component={ProfileScreen} />
  </Stack.Navigator>
);

const AppTabNavigator = () => {
  return (
    <BottomTabs.Navigator
      initialRouteName="Home"
      //   activeColor="#e91e63"
      barStyle={{ backgroundColor: "tomato" }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let icon;
          color = focused ? "black" : "gray";
          size = focused ? 14 : 10;
          switch (route.name) {
            case "Home":
              iconName = focused ? "home" : "home-outline";
              icon = <Ionicons name={iconName} size={22} color={color} />;
              break;
            case "Orders":
              iconName = focused ? "chatbox" : "chatbox-outline";
              icon = <Ionicons name={iconName} size={22} color={color} />;
              break;
            case "Basket":
              iconName = focused ? "basket" : "basket-outline";
              icon = <Ionicons name={iconName} size={22} color={color} />;
              break;
            case "Profile":
              iconName = focused ? "person" : "person-outline";
              icon = <Ionicons name={iconName} size={22} color={color} />;
          }
          return (
            <View
              style={{
                alignItems: "center",
              }}>
              {icon}
              {/* <Text
                style={{
                  width: "100%",
                  fontSize: size,
                  color: color,
                  fontWeight: "bold",
                }}>
                {route.name}
              </Text> */}
            </View>
          );
        },
        // tabBarLabel: null,
      })}>
      <BottomTabs.Screen
        name="Home"
        component={HomeStack}
        // options={{
        //   tabBarLabel: "Home",
        //   tabBarIcon: ({ color }) => (
        //     <MaterialCommunityIcons name="home" color={color} size={26} />
        //   ),
        // }}
      />
      <BottomTabs.Screen name="Orders" component={OrdersScreen} />
      <BottomTabs.Screen name="Basket" component={BasketScreen} />
      <BottomTabs.Screen name="Profile" component={ProfileStack} />
    </BottomTabs.Navigator>
  );
};

export default AppTabNavigator;
