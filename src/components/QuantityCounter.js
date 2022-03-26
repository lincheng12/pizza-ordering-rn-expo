import { StyleSheet, View, TouchableOpacity } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import React from "react";
import AppText from "./AppText";
import { scale, shadowStyle } from "../assets/Styles";
import { useTheme } from "@react-navigation/native";

const QuantityCounter = (props) => {
  const { colors } = useTheme();
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <TouchableOpacity
        disabled={props.disabled}
        onPress={props.onDecrease}
        style={[
          styles.circleButton,
          { backgroundColor: colors.card },
          shadowStyle,
          props.buttonStyle,
        ]}>
        <AntDesign name="minus" size={props.iconSize} color={colors.text} />
      </TouchableOpacity>
      <AppText
        style={[
          styles.quantityText,
          { borderColor: colors.text },
          props.quantityStyle,
        ]}>
        {props.quantity}
      </AppText>
      <TouchableOpacity
        onPress={props.onIncrease}
        style={[
          styles.circleButton,
          { backgroundColor: colors.card },
          shadowStyle,
          props.buttonStyle,
        ]}>
        <AntDesign name="plus" size={props.iconSize} color={colors.text} />
      </TouchableOpacity>
    </View>
  );
};

export default QuantityCounter;

const styles = StyleSheet.create({
  circleButton: {
    padding: scale(10),
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  quantityText: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: scale(10),
    paddingHorizontal: scale(18),
    marginHorizontal: scale(8),
  },
});
