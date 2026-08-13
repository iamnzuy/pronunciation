import { CText } from "@/components/CText";
import { SlideOne, SlideThree, SlideTwo } from "@/components/auth/components/slides";
import { TOTAL_SLIDES } from "@/components/auth/constant";
import { useOnboardingSlider } from "@/components/auth/hooks/use-onboarding-slider";
import { cn } from "@/lib/utils";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface OnboardingScreenProps {
  onLogin: () => void;
}

export const OnboardingScreen = ({ onLogin }: OnboardingScreenProps) => {
  const { scrollRef, currentIndex, isLastSlide, goNext, onMomentumScrollEnd } =
    useOnboardingSlider();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-center px-6 pb-10 pt-20">
        <Image
          source={require("@/assets/images/youpass-logo.png")}
          style={{ height: 100, width: 280 }}
          className={cn(isLastSlide && "scale-50")}
          resizeMode="contain"
        />
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ flex: 1 }}
        scrollEventThrottle={16}
        onMomentumScrollEnd={onMomentumScrollEnd}
      >
        <SlideOne />
        <SlideTwo />
        <SlideThree />
      </ScrollView>

      <View className="flex-row justify-center gap-2 py-4">
        {Array.from({ length: TOTAL_SLIDES }).map((_, index) => (
          <View
            key={index}
            style={{
              width: index === currentIndex ? 24 : 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: index === currentIndex ? "#F15F22" : "#E0E0E0",
            }}
          />
        ))}
      </View>

      <View className="gap-3 px-6 pb-8">
        {isLastSlide ? (
          <TouchableOpacity
            onPress={onLogin}
            className="items-center rounded-2xl bg-primary py-4"
          >
            <CText className="text-lg font-bold text-white">Đăng nhập</CText>
          </TouchableOpacity>
        ) : (
          <View className="flex-row items-center justify-between">
            <TouchableOpacity onPress={onLogin}>
              <CText className="text-base font-medium text-gray-400">
                Đăng nhập
              </CText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={goNext}
              className="rounded-2xl bg-primary px-8 py-3"
            >
              <CText className="text-white">Tiếp theo</CText>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
