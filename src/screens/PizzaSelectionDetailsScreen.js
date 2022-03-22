import { StyleSheet, Text, View, ScrollView, Platform } from "react-native";
import React from "react";
import AppView from "../components/AppView";
import { pizzData } from "../assets/pizza_data";
import PizzaCard from "../components/PizzaCard";
import AppTouchable from "../components/AppTouchable";
import { useNavigation, useTheme } from "@react-navigation/native";
import { scale, shadowStyle, verticalScale } from "../assets/Styles";
import { Foundation } from "@expo/vector-icons";

const PizzaSelectionDetailsScreen = () => {
  const { colors } = useTheme();
  const nav = useNavigation();
  return (
    <AppView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: scale(12) }}>
        <AppTouchable
          onPress={() => nav.navigate("ConfigurePizza", { startPrice: 6 })}>
          <View
            style={[
              styles.diyCard,
              { backgroundColor: colors.primary },
              shadowStyle,
            ]}>
            <Foundation name="plus" size={24} color={colors.card} />
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: "white",
                fontSize: scale(15),
              }}>
              Make your own pizza
            </Text>
            <Text style={{ color: "white", fontSize: scale(15) }}>+$6.00</Text>
          </View>
        </AppTouchable>
        {pizzData.map((item, index) => (
          <PizzaCard
            key={index}
            pizzaCardContainerStyle={{
              height: 300,
              width: "100%",
              marginVertical: scale(8),
            }}
            pizzaImageStyle={{ width: "100%", height: "70%" }}
            pizzaNameStyle={{ fontSize: scale(18) }}
            pizzaPriceStyle={{ fontSize: scale(16) }}
            ingredientsTextStyle={{
              fontSize: scale(14),
              marginTop: "1%",
            }}
            ingredientsStyle={{ fontSize: 12.5 }}
            image={item.image}
            name={item.name}
            price={item.price}
            ingredients={item.ingredients}
            onPress={() => nav.navigate("ConfigurePizza", { item })}
          />
        ))}
      </ScrollView>
    </AppView>
  );
};

export default PizzaSelectionDetailsScreen;

const styles = StyleSheet.create({
  diyCard: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: verticalScale(90),
    marginTop: scale(2),
    marginBottom: scale(5),
    width: "100%",
    borderRadius: 10,
  },
});
