import { Progress } from "@/components/landing/components/progress";
import { Section1 } from "@/components/landing/components/section-1";
import { Section2 } from "@/components/landing/components/section-2";
import { Section3 } from "@/components/landing/components/section-3";
import Section4 from "@/components/landing/components/section-4";
import { Section5 } from "@/components/landing/components/section-5";
import { Section6 } from "@/components/landing/components/section-6";
import { LandingScrollContext } from "@/components/landing/hooks/use-landing-scroll";
import { useLandingScrollState } from "@/components/landing/hooks/use-landing-scroll-state";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import Animated from "react-native-reanimated";

export default function Landing() {
  const { scrollState, scrollHandler, onContentSizeChange, onLayout } = useLandingScrollState();

  return (
    <LandingScrollContext.Provider value={scrollState}>
      <View className="flex-1 bg-white">
        <StatusBar style="dark" />

        <Animated.ScrollView
          onScroll={scrollHandler}
          onLayout={onLayout}
          onContentSizeChange={onContentSizeChange}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          <View className="overflow-hidden">
            <Section1 />
            <Section2 />
            <Section3 />
            <Section4 />
            <Section5 />
            <Section6 />
          </View>
        </Animated.ScrollView>

        <Progress />
      </View>
    </LandingScrollContext.Provider>
  );
}
