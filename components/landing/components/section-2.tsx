import { CText } from "@/components/CText";
import { Section2Blob } from "@/components/landing/components/background-blobs";
import InteractiveTabs from "@/components/landing/components/interactive-tabs";
import { Motion, MotionText } from "@/components/landing/components/motion";
import ScatteredBeans from "@/components/landing/components/scattered-beans";
import ScrollTrigger from "@/components/landing/components/scroll-trigger";
import {
  getRevealFromLeftVariant,
  getTextColorTransitionVariant,
} from "@/components/landing/helper/animation";
import { View } from "react-native";

export const Section2 = () => {
  return (
    <ScrollTrigger
      amount={0.1}
      className="relative items-center justify-center gap-10 bg-orange-01 px-4 py-20"
    >
      <ScatteredBeans />

      <View className="relative max-w-[370px] self-center">
        <Motion
          variants={getRevealFromLeftVariant(0.8, 0.8, { from: 0, to: 1 })}
          style={{ position: "absolute", top: 0, right: -4, width: 136, height: 65 }}
          pointerEvents="none"
        >
          <Section2Blob width={136} height={65} />
        </Motion>

        <Motion variants={getRevealFromLeftVariant()}>
          <CText className="text-center text-h6-bold">
            Chỉ cần bạn{" "}
            <MotionText
              variants={getTextColorTransitionVariant("#13A62E", "#FFFAF6")}
              className="text-h6-bold"
            >
              chăm chỉ
            </MotionText>
            {"\n"}
            Phần còn lại để{" "}
            <MotionText
              variants={getTextColorTransitionVariant("#13A62E", "#FFFAF6")}
              className="text-h6-bold"
            >
              YouPass lo
            </MotionText>
          </CText>
        </Motion>
      </View>

      <InteractiveTabs />
    </ScrollTrigger>
  );
};
