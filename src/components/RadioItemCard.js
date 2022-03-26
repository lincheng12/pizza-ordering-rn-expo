import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppTouchable from "./AppTouchable";
import AppText from "./AppText";
import { useTheme } from "@react-navigation/native";
import { scale, shadowStyle } from "../assets/Styles";
import { capitalize, formatPrice } from "../lib/helper";
import { RadioButton } from "react-native-paper";

const RadioItemCard = (props) => {
  const { colors } = useTheme();
  return (
    <AppTouchable onPress={props.onSelect}>
      <View
        style={[
          styles.selectionContainer,
          { backgroundColor: colors.card },
          shadowStyle,
        ]}>
        <AppText style={{ marginLeft: scale(5) }}>
          {capitalize(props.itemName)}
        </AppText>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {props.itemPrice && (
            <AppText>+{formatPrice(props.itemPrice)}</AppText>
          )}
          <RadioButton.Android
            uncheckedColor={colors.text}
            color={colors.primary}
            status={props.itemCheckedStatus}
            onPress={props.onSelect}
          />
        </View>
      </View>
    </AppTouchable>
  );
};

export default RadioItemCard;

const styles = StyleSheet.create({
  selectionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: scale(5),
    marginVertical: scale(2),
    borderRadius: 10,
  },
});
