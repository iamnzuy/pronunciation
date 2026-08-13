import { CText } from "@/components/CText";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EnityName } from "@/app/practice/[id]/constant";
import { usePhoneList } from "./hooks/use-phonelist";
import { useRoute } from "@react-navigation/native";

type ProgressStat = {
  total: number;
  passed: number;
  not_passed: number;
  not_practiced: number;
};

type ProgressMap = {
  word?: ProgressStat;
  sentence?: ProgressStat;
  paragraph?: ProgressStat;
};

const QUESTION_TYPE_TO_KEY: Record<string, keyof ProgressMap> = {
  WORD: "word",
  SENTENCE: "sentence",
  PARAGRAPH: "paragraph",
};

const ENTITY_LABEL: Record<keyof ProgressMap, string> = {
  word: EnityName.word,
  sentence: EnityName.sentence,
  paragraph: EnityName.paragraph,
};

function getCardStatus(progress: ProgressMap) {
  const stats = Object.values(progress).filter(Boolean) as ProgressStat[];
  if (stats?.length === 0) return "not_practiced";
  const allPassed = stats.every((s) => s.passed === s.total && s.total > 0);
  if (allPassed) return "passed";
  const anyPracticed = stats.some((s) => s.passed > 0 || s.not_passed > 0);
  return anyPracticed ? "not_passed" : "not_practiced";
}

function DonutProgress({ stat }: { stat: ProgressStat }) {
  const { total, passed, not_passed } = stat;
  if (!total) return null;

  if (passed === total) {
    return (
      <View
        className="w-5 h-5 rounded-full items-center justify-center"
        style={{ backgroundColor: "#13A62E" }}
      >
        <Ionicons name="checkmark" size={12} color="white" />
      </View>
    );
  }

  const notPracticed = total - passed - not_passed;
  const statusColor =
    passed > 0 ? "#13A62E" : not_passed > 0 ? "#FF3B30" : "#C7C7CC";

  return (
    <View
      className="w-5 h-5 rounded-full border-2 items-center justify-center"
      style={{ borderColor: statusColor }}
    />
  );
}

export default function PhoneList() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { data: phoneticList, isLoading } = usePhoneList();
  const { id } = useRoute().params as { id: string };

  const selected = phoneticList[activeIndex] ?? phoneticList[0];

  const handleStart = () => {
    if (selected) router.push(`/practice/${id}?pronunciation=${selected.id}&classId=669` as never);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 pt-3 pb-2 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="mr-2">
          <Ionicons name="arrow-back" size={22} color="#374151" />
        </TouchableOpacity>
        <Image
          source={require("@/assets/images/youpass-logo.png")}
          style={{ width: 80, height: 28 }}
          resizeMode="contain"
        />
        <CText className="flex-1 text-center font-bold text-base text-gray-900 mr-11">
          Cùng học phát âm
        </CText>
      </View>

      <View className="flex-row justify-center gap-4 pb-3">
        {[
          { color: "#13A62E", label: "Đạt" },
          { color: "#FF3B30", label: "Chưa đạt" },
          { color: "#C7C7CC", label: "Chưa luyện" },
        ].map((item) => (
          <View key={item.label} className="flex-row items-center gap-1">
            <View
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <CText className="text-xs text-gray-500">{item.label}</CText>
          </View>
        ))}
      </View>

      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 16 }}
      >
        {isLoading ? (
          <View className="flex-1 items-center justify-center py-20">
            <ActivityIndicator size="large" color="#F15F22" />
          </View>
        ) : (
          <View className="flex-row flex-wrap gap-3">
            {phoneticList.map((item: any, index: number) => {
              const isActive = activeIndex === index;
              const status = getCardStatus(item.progress);
              const isFinished = status === "passed";
              const borderColor = isActive ? "#13A62E" : "#E5E7EB";
              const bgColor = isActive ? "#F0FDF4" : "#FFFFFF";

              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => setActiveIndex(index)}
                  activeOpacity={0.8}
                  style={{
                    width: "48%",
                    borderWidth: 1.5,
                    borderColor,
                    backgroundColor: bgColor,
                    borderRadius: 16,
                    padding: 14,
                    gap: 10,
                  }}
                >
                  <View className="flex-row items-center justify-between">
                    <CText className="font-bold text-sm text-gray-900">
                      Âm {item.title}
                    </CText>
                    {isFinished && (
                      <View
                        className="flex-row items-center gap-1 px-1.5 py-0.5 rounded-full"
                        style={{ backgroundColor: "#13A62E" }}
                      >
                        <Ionicons name="checkmark" size={10} color="white" />
                        <CText className="text-white text-xs font-bold">
                          Xong
                        </CText>
                      </View>
                    )}
                  </View>

                  <View className="flex-row flex-wrap gap-3">
                    {(Object.entries(item.progress) as [keyof ProgressMap, ProgressStat][]).map(
                      ([key, stat]) => {
                        if (!stat?.total) return null;
                        return (
                          <View
                            key={key}
                            className="flex-row items-center gap-1.5"
                          >
                            <DonutProgress stat={stat} />
                            <CText className="text-xs text-gray-600">
                              {stat.total} {ENTITY_LABEL[key]}
                            </CText>
                          </View>
                        );
                      }
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </ScrollView>

      <View className="px-6 py-4 border-t border-gray-100">
        <TouchableOpacity
          onPress={handleStart}
          className="flex-row items-center justify-center gap-2 rounded-full py-4"
          style={{ backgroundColor: "#F15F22" }}
          activeOpacity={0.85}
        >
          <Ionicons name="play" size={18} color="white" />
          <CText className="text-white text-base font-bold">Bắt đầu</CText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
