import { usePhoneList } from "@/components/quiz/hooks/use-phonelist";
import { CText } from "@/components/CText";
import { useAudioRecording } from "@/hooks/use-audio-recording";
import { PlayIconWithCircle, Volume2Icon } from "@/icons";
import AxiosClient, { AxiosAPI } from "@/lib/axios";
import { cn } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Animated, TouchableOpacity, View } from "react-native";
import { PronunciationStore, setIsPracticing } from "@/components/practice/hooks/store";
import { useDraftAnswerPart } from "@/components/practice/hooks/use-draft-answer";
import { LoaderCircle } from "lucide-react-native";

export const Recorder = ({ currentQuestion }: { currentQuestion: any }) => {
    const { id: questionId } = currentQuestion || {};
    const { id: quizId, classId, pronunciation: partId } = useLocalSearchParams();
    const { mappedDraftResult } = useDraftAnswerPart();
    const currentDraftResult = mappedDraftResult?.get(questionId) || {} as any;

    const { mutate } = usePhoneList();
    const result = PronunciationStore((s) => s.result);
    const setResult = PronunciationStore((s) => s.setResult);
    const setModal = PronunciationStore((s) => s.setModal);
    const isPracticing = PronunciationStore((s) => s.isPracticing);
    const { isRecording, recordedUri, startRecording, stopRecording, playRecording, playAudioUrl } = useAudioRecording();
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const pulseLoopRef = useRef<Animated.CompositeAnimation | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isRecording) {
            pulseLoopRef.current = Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, { toValue: 1.2, duration: 500, useNativeDriver: true }),
                    Animated.timing(pulseAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
                ])
            );
            pulseLoopRef.current.start();
        } else {
            pulseLoopRef.current?.stop();
            pulseLoopRef.current = null;
            pulseAnim.setValue(1);
        }
    }, [isRecording, pulseAnim]);

    const submitAnswer = async (blob: any) => {
        setIsSubmitting(true);
        const audioBlob = new Blob([blob], { type: "audio/mpeg" });
        const formData = new FormData();
        formData.append("folder", "5481ceed-0b6c-447f-a2dd-e8bf5c4efe4d");
        formData.append("file", audioBlob);
        try {
            const res = await AxiosClient.post("/files", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            const { id: fileId } = res?.data?.data || {};
            const payload = {
                quiz_id: Number(quizId),
                part_id: Number(partId),
                question_id: Number(questionId),
                audio_url: process.env.EXPO_PUBLIC_CMS + "/assets/" + fileId,
                class_id: Number(classId),
                status: "draft",
                completed_duration: 0
            }
            const resAnswer = await AxiosAPI.post("/v1/pronunciation-practice/answer", payload);
            setResult(resAnswer?.data?.data);
            mutate();
        } catch (error: any) {
            console.log(error);
            setModal("errorUpload");
        } finally {
            setIsSubmitting(false);
            setIsPracticing(false);
        }
    };

    const handleMicPress = useCallback(async () => {
        if (isRecording) {
            await stopRecording();
            setIsPracticing(false);
            await submitAnswer(recordedUri);
        } else if (!isPracticing) {
            setIsPracticing(true);
            await startRecording();
        }
    }, [isRecording, startRecording, stopRecording, isPracticing]);

    return (
        <View className="flex flex-row items-center justify-between gap-4 w-full">
            <TouchableOpacity onPress={() => playAudioUrl(currentQuestion?.audio_url)} activeOpacity={0.8} className={cn("flex-1 flex flex-row items-center justify-center gap-2 min-h-12 py-1 px-2 border border-[#e5e5ea] rounded-full", !currentQuestion?.audio_url && "opacity-0 pointer-events-none")}>
                <Volume2Icon className="w-6 h-6 flex-shrink-0" fill="#1d1d1f" />
            </TouchableOpacity>
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }} className="flex-shrink-0">
                <TouchableOpacity onPress={handleMicPress} className="w-12 h-12 rounded-full items-center justify-center bg-primary" activeOpacity={0.85}>
                    <Ionicons name={isRecording ? "stop" : "mic"} size={26} color="white" />
                </TouchableOpacity>
            </Animated.View>
            <TouchableOpacity
                onPress={playRecording}
                activeOpacity={0.8}
                disabled={isSubmitting}
                className={cn(
                    "flex-1 flex flex-row items-center justify-center gap-2 min-h-12 py-1 px-2 border border-[#e5e5ea] rounded-full",
                    (!recordedUri && !currentDraftResult?.file_id) && "opacity-0 pointer-events-none",
                    isSubmitting && "opacity-80"
                )}
            >
                {isSubmitting ? (
                    <View className="h-8 w-8 items-center justify-center">
                        <ActivityIndicator size="small" color="#1d1d1f" />
                    </View>
                ) : (
                    <PlayIconWithCircle className="w-6 h-6 flex-shrink-0" fill="#1d1d1f" />
                )}
                {(result?.score === 0 || result?.score || currentDraftResult?.score === 0 || currentDraftResult?.score) && !isSubmitting && (
                    <View className={cn("h-8 px-3 rounded-full flex items-center justify-center", result?.status === 1 ? "bg-secondary-01" : "bg-teritary-01")}>
                        <CText className="text-t4-bold text-white">{result?.score ?? currentDraftResult?.score}%</CText>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    )
}