import { CText } from "@/components/CText";
import { FEATURES, SKILLS } from "@/components/auth/constant";
import { Dimensions, View } from "react-native";

const { width } = Dimensions.get("window");

export const SlideOne = () => (
  <View style={{ width }} className="flex-1 px-6">
    <View className="mb-6 mt-2 rounded-3xl p-6" style={{ backgroundColor: "#FFF3EC" }}>
      <View className="mb-3">
        <CText className="text-3xl font-bold leading-tight text-gray-900">
          Nền tảng{" "}
          <CText
            className="overflow-hidden rounded-lg"
            style={{ color: "#F15F22", backgroundColor: "#FDE8D8" }}
          >
            tự luyện IELTS
          </CText>
        </CText>
        <CText className="text-3xl font-bold leading-tight text-gray-900">
          đầy đủ <CText style={{ color: "#F15F22" }}>4 kỹ năng</CText>
        </CText>
      </View>
      <CText className="mt-2 text-base text-gray-500">
        Học thông minh hơn với AI — nâng band điểm nhanh hơn
      </CText>
      <View className="mt-6 items-center">
        <CText style={{ fontSize: 80 }}>🎓</CText>
      </View>
    </View>

    <CText className="px-4 text-center text-sm text-gray-400">
      Lựa chọn kỹ năng phù hợp và bắt đầu luyện tập ngay hôm nay
    </CText>
  </View>
);

export const SlideTwo = () => (
  <View style={{ width }} className="flex-1 px-6">
    <CText className="mb-1 mt-2 text-2xl font-bold text-gray-900">
      Lựa chọn kỹ năng
    </CText>
    <CText className="mb-5 text-sm text-gray-500">
      4 kỹ năng IELTS trong một ứng dụng
    </CText>
    <View className="gap-3">
      {SKILLS.map((skill) => (
        <View
          key={skill.sub}
          className="flex-row items-center rounded-2xl p-4"
          style={{ backgroundColor: skill.bg }}
        >
          <View
            className="mr-4 h-12 w-12 items-center justify-center rounded-xl"
            style={{ backgroundColor: skill.accent + "33" }}
          >
            <CText style={{ fontSize: 24 }}>{skill.icon}</CText>
          </View>
          <View>
            <CText className="text-lg font-bold" style={{ color: skill.accent }}>
              {skill.label}
            </CText>
            <CText className="text-sm text-gray-500">{skill.sub}</CText>
          </View>
        </View>
      ))}
    </View>
  </View>
);

export const SlideThree = () => (
  <View style={{ width }} className="flex-1 justify-center px-6">
    <View className="mb-8 items-center">
      <CText style={{ fontSize: 80, marginBottom: 16 }}>🚀</CText>
      <CText className="text-center text-3xl font-bold leading-tight text-gray-900">
        Bắt đầu hành trình{"\n"}
        <CText style={{ color: "#F15F22" }}>IELTS</CText> của bạn
      </CText>
      <CText className="mt-4 px-4 text-center text-base text-gray-500">
        Đăng nhập để trải nghiệm nền tảng luyện thi IELTS thông minh cùng AI
      </CText>
    </View>

    {FEATURES.map((feature) => (
      <View
        key={feature.text}
        className="mb-3 flex-row items-center rounded-xl bg-gray-50 px-4 py-3"
      >
        <CText style={{ fontSize: 20, marginRight: 12 }}>{feature.icon}</CText>
        <CText className="flex-1 text-sm font-medium text-gray-700">
          {feature.text}
        </CText>
      </View>
    ))}
  </View>
);
