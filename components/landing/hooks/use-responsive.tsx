import { useWindowDimensions } from "react-native";

export const useResponsive = () => {
  const { width, height } = useWindowDimensions();

  return {
    width,
    height,
    isMD: width >= 768,
    isLG: width >= 1024,
    isXL: width >= 1280,
    isHD: width >= 1440,
  };
};
