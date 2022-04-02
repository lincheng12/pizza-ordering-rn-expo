import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import React from "react";

const AppTouchable = (props) => {
  return (
    <>
      {Platform.OS === "android" ? (
        <TouchableNativeFeedback activeOpacity={0.5} {...props}>
          {props.children}
        </TouchableNativeFeedback>
      ) : (
        <TouchableOpacity activeOpacity={0.5} {...props}>
          {props.children}
        </TouchableOpacity>
      )}
    </>
  );
};

export default AppTouchable;
