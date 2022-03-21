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

const { width, height } = Dimensions.get("window");

const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = (size) => (width / guidelineBaseWidth) * size;
const verticalScale = (size) => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export { scale, verticalScale, moderateScale };
