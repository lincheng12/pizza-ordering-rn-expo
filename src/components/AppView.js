import { View } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";

const AppView = (props) => {
  const { colors } = useTheme();
  return (
    <View
      {...props}
      style={[{ backgroundColor: colors.background }, props.style]}>
      {props.children}
    </View>
  );
};

export default AppView;
