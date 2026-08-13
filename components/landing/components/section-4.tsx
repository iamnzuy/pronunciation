import { CText } from "@/components/CText";
import { Motion } from "@/components/landing/components/motion";
import ScatteredBeans from "@/components/landing/components/scattered-beans";
import ScrollMarquee from "@/components/landing/components/scroll-marquee";
import ScrollTrigger from "@/components/landing/components/scroll-trigger";
import { MARQUEE_ROWS } from "@/components/landing/constant";
import { getFlowUpVariant, getRevealFromLeftVariant } from "@/components/landing/helper/animation";
import { useResponsive } from "@/components/landing/hooks/use-responsive";
import { Image, View } from "react-native";
import LogoIelts1984 from "@/assets/images/landing/logo-ielts1984.svg";

export default function Section4() {
  const { width } = useResponsive();

  return (
    <ScrollTrigger amount={0.5} className="relative gap-8 overflow-hidden bg-white pb-10 pt-20">
      <ScatteredBeans />

      <Motion variants={getRevealFromLeftVariant(1.2)}>
        <View className="flex-row flex-wrap items-start justify-center px-4">
          <CText className="text-center text-h6-bold">YouPass được xây dựng bởi đội ngũ </CText>
          <LogoIelts1984 height={24} width={(24 * 107) / 25} />
        </View>
      </Motion>

      <View className="items-center justify-center">
        <Motion variants={getFlowUpVariant(1.2)} className="mx-8 w-full">
          <CText className="text-center text-t1-regular">
            YouPass được xây dựng <CText className="text-t1-bold">bởi đội ngũ IELTS 1984</CText> -
            trung tâm đã đồng hành với <CText className="text-t1-bold">10.000+ học sinh</CText> trên
            hành trình học IELTS suốt nhiều năm qua.
          </CText>
        </Motion>
      </View>

      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: 361,
          left: width / 2 - (300 * 367) / 400 / 2,
          height: 300,
          width: (300 * 367) / 400,
          overflow: "hidden",
        }}
      >
        <Motion variants={getFlowUpVariant(1.2)} className="h-full w-full">
          <Image
            source={require("@/assets/images/landing/building-without-blur.png")}
            style={{ width: "100%", height: "100%" }}
            resizeMode="contain"
          />
        </Motion>
      </View>

      <View
        style={{
          marginTop: 333,
          width: width * 1.1,
          marginLeft: -(width * 0.05),
          transform: [{ rotate: "-6deg" }],
        }}
      >
        <Motion variants={getFlowUpVariant(1.2)}>
          <ScrollMarquee rows={MARQUEE_ROWS} />
        </Motion>
      </View>
    </ScrollTrigger>
  );
}
