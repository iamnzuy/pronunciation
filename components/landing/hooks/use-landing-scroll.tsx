import { createContext, useContext } from "react";
import { Dimensions } from "react-native";
import type { SharedValue } from "react-native-reanimated";
import { makeMutable } from "react-native-reanimated";

interface LandingScrollValue {
  scrollY: SharedValue<number>;
  scrollRange: SharedValue<number>;
  isScrolling: SharedValue<boolean>;
  viewportHeight: number;
}

const fallbackHeight = Dimensions.get("window").height;

export const LandingScrollContext = createContext<LandingScrollValue>({
  scrollY: makeMutable(0),
  scrollRange: makeMutable(1),
  isScrolling: makeMutable(false),
  viewportHeight: fallbackHeight,
});

export const useLandingScroll = () => useContext(LandingScrollContext);
