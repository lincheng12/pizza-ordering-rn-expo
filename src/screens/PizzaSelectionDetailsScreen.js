import { StyleSheet, Text, View, ScrollView, Platform } from "react-native";
import React from "react";
import AppView from "../components/AppView";
import { pizzData } from "../assets/pizza_data";
import PizzaCard from "../components/PizzaCard";
import AppTouchable from "../components/AppTouchable";
import { useTheme } from "@react-navigation/native";
import { shadowStyle } from "../assets/Styles";
import { Foundation } from "@expo/vector-icons";

const PizzaSelectionDetailsScreen = () => {
  const { colors } = useTheme();
  return (
    <AppView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 2 }}>
        <AppTouchable>
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
              }}>
              Make your own pizza
            </Text>
          </View>
        </AppTouchable>
        {pizzData.map((item, index) => (
          <PizzaCard
            key={index}
            pizzaCardContainerStyle={{
              height: 300,
              width: "100%",
              marginVertical: 3,
            }}
            pizzaImageStyle={{ width: "100%", height: "70%" }}
            pizzaNameStyle={{ fontSize: 18 }}
            pizzaPriceStyle={{ fontSize: 16 }}
            ingredientsTextStyle={{
              fontSize: 14,
              marginTop: "1.3%",
            }}
            ingredientsStyle={{ fontSize: 13 }}
            image={item.image}
            name={item.name}
            price={item.price}
            ingredients={item.ingredients}
            onPress={() => console.log(index)}
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
    height: 100,
    marginTop: 2,
    marginBottom: 5,
    width: "100%",
    borderRadius: 10,
  },
});
