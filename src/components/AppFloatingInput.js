import { Text, View } from "react-native";
import React, { useState } from "react";
import { FloatingLabelInput } from "react-native-floating-label-input";
import { useTheme } from "@react-navigation/native";
import { scale } from "../assets/Styles";
import useThemePreference from "../hooks/useThemePreference";

const AppFloatingInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { colors } = useTheme();
  const { themePreference } = useThemePreference();

  return (
    <View style={[{ width: "100%" }, { width: props.totalWidth }, props.style]}>
      <FloatingLabelInput
        {...props}
        isFocused={focused}
        hintTextColor="#aaa"
        animationDuration={150}
        keyboardAppearance={themePreference === "dark" ? "dark" : "light"}
        containerStyles={{
          backgroundColor: colors.card,
          marginVertical: scale(1.2),
          borderRadius: 8,
          width: "100%",
          elevation: 1,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
        }}
        customLabelStyles={{
          colorFocused: colors.primary,
          fontSizeFocused: scale(12),
          topFocused: scale(-20),
          fontSizeBlurred: scale(13.5),
          colorBlurred: "#aaa",
        }}
        labelStyles={{
          backgroundColor: colors.card,
          paddingHorizontal: scale(5),
          borderRadius: 4,
          //   fontWeight: "bold",
        }}
        inputStyles={{
          color: colors.text,
          paddingHorizontal: scale(10),
          //   fontSize: scale(15),
          marginVertical: scale(-2),
          height: 50,
          fontSize: scale(14.2),
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </View>
  );
};

export default AppFloatingInput;
