import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";
import { useTheme } from "@react-navigation/native";
import { scale } from "../assets/Styles";

const PaperTextInput = (props) => {
  const { colors } = useTheme();

  return (
    <TextInput
      {...props}
      selectionColor={colors.primary}
      activeUnderlineColor={colors.primary}
      underlineColor="#aaa"
      theme={{ colors: { text: colors.text, placeholder: "#aaa" } }}
      style={[
        {
          backgroundColor: colors.card,
          height: scale(50),
          marginBottom: scale(8),
        },
        props.style,
      ]}
    />
  );
};

export default PaperTextInput;

const styles = StyleSheet.create({});
