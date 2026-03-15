import { CText } from "@/components/CText";
import { cn } from "@/lib/utils";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const SKILLS = [
  {
    label: "Luyện nói",
    sub: "Speaking AI",
    bg: "#D6F5F2",
    accent: "#1ABCAB",
    icon: "🎤",
  },
  {
    label: "Luyện viết",
    sub: "Writing AI",
    bg: "#D9F0D8",
    accent: "#3DAD3A",
    icon: "✍️",
  },
  {
    label: "Luyện đọc",
    sub: "Reading",
    bg: "#E8E4F8",
    accent: "#6B5CE7",
    icon: "📖",
  },
  {
    label: "Luyện nghe",
    sub: "Listening",
    bg: "#FDE8D8",
    accent: "#E8863A",
    icon: "🎧",
  },
];

const TOTAL_SLIDES = 3;

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const handleNext = () => {
    if (currentIndex < TOTAL_SLIDES - 1) {
      scrollRef.current?.scrollTo({ x: (currentIndex + 1) * width, animated: true });
    }
  };

  const handleLogin = () => router.push("/login" as never)

  const isLastSlide = currentIndex === TOTAL_SLIDES - 1;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-6 pt-20 pb-10 flex-row justify-center items-center">
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
        onMomentumScrollEnd={(e) => {
          setCurrentIndex(Math.round(e.nativeEvent.contentOffset.x / width));
        }}
      >
        <SlideOne />
        <SlideTwo />
        <SlideThree />
      </ScrollView>

      <View className="flex-row justify-center gap-2 py-4">
        {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
          <View
            key={i}
            style={{
              width: i === currentIndex ? 24 : 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: i === currentIndex ? "#F15F22" : "#E0E0E0",
            }}
          />
        ))}
      </View>

      <View className="px-6 pb-8 gap-3">
        {isLastSlide ? (
          <>
            <TouchableOpacity
              onPress={handleLogin}
              className="bg-primary rounded-2xl py-4 items-center"
            >
              <CText className="text-white text-lg font-bold">Đăng nhập</CText>
            </TouchableOpacity>
          </>
        ) : (
          <View className="flex-row justify-between items-center">
            <TouchableOpacity onPress={handleLogin}>
              <CText className="text-gray-400 text-base font-medium">
                Đăng nhập
              </CText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleNext}
              className="bg-primary rounded-2xl px-8 py-3"
            >
              <CText className="text-white">Tiếp theo</CText>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

function SlideOne() {
  return (
    <View style={{ width }} className="px-6 flex-1">
      <View
        className="rounded-3xl p-6 mb-6 mt-2"
        style={{ backgroundColor: "#FFF3EC" }}
      >
        <View className="mb-3">
          <CText className="text-3xl font-bold text-gray-900 leading-tight">
            Nền tảng{" "}
            <CText
              className="rounded-lg overflow-hidden"
              style={{ color: "#F15F22", backgroundColor: "#FDE8D8" }}
            >
              tự luyện IELTS
            </CText>
          </CText>
          <CText className="text-3xl font-bold text-gray-900 leading-tight">
            đầy đủ{" "}
            <CText style={{ color: "#F15F22" }}>4 kỹ năng</CText>
          </CText>
        </View>
        <CText className="text-gray-500 text-base mt-2">
          Học thông minh hơn với AI — nâng band điểm nhanh hơn
        </CText>
        <View className="mt-6 items-center">
          <CText style={{ fontSize: 80 }}>🎓</CText>
        </View>
      </View>

      <CText className="text-center text-gray-400 text-sm px-4">
        Lựa chọn kỹ năng phù hợp và bắt đầu luyện tập ngay hôm nay
      </CText>
    </View>
  );
}

function SlideTwo() {
  return (
    <View style={{ width }} className="px-6 flex-1">
      <CText className="text-2xl font-bold text-gray-900 mb-1 mt-2">
        Lựa chọn kỹ năng
      </CText>
      <CText className="text-gray-500 text-sm mb-5">
        4 kỹ năng IELTS trong một ứng dụng
      </CText>
      <View className="gap-3">
        {SKILLS.map((skill) => (
          <View
            key={skill.sub}
            className="rounded-2xl p-4 flex-row items-center"
            style={{ backgroundColor: skill.bg }}
          >
            <View
              className="w-12 h-12 rounded-xl items-center justify-center mr-4"
              style={{ backgroundColor: skill.accent + "33" }}
            >
              <CText style={{ fontSize: 24 }}>{skill.icon}</CText>
            </View>
            <View>
              <CText
                className="text-lg font-bold"
                style={{ color: skill.accent }}
              >
                {skill.label}
              </CText>
              <CText className="text-gray-500 text-sm">{skill.sub}</CText>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

function SlideThree() {
  return (
    <View style={{ width }} className="px-6 flex-1 justify-center">
      <View className="items-center mb-8">
        <CText style={{ fontSize: 80, marginBottom: 16 }}>🚀</CText>
        <CText className="text-3xl font-bold text-gray-900 text-center leading-tight">
          Bắt đầu hành trình{"\n"}
          <CText style={{ color: "#F15F22" }}>IELTS</CText> của bạn
        </CText>
        <CText className="text-gray-500 text-base text-center mt-4 px-4">
          Đăng nhập để trải nghiệm nền tảng luyện thi IELTS thông minh cùng AI
        </CText>
      </View>

      {/* Feature highlights */}
      {[
        { icon: "✅", text: "Chấm điểm Speaking & Writing bằng AI" },
        { icon: "📊", text: "Theo dõi tiến độ học tập chi tiết" },
        { icon: "🎯", text: "Lộ trình học cá nhân hóa theo band" },
      ].map((f) => (
        <View
          key={f.text}
          className="flex-row items-center mb-3 bg-gray-50 rounded-xl px-4 py-3"
        >
          <CText style={{ fontSize: 20, marginRight: 12 }}>{f.icon}</CText>
          <CText className="text-gray-700 text-sm font-medium flex-1">
            {f.text}
          </CText>
        </View>
      ))}
    </View>
  );
}
