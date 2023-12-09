import { Dimensions, PixelRatio } from "react-native";

export const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
export const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);

const widthScale = SCREEN_WIDTH / 414;
const heightScale = SCREEN_HEIGHT / 896;

export const height = (h) => {
  return heightScale * h;
};

export const width = (w) => {
  return widthScale * w;
};
