import { CText } from "@/components/CText";
import { generateStressMap } from "@/helpers";
import { cn } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { X } from "lucide-react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Image, ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LoadingProgressSvg from "../../assets/images/loading-progress.svg";
import { ClassNames, FilterOption, MAPPED_DRAFT_RESULT, PHONETIC_DATA } from "./constant";
import BottomSheet from "@/components/BottomSheet";
import Tooltip from "@/components/Tooltip";

type WordStatus = "passed" | "not_passed" | "not_practiced";

type FilterTab = "all" | "not_practiced" | "not_passed";

const isValidId = (id: string | undefined): number | false => {
  if (id === undefined || id === null || isNaN(Number(id))) return false;
  return Number(id);
};

export const ResultView = ({ currentQuestion, result }: any) => {
  const { question_type } = currentQuestion || {};
  return (
    <View className="flex-1 flex items-center justify-center flex-row flex-wrap gap-y-2">
      {result?.sentences?.map((sentence: any, sentenceIndex: number) => {
        const originalSentence = currentQuestion?.pronunciation_structure?.sentences?.[sentenceIndex];
        const originalWords = originalSentence?.sentence?.split(/\s+/) || [];
        const wordsMap = new Map(originalSentence?.words?.map((word: any, index: number) => [(typeof word?.word_position !== "number" && (question_type === "WORD") ? 0 : word.word_position), { ...word, originalWord: originalWords[index] }]) || []);
        return sentence.words.map((word: any, wordIndex: number) => {
          const wordMap = wordsMap.get(typeof word?.word_position !== "number" && (question_type === "WORD") ? 0 : word.word_position) as any;
          const stressMap = generateStressMap(wordMap?.ipa, wordMap?.phoneme_details);
          const textSizeClass = currentQuestion?.question_type === "WORD" ? "text-t1-bold" : currentQuestion?.question_type === "SENTENCE" ? "text-t3-bold" : "text-t2-medium";
          return (
            <View key={`result-${sentenceIndex}-${wordIndex}`} className={cn("flex flex-col items-center justify-center gap-1", textSizeClass, wordIndex !== 0 && "ml-[0.25em]")}>
              {question_type === "WORD" && <WordInWordType word={word} wordMap={wordMap} textSizeClass={textSizeClass} />}
              {(question_type === "SENTENCE" || question_type === "PARAGRAPH") && <WordInSentenceAndParagraphType word={word} wordMap={wordMap} textSizeClass={textSizeClass} />}
              <PhonemesAndMeaning currentQuestion={currentQuestion} word={wordMap} stressMap={stressMap} />
            </View>
          )
        })
      })}
    </View>
  )
}

export const WordInWordType = ({ word, wordMap, textSizeClass }: { word: any, wordMap: any, textSizeClass: string }) => {
  const { phoneme_details: phoneme_details_with_format } = wordMap || {};
  return (
    <View className="flex-row justify-center">
      {word.phoneme_details?.map((phoneme: any, phonemeIndex: number) => {
        const format = phoneme_details_with_format?.[phonemeIndex]?.character_mapping?.format;
        if (phoneme.status === 1) return (<CText key={`char-${phonemeIndex}`} className={cn("text-secondary-01", ClassNames[format as keyof typeof ClassNames], textSizeClass)}>{phoneme.character_mapping?.letters}</CText>);
        else if (phoneme.status === 0) return (<TooltipForWrongCharacter key={`wrong-${phonemeIndex}`} phoneme={phoneme} format={format} textSizeClass={textSizeClass} />);
      })}
    </View>
  )
}

export const WordInSentenceAndParagraphType = ({ word, wordMap, textSizeClass }: { word: any, wordMap: any, textSizeClass: string }) => {
  const { phoneme_details: phoneme_details_with_format } = wordMap || {};
  const [open, setOpen] = useState(false);
  const wordText = word.phoneme_details?.map((p: any) => p.character_mapping?.letters).join("") ?? "";

  return (
    <>
      <TouchableOpacity onPress={() => setOpen(true)} activeOpacity={0.7}>
        <View className="flex-row justify-center">
          {word.phoneme_details?.map((phoneme: any, phonemeIndex: number) => {
            const format = phoneme_details_with_format?.[phonemeIndex]?.character_mapping?.format;
            return (
              <CText key={`char-${phonemeIndex}`} className={cn(phoneme.status === 1 ? "text-secondary-01" : "text-redcolor-500", ClassNames[format as keyof typeof ClassNames], textSizeClass)}>
                {phoneme.character_mapping?.letters}
              </CText>
            );
          })}
        </View>
      </TouchableOpacity>

      <BottomSheet open={open} toggle={() => setOpen(false)}>
        <View className="flex-row items-center justify-between">
          <CText className="text-t3-bold absolute left-1/2 -translate-x-1/2">{wordText}</CText>
          <View className="flex-1" />
          <TouchableOpacity onPress={() => setOpen(false)} className="w-7 h-7 items-center justify-center rounded-full bg-grey-100">
            <X size={14} className="text-dark-50" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity className="flex-row items-center gap-3 border border-grey-100 rounded-xl p-3">
          <Ionicons name="volume-high-outline" size={18} color="#374151" />
          <CText className="text-t3-bold">Nghe mẫu</CText>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center gap-3 border border-grey-100 rounded-xl p-3">
          <Ionicons name="play-circle-outline" size={18} color="#374151" />
          <CText className="text-t3-bold">Nghe bạn đọc</CText>
        </TouchableOpacity>
      </BottomSheet>
    </>
  )
}

export const TooltipForWrongCharacter = ({ phoneme, format, textSizeClass }: { phoneme: any, format: string, textSizeClass: string }) => {
  return (
    <Tooltip
      content={
        <View className="gap-2">
          <View className="flex-row items-center gap-1.5">
            <CText className="text-t5-regular text-dark-50">Điểm:</CText>
            <CText className="text-t4-bold text-teritary-01">{phoneme?.score ?? 0}%</CText>
          </View>
          <TouchableOpacity className="flex-row items-center gap-2 border border-grey-100 rounded-lg p-2">
            <Ionicons name="volume-high-outline" size={14} color="#374151" />
            <CText className="text-t5-bold">Nghe mẫu</CText>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center gap-2 border border-grey-100 rounded-lg p-2">
            <Ionicons name="play-circle-outline" size={14} color="#374151" />
            <CText className="text-t5-bold">Nghe bạn đọc</CText>
          </TouchableOpacity>
        </View>
      }
    >
      <CText className={cn("text-redcolor-500", ClassNames[format as keyof typeof ClassNames], textSizeClass)}>
        {phoneme.character_mapping.letters}
      </CText>
    </Tooltip>
  )
}

export const QuestionView = ({ currentQuestion }: any) => {
  const { question_type } = currentQuestion || {};

  return (
    <View className="flex-1 flex items-center justify-center flex-row flex-wrap gap-y-2">
      {currentQuestion?.pronunciation_structure?.sentences?.map((sentence: any, sentenceIndex: number) => {
        const originalSentence = currentQuestion?.pronunciation_structure?.sentences?.[sentenceIndex];
        const originalWords = originalSentence?.sentence?.split(/\s+/) || [];
        const wordsMap = new Map(originalSentence?.words?.map((word: any, index: number) => [(typeof word?.word_position !== "number" && (currentQuestion?.question_type === "WORD") ? 0 : word.word_position), { ...word, originalWord: originalWords[index] }]) || []);
        return sentence.words.map((word: any, wordIndex: number) => {
          const wordMap = wordsMap.get(typeof word?.word_position !== "number" && (question_type === "WORD") ? 0 : word.word_position) as any;
          const stressMap = generateStressMap(wordMap?.ipa, wordMap?.phoneme_details);
          const textSizeClass = currentQuestion?.question_type === "WORD" ? "text-t1-bold" : currentQuestion?.question_type === "SENTENCE" ? "text-t3-bold" : "text-t2-medium";
          return (
            <View key={`question-${sentenceIndex}-${wordIndex}`} className={cn("flex flex-col items-center justify-center gap-1", textSizeClass, wordIndex !== 0 && "ml-[0.25em]")}>
              <View className="flex-row justify-center">
                {word.phoneme_details?.map((p: any, pIdx: number) => {
                  const { format, letters } = p.character_mapping;
                  return (<CText key={`char-${pIdx}`} className={cn(ClassNames[format as keyof typeof ClassNames], textSizeClass)}>{letters}</CText>);
                })}
              </View>
              <PhonemesAndMeaning currentQuestion={currentQuestion} word={word} stressMap={stressMap} />
            </View>
          )
        })
      })}
    </View>
  )
}

export const PhonemesAndMeaning = ({ currentQuestion, word, stressMap }: { currentQuestion: any, word: any, stressMap: any }) => {
  return (<>
    {(currentQuestion?.question_type === "WORD" || currentQuestion?.question_type === "SENTENCE") &&
      <View className="flex-row justify-center">
        <CText className="text-t5-regular">
          /{word.phoneme_details?.map((phoneme: any, phonemeIndex: number) => {
            return (<React.Fragment key={`phoneme-${phonemeIndex}`}>
              {stressMap[phonemeIndex] === "primary" && <CText>ˈ</CText>}
              {stressMap[phonemeIndex] === "secondary" && <CText>ˌ</CText>}
              <CText className={cn(ClassNames[phoneme.format as keyof typeof ClassNames])}>{phoneme.phoneme}</CText>
            </React.Fragment>);
          })}/
        </CText>
      </View>
    }
    {currentQuestion?.question_type === "WORD" && (
      <View className="flex flex-row flex-wrap items-center justify-center gap-[0.25em]">
        <CText className="text-t5-regular text-dark-50 text-center">{currentQuestion?.content}</CText>
        <CText className="text-t5-regular text-dark-50 text-center">{currentQuestion?.word_class && `(${currentQuestion?.word_class})`}</CText>
      </View>
    )}
  </>)
}

export default function Practice() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const shouldRedirect = !isValidId(id);
  const [result, setResult] = useState<any>(null);

  const [selectedPhoneticId, setSelectedPhoneticId] = useState(isValidId(id) ?? PHONETIC_DATA[0]?.id);
  const phoneticData = PHONETIC_DATA.find((p) => p.id === selectedPhoneticId) ?? PHONETIC_DATA[0];
  const [questions, setQuestions] = useState<any[]>(phoneticData?.items ?? []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filterTab, setFilterTab] = useState<FilterTab>("all");
  const [isRecording, setIsRecording] = useState(false);
  const [isPhoneticDropdownOpen, setIsPhoneticDropdownOpen] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!shouldRedirect) return;
    const t = setTimeout(() => router.replace("/phonelist" as never), 0);
    return () => clearTimeout(t);
  }, [shouldRedirect]);

  if (shouldRedirect) return null;

  const currentQuestion = questions[currentIndex];

  const draftResult = useMemo(() => {
    return MAPPED_DRAFT_RESULT.get(currentQuestion?.id);
  }, [currentQuestion?.id]);

  const total = questions.length;
  const questionIndex = currentIndex;
  const totalItems = total;

  const handleClose = () => router.back();

  const handleChangeQuestion = (type: "previous" | "next") => {
    if (type === "previous" && currentIndex > 0) setCurrentIndex(currentIndex - 1);
    else if (type === "next" && currentIndex < total - 1) setCurrentIndex(currentIndex + 1);
  };

  const handleSelectWord = (wordId: number) => {
    const idx = questions.findIndex((w) => w.id === wordId);
    if (idx !== -1) setCurrentIndex(idx);
  };

  const handleSelectPhonetic = (p: any) => {
    setSelectedPhoneticId(p.id);
    setQuestions(p.questions);
    setCurrentIndex(0);
    setIsPhoneticDropdownOpen(false);
  };

  const handleMicPress = () => {
    if (isRecording) {
      setIsRecording(false);
      pulseAnim.setValue(1);
      setQuestions((prev) =>
        prev.map((w, i) =>
          i === currentIndex ? { ...w, status: (Math.random() > 0.5 ? "passed" : "not_passed") as WordStatus } : w
        )
      );
    } else {
      setIsRecording(true);
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.2, duration: 500, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
        ])
      ).start();
    }
  };

  return (
    <SafeAreaView className="flex h-full flex-col justify-center gap-6 bg-white">
      <View className="relative w-full flex flex-col border-b border-grey-100 items-center gap-4 min-h-[56.9%] p-4" style={{ boxShadow: "-9px 16px 5px 0 rgba(0, 0, 0, 0.00), -6px 11px 5px 0 rgba(0, 0, 0, 0.01), -3px 6px 4px 0 rgba(0, 0, 0, 0.05), -1px 3px 3px 0 rgba(0, 0, 0, 0.09), 0 1px 2px 0 rgba(0, 0, 0, 0.10)" }}>
        <View className="flex-row items-center justify-between w-full">
          <TouchableOpacity onPress={handleClose} className="w-9 h-9 rounded-full border border-grey-100 items-center justify-center">
            <X size={20} className="text-dark-75" />
          </TouchableOpacity>
          <CText className="absolute left-1/2 -translate-x-1/2 text-t3-bold">Âm {phoneticData.title}</CText>
          <TouchableOpacity className="relative w-[4.125rem] h-[2.5rem] rounded-lg scale-110" style={{ backgroundColor: "#F97316" }}>
            <Image source={require("../../assets/images/youpass-logo.png")} style={{ width: 60, height: 38, opacity: 0.3 }} resizeMode="cover" />
            <View className="absolute inset-0 items-center justify-center">
              <Ionicons name="play-circle" size={22} color="white" />
            </View>
          </TouchableOpacity>
        </View>

        <View className="flex flex-row gap-8 items-center w-full h-8">
          <View className="h-1.5 flex-1 bg-grey-100 rounded-full w-full relative">
            <View className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 bg-secondary-01 w-8 h-8 rounded-full flex items-center justify-center z-10" style={{ left: `${((questionIndex + 1) / totalItems * 100)}%` }}>
              <LoadingProgressSvg width={16} height={16} />
            </View>
            <View className="h-full bg-secondary-01 rounded-full" style={{ width: `${((questionIndex + 1) / totalItems * 100)}%` }} />
          </View>
          <CText className="text-t3-regular text-right">
            <CText className="font-bold text-secondary-01">{questionIndex + 1}</CText>/{totalItems}
          </CText>
        </View>

        <View className="flex-1 min-h-0 w-full border border-grey-100 rounded-3xl p-4 flex flex-col gap-6" style={{ shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}>
          <View className="flex-1 flex-row items-center gap-3">
            <TouchableOpacity
              onPress={() => handleChangeQuestion("previous")}
              disabled={currentIndex <= 0}
              className="w-10 h-10 rounded-full border border-gray-200 items-center justify-center flex-shrink-0"
              style={{ opacity: currentIndex <= 0 ? 0.3 : 1 }}
            >
              <Ionicons name="arrow-back" size={18} color="#374151" />
            </TouchableOpacity>
            {(result || draftResult) ? <ResultView currentQuestion={currentQuestion} result={result || draftResult} /> : <QuestionView currentQuestion={currentQuestion} />}
            <TouchableOpacity
              onPress={() => handleChangeQuestion("next")}
              disabled={currentIndex >= questions.length - 1}
              className="w-10 h-10 rounded-full border border-gray-200 items-center justify-center flex-shrink-0"
              style={{ opacity: currentIndex >= questions.length - 1 ? 0.3 : 1 }}
            >
              <Ionicons name="arrow-forward" size={18} color="#374151" />
            </TouchableOpacity>
          </View>
          <View className="items-center">
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <TouchableOpacity
                onPress={handleMicPress}
                className="w-10 h-10 rounded-full items-center justify-center bg-primary"
                activeOpacity={0.85}
              >
                <Ionicons name={isRecording ? "stop" : "mic"} size={26} color="white" />
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>

        <View className="flex flex-row justify-between items-center w-full">
          <View className="relative">
            <TouchableOpacity className="flex-row items-center justify-between gap-2 border border-gray-200 rounded-full py-2.5 px-4" onPress={() => setIsPhoneticDropdownOpen((prev) => !prev)}>
              <CText className="text-sm font-semibold">{phoneticData.title}</CText>
              <Ionicons name="chevron-down" size={14} color="#6B7280" />
            </TouchableOpacity>
            {isPhoneticDropdownOpen && <ScrollView style={{ maxHeight: 200 }} showsVerticalScrollIndicator className="absolute min-w-36 w-max bg-white z-50 top-full mt-2 border border-gray-200 rounded-2xl flex flex-col">
              {PHONETIC_DATA.map((p) => {
                const isSelected = p.id === selectedPhoneticId;
                return (
                  <TouchableOpacity key={p.id} onPress={() => handleSelectPhonetic(p)} className="px-3 py-2.5 flex flex-row gap-2 items-center justify-start">
                    <View className="w-4 h-4 border border-dark-75 bg-white rounded-full flex items-center justify-center">
                      {isSelected && <View className="w-2.5 h-2.5 aspect-square rounded-full flex-shrink-0 bg-dark-75" />}
                    </View>
                    <CText className="text-t3-medium">{p.title}</CText>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>}
          </View>
          <TouchableOpacity className="py-2.5 px-4 rounded-full bg-secondary-01">
            <CText className="text-white font-bold text-t3-bold">Nộp bài</CText>
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-1 mx-4 rounded-2xl border border-gray-100 overflow-hidden">
        <View className="px-4 pt-3 pb-2 flex-row items-center justify-between">
          <CText className="text-t3-bold">Danh sách luyện tập</CText>
        </View>
        <View className="flex-row border-b border-gray-100">
          {Object.values(FilterOption).map((tab: any, index: number) => (
            <TouchableOpacity key={`filter-${index}`} onPress={() => setFilterTab(tab.key)} className="flex-1 py-2.5 items-center">
              <CText className={cn("text-xs font-semibold", filterTab === tab.key ? "text-gray-900" : "text-gray-400")}>{tab.label}</CText>
              {filterTab === tab.key && <View className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
            </TouchableOpacity>
          ))}
        </View>
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {questions.map((w) => {
            const isActive = w.id === currentQuestion?.id;
            const draftResult = MAPPED_DRAFT_RESULT.get(w.id);
            return (
              <TouchableOpacity key={w.id} onPress={() => handleSelectWord(w.id)} className={cn("flex-row items-center px-4 py-3", isActive && "bg-white-25")}>
                <CText className="flex-1 w-full min-w-0 line-clamp-2 text-t3-regular">{w.title}</CText>
                {draftResult && draftResult.status !== null && <CText className={cn("text-t3-bold", draftResult.status === 1 ? "text-secondary-01" : "text-redcolor-500")}>{draftResult.score}%</CText>}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView >
  );
}
