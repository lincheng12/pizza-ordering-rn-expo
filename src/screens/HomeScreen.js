import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Platform,
  TouchableOpacity,
} from "react-native";
import React from "react";
import AppView from "../components/AppView";
import AppText from "../components/AppText";
import { shadowStyle, wHeight } from "../assets/Styles";
import { pizzData } from "../assets/pizza_data";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Foundation } from "@expo/vector-icons";
import AppTouchable from "../components/AppTouchable";
import PizzaCard from "../components/PizzaCard";

const HomeScreen = () => {
  const { colors } = useTheme();
  const nav = useNavigation();
  return (
    <AppView style={{ flex: 1 }}>
      <View style={styles.headerTopContainer}>
        <AppText style={styles.heading}>Start your order:</AppText>
        <TouchableOpacity onPress={() => nav.navigate("PizzaSelectionDetails")}>
          <AppText
            style={{
              color: colors.primary,
              marginRight: 8,
              fontSize: 14.5,
            }}>
            View in details
          </AppText>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 0.5 }}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          contentContainerStyle={{ paddingVertical: 2 }}
          style={{ flex: 1 }}>
          {pizzData.map((item, index) => (
            <PizzaCard
              key={index}
              pizzaCardContainerStyle={{
                height: "100%",
                width: 200,
                marginHorizontal: 3,
              }}
              pizzaImageStyle={{ width: 200, height: "65%" }}
              image={item.image}
              name={item.name}
              price={item.price}
              ingredients={item.ingredients}
              numberOfLines={1}
              onPress={() => nav.navigate("ConfigurePizza", { item })}
            />
          ))}
          <AppTouchable
            onPress={() => nav.navigate("ConfigurePizza", { startPrice: 6 })}>
            <View
              style={[
                styles.diyCard,
                { backgroundColor: colors.card },
                shadowStyle,
              ]}>
              <Foundation name="plus" size={24} color={colors.primary} />
              <AppText
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  marginBottom: 3,
                }}>
                Make your own pizza
              </AppText>
              <AppText>+$6.00</AppText>
            </View>
          </AppTouchable>
        </ScrollView>
      </View>
      <AppText style={styles.heading}>Saved Pizzas:</AppText>
      <View style={{ flex: 0.8 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
          }}>
          {pizzData.map((item, index) => (
            <AppTouchable key={index}>
              <View
                style={[
                  {
                    backgroundColor: colors.card,
                    height: 80,
                    margin: 3,
                    borderRadius: 10,
                    flexDirection: "row",
                  },
                  shadowStyle,
                ]}>
                <Image
                  style={{
                    backgroundColor: "pink",
                    width: 80,
                    height: "100%",
                    borderBottomLeftRadius: 10,
                    borderTopLeftRadius: 10,
                  }}
                />
              </View>
            </AppTouchable>
          ))}
        </ScrollView>
      </View>
    </AppView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  headerTopContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    paddingVertical: 10,
    paddingLeft: 8,
  },
  diyCard: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    marginHorizontal: 3,
    width: 120,
    borderRadius: 10,
  },
});
