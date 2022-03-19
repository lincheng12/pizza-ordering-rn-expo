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

const HomeScreen = () => {
  const { colors } = useTheme();
  const nav = useNavigation();
  return (
    <AppView style={{ flex: 1 }}>
      <View style={styles.headerTopContainer}>
        <AppText style={styles.heading}>Start your order:</AppText>
        <TouchableOpacity>
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
            <AppTouchable key={index}>
              <View
                style={[
                  styles.pizzaCardContainer,
                  shadowStyle,
                  { backgroundColor: colors.card },
                ]}>
                <Image
                  resizeMode="cover"
                  style={styles.pizzaImage}
                  source={{ uri: item.image }}
                />
                <View style={styles.titleAndPriceContainer}>
                  <AppText numberOfLines={1} style={styles.pizzaName}>
                    {item.name}
                  </AppText>
                  <AppText
                    style={styles.pizzaPrice}>{`$${item.price}.00`}</AppText>
                </View>
                <AppText style={styles.ingredientsText}>Ingredients:</AppText>
                <AppText
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{ marginLeft: 5, fontSize: 11.5 }}>
                  {item.ingredients.join(", ")}
                </AppText>
              </View>
            </AppTouchable>
          ))}
          <AppTouchable>
            <View
              style={[
                styles.diyCard,
                { backgroundColor: colors.card },
                shadowStyle,
              ]}>
              <Foundation name="plus" size={24} color={colors.primary} />
              <AppText style={{ textAlign: "center", fontWeight: "bold" }}>
                Make your own pizza
              </AppText>
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
  pizzaCardContainer: {
    height: "100%",
    marginHorizontal: 3,
    width: 200,
    borderRadius: 10,
  },
  pizzaImage: {
    width: 200,
    height: "65%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  titleAndPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  pizzaName: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: Platform.OS === "ios" ? "2%" : 0,
    width: "65%",
  },
  pizzaPrice: {
    fontSize: 13,
    marginTop: Platform.OS === "ios" ? "2%" : 0,
  },
  ingredientsText: {
    fontSize: 12,
    marginTop: Platform.OS === "ios" ? "3%" : "1.5%",
    marginBottom: Platform.OS === "ios" ? "1.5%" : "1%",
    marginLeft: 5,
    fontWeight: "bold",
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
