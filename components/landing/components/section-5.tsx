import { CText } from "@/components/CText";
import {
  EllipseGradientOrange,
  Section5Blob,
} from "@/components/landing/components/background-blobs";
import { Motion, MotionText } from "@/components/landing/components/motion";
import ScatteredBeans from "@/components/landing/components/scattered-beans";
import ScrollTrigger from "@/components/landing/components/scroll-trigger";
import {
  getFlowUpVariant,
  getRevealFromLeftVariant,
  getTextColorTransitionVariant,
} from "@/components/landing/helper/animation";
import { StickyHeader } from "@/components/landing/components/sticky-header";
import { useResponsive } from "@/components/landing/hooks/use-responsive";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useState } from "react";
import { Image, LayoutChangeEvent, StyleSheet, View } from "react-native";
import LogoPower from "@/assets/images/landing/Logo-power.svg";

export const Section5 = () => {
  const { width } = useResponsive();
  const [section, setSection] = useState({ y: 0, height: 0 });

  const handleSectionLayout = useCallback((event: LayoutChangeEvent) => {
    const { y, height } = event.nativeEvent.layout;
    setSection((current) =>
      current.y === y && current.height === height ? current : { y, height },
    );
  }, []);

  return (
    <ScrollTrigger
      amount={0.2}
      className="relative items-center bg-orange-03"
      onLayout={handleSectionLayout}
    >
      <ScatteredBeans />

      <StickyHeader top={0} containerY={section.y} containerHeight={section.height}>
        <View className="w-full items-center pb-6 pt-20">
          <BlurView
            intensity={18}
            tint="light"
            style={StyleSheet.absoluteFill}
            experimentalBlurMethod="dimezisBlurView"
          />
          <LinearGradient
            colors={["#FFFFFF", "rgba(255,255,255,0.88)"]}
            locations={[0.75, 1]}
            style={StyleSheet.absoluteFill}
          />
          <Motion variants={getFlowUpVariant(0.6)}>
            <LogoPower height={60} width={(60 * 17) / 8} />
          </Motion>
        </View>
      </StickyHeader>

      <View className="w-full items-center gap-8 overflow-hidden pb-20">
        <View
          pointerEvents="none"
          style={{ position: "absolute", bottom: 0, left: (width - 125 * 4) / 2 }}
        >
          <EllipseGradientOrange width={125 * 4} height={125} />
        </View>

        <View className="relative">
          <Motion
            variants={getRevealFromLeftVariant(0.5, 1.4, { from: 0, to: 1 })}
            style={{ position: "absolute", top: 2, right: -8, width: 104, height: 29 }}
            pointerEvents="none"
          >
            <Section5Blob width={104} height={29} />
          </Motion>

          <Motion variants={getRevealFromLeftVariant(0.8, 0.6)}>
            <CText className="text-center text-h6-bold">
              Tiếp tục với{" "}
              <MotionText
                variants={getTextColorTransitionVariant("#FF6D3A", "#F5F5F7", 1.9, 0.2)}
                className="text-h6-bold"
              >
                YouPass
              </MotionText>
            </CText>
          </Motion>
        </View>

        <Motion variants={getFlowUpVariant(0.6, 0.6)} className="mx-5">
          <CText className="text-center text-t3">
            Chúng mình mong có thể{" "}
            <CText className="text-t3-bold">
              giúp người học ở mọi nơi, mọi lứa tuổi, mọi gia cảnh đạt band IELTS.
            </CText>{" "}
            Chúng mình tin rằng IELTS không phải đặc quyền của bất kì ai! Dù bạn ở thành phố hay
            nông thôn, miền núi hay hải đảo xa xôi...
          </CText>
        </Motion>

        <Motion variants={getFlowUpVariant(0.6, 0.6)} className="w-full items-center px-5">
          <Image
            source={require("@/assets/images/landing/company_member.png")}
            style={{ width: width - 40, height: ((width - 40) * 60) / 169 }}
            resizeMode="contain"
          />
        </Motion>
      </View>

      <View className="mb-6 mt-20 opacity-0">
        <LogoPower height={60} width={(60 * 17) / 8} />
      </View>
    </ScrollTrigger>
  );
};
