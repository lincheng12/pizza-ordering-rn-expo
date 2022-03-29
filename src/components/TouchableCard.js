import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppTouchable from "./AppTouchable";
import { scale, shadowStyle } from "../assets/Styles";
import { useTheme } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import AppText from "./AppText";

const TouchableCard = (props) => {
  const { colors } = useTheme();
  return (
    <AppTouchable onPress={props.onPress}>
      <View
        style={[
          {
            width: "100%",
            height: scale(50),
            backgroundColor: colors.card,
            borderRadius: 10,
            marginBottom: scale(2),
            justifyContent: "center",
          },
          shadowStyle,
        ]}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: scale(8),
          }}>
          <AppText style={{ fontSize: scale(14.5) }}>{props.name}</AppText>
          <Entypo name="chevron-small-right" size={24} color={colors.text} />
        </View>
      </View>
    </AppTouchable>
  );
};

export default TouchableCard;

const styles = StyleSheet.create({});
