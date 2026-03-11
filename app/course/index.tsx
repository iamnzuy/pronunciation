import { CText } from "@/components/CText";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getTypeId } from "./helpers";
import { EnumCollection, EnumIcon } from "./constant";
import { useClass } from "./hooks/use-class";

const CMS_URL = process.env.EXPO_PUBLIC_CMS;

function PartCard({ part, onPress }: { part: any; onPress: () => void }) {
  const typeId = `${part.collection}-${getTypeId(part)}`
  const enumPart = EnumCollection[typeId];
  const enumIcon = EnumIcon[typeId];
  const thumbUrl = part.thumbnail ? `${CMS_URL}/assets/${part.thumbnail}` : null;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      className="flex-row items-center gap-3 bg-white border border-gray-100 rounded-2xl p-3 mb-2"
      style={{ elevation: 1, shadowColor: "#000", shadowOpacity: 0.04, shadowRadius: 4 }}
    >
      <View>
        {enumIcon}
      </View>
      <View className="h-14 aspect-[130/74] rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
        {thumbUrl ? (
          <Image source={{ uri: thumbUrl }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
        ) : (
          <View className="flex-1 items-center justify-center">
            <Ionicons name="document-outline" size={24} color="#9CA3AF" />
          </View>
        )}
      </View>

      {/* Content */}
      <View className="flex-1 gap-0.5">
        <CText className="text-gray-400" style={{ fontSize: 11 }}>{enumPart?.subTitle}:</CText>
        <CText className="text-gray-800 font-semibold text-sm leading-snug" numberOfLines={2}>
          {part.title}
        </CText>
        {part.time != null && (
          <View className="flex-row items-center gap-1 mt-1">
            <Ionicons name="time-outline" size={11} color="#9CA3AF" />
            <CText className="text-gray-400" style={{ fontSize: 11 }}>
              {part.time >= 60 ? `${Math.round(part.time / 60)} phút` : `${part.time} phút`}
            </CText>
          </View>
        )}
      </View>

      <Ionicons name="chevron-forward" size={16} color="#D1D5DB" />
    </TouchableOpacity>
  );
}

function TopicAccordion({ topic }: { topic: any }) {
  const [open, setOpen] = useState(true);

  const handlePartPress = (part: any) => {
    if (part.type === 6) {
      router.push(`/quiz/${part.id}` as never);
    }
  };

  return (
    <View className="mb-1">
      <TouchableOpacity
        onPress={() => setOpen((p) => !p)}
        activeOpacity={0.8}
        className="flex-row items-center justify-between py-2.5 px-1"
      >
        <CText className="text-sm font-semibold text-gray-700 flex-1">{topic.title}</CText>
        <Ionicons name={open ? "chevron-up" : "chevron-down"} size={16} color="#9CA3AF" />
      </TouchableOpacity>

      {open && (
        <View>
          {topic.parts?.map((part: any) => (
            <PartCard key={part.id} part={part} onPress={() => handlePartPress(part)} />
          ))}
        </View>
      )}
    </View>
  );
}

function SectionAccordion({ section, progress }: { section: any; progress?: any }) {
  const [open, setOpen] = useState(section.sort === 2);

  const sectionProgress = progress?.section_statistics?.find((s: any) => s.id === section.id);
  const percentage = sectionProgress?.percentage ?? 0;

  return (
    <View className="mb-2 bg-white rounded-2xl border border-gray-100 overflow-hidden"
      style={{ elevation: 1, shadowColor: "#000", shadowOpacity: 0.04, shadowRadius: 6 }}
    >
      <TouchableOpacity
        onPress={() => setOpen((p) => !p)}
        activeOpacity={0.8}
        className="flex-row items-center justify-between px-4 py-3.5"
      >
        <View className="flex-1">
          <CText className="font-bold text-base text-gray-900">{section.title}</CText>
          {sectionProgress && (
            <View className="flex-row items-center gap-2 mt-1">
              <View className="flex-1 h-1 bg-gray-100 rounded-full">
                <View
                  className="h-full rounded-full"
                  style={{ width: `${percentage}%`, backgroundColor: "#F15F22" }}
                />
              </View>
              <CText className="text-xs text-gray-400">{percentage}%</CText>
            </View>
          )}
        </View>
        <Ionicons name={open ? "chevron-up" : "chevron-down"} size={18} color="#9CA3AF" className="ml-3" />
      </TouchableOpacity>

      {open && (
        <View className="px-4 pb-3 border-t border-gray-50">
          {section.topics
            ?.slice()
            .sort((a: any, b: any) => a.sort - b.sort)
            .map((topic: any) => (
              <TopicAccordion key={topic.id} topic={topic} />
            ))}
        </View>
      )}
    </View>
  );
}

export default function Homework() {
  const { data = {}, isLoading } = useClass();
  const { course, progress, title } = data as any;
  const sections = course?.sections
    ?.slice()
    .sort((a: any, b: any) => a.sort - b.sort)
    .filter((s: any) => s.topics?.length > 0) ?? [];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-row items-center px-4 py-3 bg-white border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons name="arrow-back" size={22} color="#374151" />
        </TouchableOpacity>
        <View className="flex-1">
          <CText className="font-bold text-base text-gray-900" numberOfLines={1}>{title}</CText>
          <CText className="text-xs text-gray-400">{course?.title}</CText>
        </View>
        {progress?.percentage != null && (
          <View className="items-center">
            <CText className="text-xs font-bold text-primary">{progress.percentage}%</CText>
            <CText className="text-xs text-gray-400">hoàn thành</CText>
          </View>
        )}
      </View>
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 12, paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        {sections.map((section: any) => (
          <SectionAccordion
            key={section.id}
            section={section}
            progress={progress}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
