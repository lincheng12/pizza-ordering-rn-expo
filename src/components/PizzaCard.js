import { StyleSheet, View, Platform, Image } from "react-native";
import React from "react";
import AppText from "./AppText";
import { moderateScale, scale, shadowStyle } from "../assets/Styles";
import { useTheme } from "@react-navigation/native";
import AppTouchable from "./AppTouchable";
import { formatPrice } from "../lib/helper";

const PizzaCard = (props) => {
  const { colors } = useTheme();
  return (
    <AppTouchable onPress={props.onPress}>
      <View
        style={[
          styles.cardContainer,
          shadowStyle,
          { backgroundColor: colors.card },
          props.pizzaCardContainerStyle,
        ]}>
        <Image
          resizeMode="cover"
          style={[styles.image, props.pizzaImageStyle]}
          source={{ uri: props.image }}
        />
        <View style={styles.titleAndPriceContainer}>
          <AppText {...props} style={[styles.name, props.pizzaNameStyle]}>
            {props.name}
          </AppText>
          <AppText style={[styles.price, props.pizzaPriceStyle]}>
            +{formatPrice(props.price)}
          </AppText>
        </View>
        <AppText
          style={[
            styles.ingredientsText,
            { color: colors.primary },
            props.ingredientsTextStyle,
          ]}>
          Ingredients:
        </AppText>
        <AppText
          {...props}
          style={[
            { marginLeft: scale(5), fontSize: moderateScale(11.5) },
            props.ingredientsStyle,
          ]}>
          {props.ingredients.join(", ")}
        </AppText>
      </View>
    </AppTouchable>
  );
};

export default PizzaCard;

const styles = StyleSheet.create({
  cardContainer: {
    // marginHorizontal: 3,
    borderRadius: 10,
  },
  image: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  titleAndPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(5),
  },
  name: {
    fontSize: moderateScale(16),
    fontWeight: "bold",
    marginTop: Platform.OS === "ios" ? "2%" : 0,
    width: "65%",
  },
  price: {
    fontSize: moderateScale(13),
    marginTop: Platform.OS === "ios" ? "2%" : 0,
  },
  ingredientsText: {
    fontSize: moderateScale(12),
    marginTop: Platform.OS === "ios" ? "3%" : "1.5%",
    marginBottom: Platform.OS === "ios" ? "1.5%" : "1%",
    marginLeft: scale(5),
    fontWeight: "bold",
  },
});
