import LoadingProgressSvg from "@/assets/images/loading-progress.svg";
import BottomSheet from "@/components/BottomSheet";
import { CText } from "@/components/CText";
import Tooltip from "@/components/Tooltip";
import { generateStressMap } from "@/helpers";
import { cn } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { X } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Touchable, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ClassNames, FilterOption, FilterTab } from "./constant";
import { useQuestion } from "./hooks/use-question";
import { Recorder } from "./components/recorder";
import { PhoneticDropdown } from "./components/phonetic-dropdown";
import { usePhoneList } from "@/app/quiz/[id]/hooks/use-phonelist";
import { PronunciationStore } from "./hooks/store";
import { SkeletonPractice } from "./components/skeleton";
import { useDraftAnswerPart } from "./hooks/use-draft-answer";
import { getHighestStatus } from "./helpers";

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
          const textSizeClass = currentQuestion?.question_type === "WORD" ? "text-h3-bold" : currentQuestion?.question_type === "SENTENCE" ? "text-t1-bold" : "text-t2-medium";
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
          const textSizeClass = currentQuestion?.question_type === "WORD" ? "text-h3-bold" : currentQuestion?.question_type === "SENTENCE" ? "text-t1-bold" : "text-t2-medium";
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
        <CText className="text-t2-regular">
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
      <View className="flex flex-row flex-wrap items-center justify-center text-t4-regular gap-[0.25em]">
        <CText className="text-t4-regular text-dark-50 text-center">{currentQuestion?.content}</CText>
        <CText className="text-t4-regular text-dark-50 text-center">{currentQuestion?.word_class && `(${currentQuestion?.word_class})`}</CText>
      </View>
    )}
  </>)
}

export default function Practice() {
  const { result, currentQuestionIndex, setCurrentQuestionIndex, setResult } = PronunciationStore();
  const { data: questions, title: pronunciationTitle, instruction, isLoading: isLoadingQuestions } = useQuestion();
  const { isLoading: isLoadingPhoneList } = usePhoneList();
  const { mappedDraftResult } = useDraftAnswerPart();
  const [filterTab, setFilterTab] = useState<FilterTab>("all");

  const isLoading = isLoadingQuestions || isLoadingPhoneList;

  useEffect(() => {
    if (!isLoading) setResult(null);
  }, [currentQuestionIndex, isLoading]);

  if (isLoading) return <SkeletonPractice />;

  const currentQuestion = questions[currentQuestionIndex];
  const currentDraftResult = mappedDraftResult?.get(currentQuestion?.id) || null;

  const handleClose = () => router.back();

  const handleChangeQuestion = (type: "previous" | "next") => {
    if (type === "previous" && currentQuestionIndex > 0) setCurrentQuestionIndex(currentQuestionIndex - 1);
    else if (type === "next" && currentQuestionIndex < questions.length - 1) setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleSelectWord = (wordIndex: number) => {
    setCurrentQuestionIndex(wordIndex);
  };

  return (
    <SafeAreaView className="flex h-full flex-col justify-center gap-6 bg-white">
      <View className="relative w-full flex flex-col border-b border-grey-100 items-center gap-4 min-h-[56.9%] p-4" style={{ boxShadow: "-9px 16px 5px 0 rgba(0, 0, 0, 0.00), -6px 11px 5px 0 rgba(0, 0, 0, 0.01), -3px 6px 4px 0 rgba(0, 0, 0, 0.05), -1px 3px 3px 0 rgba(0, 0, 0, 0.09), 0 1px 2px 0 rgba(0, 0, 0, 0.10)" }}>
        <View className="flex-row items-center justify-between w-full">
          <TouchableOpacity onPress={handleClose} className="w-9 h-9 rounded-full border border-grey-100 items-center justify-center">
            <X size={20} className="text-dark-75" />
          </TouchableOpacity>
          <CText className="absolute left-1/2 -translate-x-1/2 text-t1-bold">Âm {pronunciationTitle}</CText>
          <View className="relative w-24 h-14 rounded-lg opacity-100">
            <Image source={{ uri: instruction?.video_thumbnail_url }} className="w-full h-full rounded-lg" resizeMode="contain" />
            <TouchableOpacity className="absolute inset-0 items-center justify-center">
              <Ionicons name="play-circle" size={22} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex flex-row gap-8 items-center w-full h-8 px-3">
          <View className="h-1.5 flex-1 bg-grey-100 rounded-full w-full relative">
            <View className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 bg-secondary-01 w-8 h-8 rounded-full flex items-center justify-center z-10" style={{ left: `${((currentQuestionIndex + 1) / questions.length * 100)}%` }}>
              <LoadingProgressSvg width={16} height={16} />
            </View>
            <View className="h-full bg-secondary-01 rounded-full" style={{ width: `${((currentQuestionIndex + 1) / questions.length * 100)}%` }} />
          </View>
          <CText className="text-t3-regular text-right">
            <CText className="font-bold text-secondary-01">{currentQuestionIndex + 1}</CText>/{questions.length}
          </CText>
        </View>

        <View className="flex-1 min-h-0 w-full border border-grey-100 rounded-3xl p-4 flex flex-col gap-6" style={{ shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}>
          <View className="flex-1 flex-row items-center gap-3">
            <TouchableOpacity
              onPress={() => handleChangeQuestion("previous")}
              disabled={currentQuestionIndex <= 0}
              className="w-10 h-10 rounded-full border border-gray-200 items-center justify-center flex-shrink-0"
              style={{ opacity: currentQuestionIndex <= 0 ? 0.3 : 1 }}
            >
              <Ionicons name="arrow-back" size={18} color="#374151" />
            </TouchableOpacity>
            {(result || currentDraftResult) ? <ResultView currentQuestion={currentQuestion} result={result || currentDraftResult} /> : <QuestionView currentQuestion={currentQuestion} />}
            <TouchableOpacity
              onPress={() => handleChangeQuestion("next")}
              disabled={currentQuestionIndex >= questions.length - 1}
              className="w-10 h-10 rounded-full border border-gray-200 items-center justify-center flex-shrink-0"
              style={{ opacity: currentQuestionIndex >= questions.length - 1 ? 0.3 : 1 }}
            >
              <Ionicons name="arrow-forward" size={18} color="#374151" />
            </TouchableOpacity>
          </View>
          <Recorder key={currentQuestionIndex} currentQuestion={currentQuestion} />
        </View>
        <View className="flex flex-row justify-between items-center w-full">
          <PhoneticDropdown />
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
          {questions.map((question: any, questionIndex: number) => {
            const isActive = question.id === currentQuestion?.id;
            const draftResult = mappedDraftResult?.get(question.id) || {} as any;
            const highestStatus = getHighestStatus(question, draftResult);
            if (filterTab === "not_passed" && highestStatus?.status !== 0) return null;
            if (filterTab === "not_practiced" && typeof highestStatus?.status === "number") return null;

            return (
              <TouchableOpacity key={question.id} onPress={() => handleSelectWord(questionIndex)} className={cn("flex-row items-center px-4 py-3", isActive && "bg-white-25")}>
                <CText className="flex-1 w-full min-w-0 line-clamp-2 text-t3-regular">{question.title}</CText>
                {(highestStatus?.status || highestStatus?.status == 0) && <CText className={cn("text-t3-bold", highestStatus?.status === 1 ? "text-secondary-01" : "text-redcolor-500")}>{highestStatus?.score}%</CText>}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView >
  );
}