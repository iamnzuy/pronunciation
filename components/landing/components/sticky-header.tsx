import { useLandingScroll } from "@/components/landing/hooks/use-landing-scroll";
import { ReactNode, useCallback, useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

interface StickyHeaderProps {
  children: ReactNode;
  top?: number;
  containerY: number;
  containerHeight: number;
}

export const StickyHeader = ({
  children,
  top = 80,
  containerY,
  containerHeight,
}: StickyHeaderProps) => {
  const { scrollY } = useLandingScroll();
  const [layout, setLayout] = useState({ y: 0, height: 0 });

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { y, height } = event.nativeEvent.layout;
    setLayout((current) =>
      current.y === y && current.height === height ? current : { y, height },
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const naturalTop = containerY + layout.y - scrollY.value;
    const overshoot = top - naturalTop;
    if (overshoot <= 0) return { transform: [{ translateY: 0 }] };

    const maxTravel = Math.max(containerHeight - layout.y - layout.height, 0);
    return { transform: [{ translateY: Math.min(overshoot, maxTravel) }] };
  }, [top, layout.y, layout.height, containerY, containerHeight]);

  return (
    <>
      <View style={{ height: layout.height }} pointerEvents="none" />
      <Animated.View
        onLayout={handleLayout}
        style={[{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 1 }, animatedStyle]}
      >
        {children}
      </Animated.View>
    </>
  );
};
