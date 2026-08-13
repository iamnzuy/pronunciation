import { CText } from "@/components/CText";
import { Section6Blob } from "@/components/landing/components/background-blobs";
import { InteractiveCards } from "@/components/landing/components/interactive-cards";
import { Motion, MotionText } from "@/components/landing/components/motion";
import ScatteredBeans from "@/components/landing/components/scattered-beans";
import ScrollTrigger from "@/components/landing/components/scroll-trigger";
import {
  getRevealFromLeftVariant,
  getTextColorTransitionVariant,
} from "@/components/landing/helper/animation";
import { View } from "react-native";

export const Section6 = () => {
  return (
    <ScrollTrigger
      amount={0.3}
      className="relative w-full items-center justify-center gap-20 bg-orange-03 px-4 pb-20 pt-0"
    >
      <ScatteredBeans />

      <View className="relative w-full max-w-[1200px]">
        <Motion
          variants={getRevealFromLeftVariant(0.8, 0.8, { from: 0, to: 1 })}
          style={{ position: "absolute", top: 1, left: 133, width: 226, height: 62 }}
          pointerEvents="none"
        >
          <Section6Blob width={226} height={62} />
        </Motion>

        <Motion variants={getRevealFromLeftVariant()}>
          <CText className="text-center text-h6-bold">
            Chỉ cần bạn{" "}
            <MotionText
              variants={getTextColorTransitionVariant("#13A62E", "#FFFAF6")}
              className="text-h6-bold"
            >
              chăm chỉ, YouPass
            </MotionText>
            {" nỗ lực hết sức cùng bạn "}
            <MotionText
              variants={getTextColorTransitionVariant("#13A62E", "#FFFAF6")}
              className="text-h6-bold"
            >
              đạt band
            </MotionText>
          </CText>
        </Motion>
      </View>

      <InteractiveCards />
    </ScrollTrigger>
  );
};
