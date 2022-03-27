import { StyleSheet, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { moderateScale, scale } from "../assets/Styles";

const TextInputWithIcon = (props) => {
  const [focused, setFocused] = useState(false);
  return (
    <View
      style={[
        {
          backgroundColor: props.background,
          borderColor: focused ? props.focused : props.blur,
        },
        styles.textInputContainer,
        props.textInputContainerStyle,
      ]}>
      <Ionicons
        name={props.iconName}
        size={24}
        color={focused ? props.focused : props.blurIcon}
      />
      <TextInput
        {...props}
        style={[styles.textInput, props.textInputStyle]}
        placeholderTextColor={props.placeholderColor}
        placeholder={props.placeholderText}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {props.thirdIcon && (
        <Ionicons
          name="eye-off-outline"
          size={24}
          color={props.thirdIconColor}
        />
      )}
    </View>
  );
};

export default TextInputWithIcon;

const styles = StyleSheet.create({
  textInputContainer: {
    flexDirection: "row",
    width: "100%",
    height: 40,
    borderBottomWidth: 2,
    paddingHorizontal: scale(3),
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    width: "100%",
    height: "100%",
    fontSize: moderateScale(16),
    justifyContent: "center",
    paddingLeft: scale(5),
  },
});
