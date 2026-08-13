import { CText } from "@/components/CText";
import { LandingButton } from "@/components/landing/components/button";
import { Motion } from "@/components/landing/components/motion";
import { CARDS_DETAIL } from "@/components/landing/constant";
import { useState } from "react";
import { Image, LayoutChangeEvent, Linking, Pressable, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";

// The web is `h-[244px]` on phones, but that height only ever shows the
// collapsed strip there — expanding is desktop-only, where the card is 450px.
// Tapping expands here, so the card is taller to fit the details.
const CARD_HEIGHT = 260;
const COLLAPSED_PANEL_HEIGHT = 56;
const PANEL_PADDING = 8;
/** `group-hover:mb-2.5` on the web — widened here so the button can breathe. */
const DETAIL_GAP = 16;
const TIMING = { duration: 300, easing: Easing.out(Easing.ease) };

interface CardProps {
  item: (typeof CARDS_DETAIL)[number];
  isLeft: boolean;
}

const Card = ({ item, isLeft }: CardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [detailHeight, setDetailHeight] = useState(0);
  // `h-full` on the web resolves against this box, so its height is measured
  // rather than derived from the content.
  const [boxHeight, setBoxHeight] = useState(0);

  const progress = useDerivedValue(() => withTiming(expanded ? 1 : 0, TIMING), [expanded]);

  const measureDetail = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setDetailHeight((current) => (current === height ? current : height));
  };

  const measureBox = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setBoxHeight((current) => (current === height ? current : height));
  };

  const panelHeight = Math.max(boxHeight, COLLAPSED_PANEL_HEIGHT);
  // Whatever is left for the details once the button row and the gap below the
  // details have taken their share.
  const detailSpace = Math.max(
    panelHeight - COLLAPSED_PANEL_HEIGHT - PANEL_PADDING - DETAIL_GAP,
    0,
  );

  const panelStyle = useAnimatedStyle(
    () => ({
      height: COLLAPSED_PANEL_HEIGHT + progress.value * (panelHeight - COLLAPSED_PANEL_HEIGHT),
    }),
    [panelHeight],
  );

  const detailStyle = useAnimatedStyle(
    () => ({
      height: progress.value * Math.min(detailHeight, detailSpace),
      // The gap collapses with the details, so nothing is offset while closed.
      marginBottom: progress.value * DETAIL_GAP,
      opacity: progress.value,
      transform: [{ translateY: (1 - progress.value) * 16 }],
    }),
    [detailHeight, detailSpace],
  );

  const tintStyle = useAnimatedStyle(() => ({
    backgroundColor: `rgba(255,255,255,${0.6 + progress.value * 0.32})`,
  }));

  const titleStyle = useAnimatedStyle(() => ({
    backgroundColor: progress.value > 0.5 ? "#FF6D3A" : "#FFF0EB",
  }));

  const titleTextStyle = useAnimatedStyle(() => ({
    color: progress.value > 0.5 ? "#FFFFFF" : "#FF6D3A",
  }));

  return (
    <Motion
      className="w-full flex-1"
      variants={{
        hidden: { x: isLeft ? "-100vw" : "100vw", opacity: 0 },
        visible: {
          x: 0,
          opacity: 1,
          transition: {
            type: "tween",
            ease: "easeOut",
            duration: 1.2,
            opacity: { duration: 1.2, ease: "easeIn" },
          },
        },
      }}
    >
      <Pressable
        onPress={() => setExpanded((current) => !current)}
        className="relative w-full flex-col overflow-hidden rounded-[32px] border-4 border-primary-01"
        style={[styles.card, { height: CARD_HEIGHT }]}
      >
        <Animated.View style={[styles.title, titleStyle]}>
          <CText className="text-center text-t3-bold">
            <Animated.Text style={titleTextStyle}>{item.title}</Animated.Text>
          </CText>
        </Animated.View>

        <Image
          source={item.image}
          className="absolute bottom-0 left-0 w-full"
          style={styles.image}
          resizeMode="cover"
        />

        <View className="relative w-full flex-1 overflow-hidden" onLayout={measureBox}>
          <Animated.View style={[styles.panel, panelStyle]}>
            <Animated.View style={[StyleSheet.absoluteFill, tintStyle]} />

            <Animated.View style={[styles.detail, detailStyle]} pointerEvents="none">
              <View onLayout={measureDetail} style={styles.detailContent}>
                <View style={styles.bullets}>
                  {item.bullets.map((bullet) => (
                    <View key={bullet} style={styles.bulletRow}>
                      <CText className="text-t3">{"\u2022 "}</CText>
                      <CText className="flex-1 text-t3">{bullet}</CText>
                    </View>
                  ))}
                </View>
                <CText className="text-t3-bold">{item.subtext}</CText>
              </View>
            </Animated.View>

            <View style={expanded ? styles.actionExpanded : styles.action}>
              <LandingButton
                variant="primary-outline"
                className="rounded-full py-2"
                onPress={() => Linking.openURL(item.link)}
                withArrow
              >
                {item.buttonText}
              </LandingButton>
            </View>
          </Animated.View>
        </View>
      </Pressable>
    </Motion>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: "rgba(16, 24, 40, 1)",
    shadowOpacity: 0.18,
    shadowRadius: 48,
    shadowOffset: { width: 0, height: 24 },
    elevation: 12,
  },
  title: { zIndex: 1, paddingHorizontal: 16, paddingVertical: 8 },
  // `h-[208px]` on the web fills everything below the title; kept proportional
  // to the taller card so no background shows through above it.
  image: { height: CARD_HEIGHT - 36 },
  panel: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "column",
    overflow: "hidden",
    padding: PANEL_PADDING,
  },
  detail: { overflow: "hidden" },
  // Absolute so measuring it never changes the panel's own layout.
  detailContent: { position: "absolute", left: 0, right: 0, top: 0 },
  bullets: { marginBottom: 10 },
  bulletRow: { flexDirection: "row", marginLeft: 12 },
  // `items-end` -> `group-hover:items-start`: the button sits at the bottom of
  // the collapsed strip, then moves under the details once they are shown.
  action: { flex: 1, alignItems: "center", justifyContent: "flex-end" },
  actionExpanded: { flex: 1, alignItems: "center", justifyContent: "flex-start" },
});

export const InteractiveCards = () => {
  return (
    <View className="w-full max-w-[1240px] flex-col items-center justify-center gap-5">
      {CARDS_DETAIL.map((item, index) => (
        <Card key={item.title} item={item} isLeft={index === 0} />
      ))}
    </View>
  );
};
