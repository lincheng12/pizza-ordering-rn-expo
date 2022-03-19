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
        <TouchableNativeFeedback {...props}>
          {props.children}
        </TouchableNativeFeedback>
      ) : (
        <TouchableOpacity {...props}>{props.children}</TouchableOpacity>
      )}
    </>
  );
};

export default AppTouchable;
