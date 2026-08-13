import { useLandingScroll } from "@/components/landing/hooks/use-landing-scroll";
import { Image, ImageSourcePropType, View } from "react-native";
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const ITEM_WIDTH = 105.14;
const ITEM_HEIGHT = 64.22;
const ITEM_GAP = 8;
const STEP = ITEM_WIDTH + ITEM_GAP;
const SPEED = 100;

interface MarqueeRowProps {
  images: ImageSourcePropType[];
  direction: "left" | "right";
}

const MarqueeRow = ({ images, direction }: MarqueeRowProps) => {
  const { isScrolling } = useLandingScroll();

  const setWidth = images.length * STEP;
  const duration = (setWidth / SPEED) * 1000;

  const progress = useSharedValue(0);

  useAnimatedReaction(
    () => isScrolling.value,
    (scrolling, previous) => {
      if (scrolling === previous) return;

      if (scrolling) {
        const remaining = 1 - progress.value;
        progress.value = withTiming(
          1,
          { duration: duration * remaining, easing: Easing.linear },
          (finished) => {
            if (!finished) return;
            progress.value = 0;
            progress.value = withRepeat(
              withTiming(1, { duration, easing: Easing.linear }),
              -1,
              false,
            );
          },
        );
      } else {
        cancelAnimation(progress);
      }
    },
    [duration],
  );

  const animatedStyle = useAnimatedStyle(() => {
    const offset =
      direction === "left" ? -setWidth * progress.value : -setWidth * (1 - progress.value);
    return { transform: [{ translateX: offset }] };
  });

  const strip = [...images, ...images, ...images, ...images];

  return (
    <View
      className="bg-white py-2"
      style={{
        overflow: "hidden",
        shadowColor: "rgba(22,70,117,1)",
        shadowOpacity: 0.21,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 4 },
        elevation: 6,
      }}
    >
      <Animated.View style={[{ flexDirection: "row" }, animatedStyle]}>
        {strip.map((src, index) => (
          <Image
            key={index}
            source={src}
            style={{
              width: ITEM_WIDTH,
              height: ITEM_HEIGHT,
              marginHorizontal: ITEM_GAP / 2,
              borderRadius: 12,
            }}
            resizeMode="cover"
          />
        ))}
      </Animated.View>
    </View>
  );
};

interface ScrollMarqueeProps {
  rows: ImageSourcePropType[][];
}

export default function ScrollMarquee({ rows }: ScrollMarqueeProps) {
  return (
    <View className="flex-col gap-4">
      {rows.map((images, index) => (
        <MarqueeRow key={index} images={images} direction={index % 2 === 0 ? "left" : "right"} />
      ))}
    </View>
  );
}
