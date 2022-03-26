import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { scale, shadowStyle } from "../assets/Styles";

const AppTextInput = ({ icon, iconPosition, ...props }) => {
  const [focused, setFocused] = useState(false);
  const { colors } = useTheme();
  // const getBorderColor = () => (focused ? Colors.textDark : Colors.textLight);
  const getBorderColor = () => (focused ? colors.primary : colors.background);

  const getFlexDirection = () =>
    icon && iconPosition === "left" ? "row" : "row-reverse";

  return (
    <View style={[{ paddingVertical: scale(1) }, props.inputContainer]}>
      <View
        style={[
          {
            ...styles.container,
            ...props.containerStyle,
            flexDirection: getFlexDirection(),
            borderColor: getBorderColor(),
          },
          { backgroundColor: colors.card },
        ]}>
        <View
          style={{
            justifyContent: "center",
          }}>
          {icon && icon}
        </View>
        <TextInput
          placeholderStyle={{ fontSize: 50 }}
          placeholderTextColor={colors.border}
          style={[styles.textInput, { color: colors.text }]}
          {...props}
          onFocus={() => {
            setFocused(true);
          }}
          onBlur={() => {
            setFocused(false);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 3,
    //width: "100%",
    flex: 1,
  },

  textInput: {
    flex: 1,
    width: "100%",
    height: "100%",
    //backgroundColor: 'red',
    fontSize: 16,
    marginLeft: 5,
    justifyContent: "center",
  },
});

export default AppTextInput;
