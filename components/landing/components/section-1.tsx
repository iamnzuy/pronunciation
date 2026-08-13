import { CText } from "@/components/CText";
import { Section1Blob } from "@/components/landing/components/background-blobs";
import { InteractiveCards } from "@/components/landing/components/interactive-cards";
import { Motion, MotionText } from "@/components/landing/components/motion";
import ScatteredBeans from "@/components/landing/components/scattered-beans";
import ScrollTrigger from "@/components/landing/components/scroll-trigger";
import {
  getRevealFromLeftVariant,
  getTextColorTransitionVariant,
} from "@/components/landing/helper/animation";
import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";

export const Section1 = () => {
  return (
    <ScrollTrigger className="relative items-center justify-center gap-8 px-4 pb-[120px] pt-20">
      <LinearGradient
        colors={["#FFF0EB", "#FBEFE4"]}
        locations={[0.2794, 1]}
        style={{ position: "absolute", inset: 0 }}
      />
      <ScatteredBeans />

      <View className="relative max-w-[370px] self-center">
        <Motion
          variants={getRevealFromLeftVariant(0.8, 0.8, { from: 0, to: 1 })}
          style={{ position: "absolute", top: -4, left: 4, width: 265, height: 68 }}
          pointerEvents="none"
        >
          <Section1Blob width={265} height={68} />
        </Motion>

        <Motion variants={getRevealFromLeftVariant()}>
          <CText className="text-center text-h6-bold">
            <MotionText
              variants={getTextColorTransitionVariant("#13A62E", "#FFFAF6")}
              className="text-h6-bold"
            >
              HỌC CHĂM CHỈ
            </MotionText>
            {" NHẤT ĐỊNH "}
            <MotionText
              variants={getTextColorTransitionVariant("#13A62E", "#FFFAF6")}
              className="text-h6-bold"
            >
              ĐẠT BAND
            </MotionText>
          </CText>
        </Motion>
      </View>

      <Motion
        className="relative max-w-[700px]"
        variants={{
          hidden: { y: 150, opacity: 0 },
          visible: { y: 0, opacity: 1, transition: { type: "tween", ease: "easeOut", duration: 1.2, opacity: { duration: 1.2, ease: "easeOut" } } },
        }}
      >
        <CText className="text-center text-t2-regular font-medium">
          Dù bạn là ai, ở bất cứ đâu - chỉ cần bạn chịu học, YouPass đã chuẩn bị sẵn tất cả để bạn
          tự học IELTS đúng cách.
        </CText>
      </Motion>

      <InteractiveCards />
    </ScrollTrigger>
  );
};
