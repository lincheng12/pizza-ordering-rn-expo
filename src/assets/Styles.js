import { Dimensions } from "react-native";

export const headerTitleStyle = { fontSize: 20, fontWeight: "bold" };

export const shadowStyle = {
  elevation: 2,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.2,
  shadowRadius: 1.41,
};

export const { width: sWidth, height: sHeight } = Dimensions.get("screen");

export const { width: wWidth, height: wHeight } = Dimensions.get("window");
