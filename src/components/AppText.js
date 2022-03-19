import { Text } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";

const AppText = (props) => {
  const { colors } = useTheme();
  return (
    <Text {...props} style={[{ color: colors.text }, props.style]}>
      {props.children}
    </Text>
  );
};

export default AppText;
