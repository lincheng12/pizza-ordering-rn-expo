import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
  View,
} from "react-native";
import React from "react";
import { moderateScale, scale, shadowStyle } from "../assets/Styles";

const AppButton = (props) => {
  return (
    <>
      {Platform.OS === "android" ? (
        <TouchableNativeFeedback {...props}>
          <View
            style={[
              { backgroundColor: props.bgColor },
              shadowStyle,
              styles.baseBtnStyle,
              props.buttonContainerStyle,
            ]}>
            <Text
              style={[
                {
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: moderateScale(16),
                },
                props.btnTextStyle,
              ]}>
              {props.btnText}
            </Text>
          </View>
        </TouchableNativeFeedback>
      ) : (
        <TouchableOpacity
          {...props}
          style={[
            { backgroundColor: props.bgColor },
            shadowStyle,
            styles.baseBtnStyle,
            props.buttonContainerStyle,
          ]}>
          <Text
            style={[
              {
                textAlign: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: moderateScale(16),
              },
              props.btnTextStyle,
            ]}>
            {props.btnText}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  baseBtnStyle: {
    paddingVertical: scale(10),
    // width: moderateScale(180),
    borderRadius: 10,
  },
});
