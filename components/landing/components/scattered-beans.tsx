import { useEffect, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

const SPARK_COLORS = ["#FF6D3A", "#37C181", "#FFA41B", "#5A88E5", "#565FCC"];

const SPARK_PATH =
  "M4.1501 8.11813C5.32131 5.64061 4.10089 2.56324 6.27271 1.02726C8.42374 -0.494613 10.6994 -0.068315 12.2709 0.662792C17.1996 2.95699 19.4326 9.0933 17.0279 14.1785C14.6221 19.2637 8.48936 21.3703 3.56067 19.0761C1.98813 18.345 0.203433 16.8817 0.00877929 14.2675C-0.188062 11.6283 2.9778 10.5935 4.1501 8.11596V8.11813ZM5.32568 10.5121C5.7981 10.7323 6.53079 10.2247 6.94197 9.35581C7.35424 8.48694 7.28753 7.58445 6.81511 7.36533C6.6642 7.29482 6.42799 7.29265 6.14913 7.59421C5.86699 7.89902 6.09336 8.52924 5.89324 8.95229C5.69312 9.37533 5.13321 9.44801 5.07744 9.85804C5.02276 10.2637 5.17586 10.4427 5.32677 10.5121H5.32568Z";

interface SparkData {
  id: number;
  left: number;
  top: number;
  size: number;
  color: string;
  delay: number;
  sr: number;
}

const Spark = ({ spark }: { spark: SparkData }) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      spark.delay * 1000,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        false,
      ),
    );
  }, [spark.delay, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: 0.4 + 0.6 * progress.value,
    transform: [
      { scale: 0.8 + 0.3 * progress.value },
      { rotate: `${spark.sr * progress.value}deg` },
    ],
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        {
          position: "absolute",
          left: `${spark.left}%`,
          top: `${spark.top}%`,
        },
        animatedStyle,
      ]}
    >
      <Svg width={spark.size} height={spark.size * (20 / 18)} viewBox="0 0 18 20" fill="none">
        <Path fill={spark.color} d={SPARK_PATH} />
      </Svg>
    </Animated.View>
  );
};

export default function ScatteredBeans() {
  const sparks = useMemo<SparkData[]>(() => {
    const COLS = 4;
    const ROWS = 3;
    const cellWidth = 100 / COLS;
    const cellHeight = 100 / ROWS;
    const CX_MIN = 25;
    const CX_MAX = 75;

    const generated: SparkData[] = [];
    let idCounter = 0;

    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const randomXOffset = (Math.random() * 0.8 + 0.1) * cellWidth;
        const randomYOffset = (Math.random() * 0.8 + 0.1) * cellHeight;

        const left = col * cellWidth + randomXOffset;
        const top = row * cellHeight + randomYOffset;
        if (left > CX_MIN && left < CX_MAX) continue;

        generated.push({
          id: idCounter++,
          left,
          top,
          size: Math.random() * 10 + 20,
          color: SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)],
          delay: Math.random() * 3,
          sr: Math.floor(Math.random() * 80) - 40,
        });
      }
    }

    return generated;
  }, []);

  return (
    <View pointerEvents="none" style={[StyleSheet.absoluteFill, { opacity: 0.9, overflow: "hidden" }]}>
      {sparks.map((spark) => (
        <Spark key={spark.id} spark={spark} />
      ))}
    </View>
  );
}
