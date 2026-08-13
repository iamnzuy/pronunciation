import { TOTAL_SLIDES } from "@/components/auth/constant";
import { useRef, useState } from "react";
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, ScrollView } from "react-native";

const { width } = Dimensions.get("window");

export const useOnboardingSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const goNext = () => {
    if (currentIndex < TOTAL_SLIDES - 1) {
      scrollRef.current?.scrollTo({ x: (currentIndex + 1) * width, animated: true });
    }
  };

  const onMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setCurrentIndex(Math.round(event.nativeEvent.contentOffset.x / width));
  };

  return {
    scrollRef,
    currentIndex,
    isLastSlide: currentIndex === TOTAL_SLIDES - 1,
    goNext,
    onMomentumScrollEnd,
  };
};
