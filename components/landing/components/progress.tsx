import { useLandingScroll } from "@/components/landing/hooks/use-landing-scroll";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";

export const Progress = () => {
  const { scrollY, scrollRange } = useLandingScroll();
  const { width } = useWindowDimensions();

  const animatedStyle = useAnimatedStyle(() => {
    const progress = scrollRange.value > 0 ? scrollY.value / scrollRange.value : 0;
    return { width: Math.min(Math.max(progress, 0), 1) * width };
  }, [width]);

  return (
    <View
      style={styles.container}
      pointerEvents="none"
    >
      <Animated.View style={[styles.bar, animatedStyle]}>
        <Svg width={width} height="100%">
          <Defs>
            <LinearGradient id="progressGradient" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0" stopColor="#FF6F3B" />
              <Stop offset="0.4663" stopColor="#FFA82E" />
              <Stop offset="1" stopColor="#15A62E" />
            </LinearGradient>
          </Defs>
          <Rect x="0" y="0" width={width} height="100%" fill="url(#progressGradient)" />
        </Svg>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { position: "absolute", top: 0, left: 0, right: 0, height: 6 },
  bar: { height: "100%", overflow: "hidden" },
});
