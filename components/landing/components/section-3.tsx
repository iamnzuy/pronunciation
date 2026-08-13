import { CText } from "@/components/CText";
import { Section3Blob } from "@/components/landing/components/background-blobs";
import { Motion, MotionText } from "@/components/landing/components/motion";
import ScatteredBeans from "@/components/landing/components/scattered-beans";
import ScrollTrigger from "@/components/landing/components/scroll-trigger";
import {
  getRevealFromLeftVariant,
  getTextColorTransitionVariant,
} from "@/components/landing/helper/animation";
import { LinearGradient } from "expo-linear-gradient";
import { Image, View } from "react-native";

export const Section3 = () => {
  return (
    <ScrollTrigger
      className="relative items-center justify-center py-[400px]"
      style={{
        shadowColor: "rgba(16, 24, 40, 1)",
        shadowOpacity: 0.08,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 12 },
        elevation: 8,
      }}
    >
      <LinearGradient colors={["#FBEFE4", "#FFFFFF"]} style={{ position: "absolute", inset: 0 }} />
      <ScatteredBeans />

      <View className="relative max-w-[370px] self-center">
        <Motion
          variants={getRevealFromLeftVariant(0.8, 0.8, { from: 0, to: 1 })}
          style={{ position: "absolute", top: -1, left: 70, width: 163, height: 44 }}
          pointerEvents="none"
        >
          <Section3Blob width={163} height={44} />
        </Motion>

        <Motion variants={getRevealFromLeftVariant()}>
          <CText className="text-center text-h4-bold">
            <MotionText
              variants={getTextColorTransitionVariant("#007AFF", "#FBEFE4")}
              className="text-h4-bold"
            >
              Lời chào
            </MotionText>
          </CText>
          <View className="flex-row items-start justify-center">
            <CText className="text-h4-bold">từ đội ngũ </CText>
            <View className="relative">
              <CText className="text-h4-bold">YouPass</CText>
              <Image
                source={require("@/assets/images/landing/ai-icon.png")}
                style={{
                  position: "absolute",
                  width: 28,
                  height: 28,
                  top: 12,
                  left: 14,
                  transform: [{ scaleX: -1 }],
                }}
                resizeMode="contain"
              />
            </View>
          </View>
        </Motion>
      </View>
    </ScrollTrigger>
  );
};
