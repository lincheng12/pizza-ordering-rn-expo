import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import AppText from "./AppText";
import { capitalize, formatPrice, mapCrust } from "../lib/helper";
import { moderateScale, scale, shadowStyle } from "../assets/Styles";
import QuantityCounter from "./QuantityCounter";
import { useTheme } from "@react-navigation/native";
import { menu } from "../assets/menu";

const BasketCard = (props) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        { backgroundColor: colors.card },
        styles.cardContainer,
        shadowStyle,
      ]}>
      {!props.checkout && (
        <TouchableOpacity
          onPress={props.onRemoveItem}
          style={[{ padding: scale(2), zIndex: 10 }, styles.crossBtn]}>
          <Entypo name="cross" size={24} color={colors.text} />
        </TouchableOpacity>
      )}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <View>
          <AppText
            style={{
              fontSize: moderateScale(18),
              fontWeight: "bold",
            }}>
            {props.pizzaName}
          </AppText>
          <AppText>
            {capitalize(menu.type[props.pizzaSize].size)}{" "}
            {menu.type[props.pizzaSizeDetails].details}
          </AppText>
          <AppText>{mapCrust(props.pizzaCrust)}</AppText>
        </View>
        <AppText style={{ fontSize: moderateScale(16) }}>
          {formatPrice(props.pizzaPrice * props.quantity)}
        </AppText>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}>
        <View>
          <Text style={{ color: colors.primary, marginTop: 5 }}>Details:</Text>
          <View style={{ paddingLeft: scale(5) }}>
            {props.pizzaDetails.map((name, index) => (
              <AppText key={index}>-{name}</AppText>
            ))}
          </View>
        </View>
        <View style={{ alignSelf: "flex-end" }}>
          {!props.checkout ? (
            <QuantityCounter
              disabled={props.quantity === 1}
              quantity={props.quantity}
              iconSize={15}
              onDecrease={props.onDecreaseCount}
              onIncrease={props.onIncreaseCount}
              quantityStyle={{
                paddingVertical: scale(8),
                paddingHorizontal: scale(16),
              }}
              buttonStyle={{ backgroundColor: colors.background }}
            />
          ) : (
            <AppText
              style={[styles.quantityText, { borderColor: colors.text }]}>
              {props.quantity}
            </AppText>
          )}
        </View>
      </View>
    </View>
  );
};

export default BasketCard;

const styles = StyleSheet.create({
  cardContainer: {
    margin: scale(2.5),
    padding: scale(10),
    borderRadius: 10,
    position: "relative",
  },
  crossBtn: {
    position: "absolute",
    top: 2,
    right: 2,
  },
  quantityText: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: scale(6),
    paddingHorizontal: scale(15),
  },
});
