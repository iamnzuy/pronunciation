import { CText } from "@/components/CText";
import { useAudioRecording } from "@/hooks/use-audio-recording";
import { PlayIconWithCircle, Volume2Icon } from "@/icons";
import { cn } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useRef } from "react";
import { Animated, TouchableOpacity, View } from "react-native";

export const Recorder = ({ currentQuestion }: { currentQuestion: any }) => {
    const { isRecording, recordedUri, toggleRecording, playRecording, playAudioUrl } = useAudioRecording();
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const pulseLoopRef = useRef<Animated.CompositeAnimation | null>(null);

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

    const handleMicPress = useCallback(() => {
        toggleRecording();
    }, [toggleRecording]);

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
            <View className={cn("flex-1 flex flex-row items-center justify-center gap-2 min-h-12 py-1 px-2 border border-[#e5e5ea] rounded-full", !recordedUri && "opacity-0 pointer-events-none")}>
                <PlayIconWithCircle className="w-6 h-6 flex-shrink-0" fill="#1d1d1f" />
                <TouchableOpacity onPress={playRecording} activeOpacity={0.8} className="h-8 px-3 rounded-full bg-secondary-01 flex items-center justify-center">
                    <CText className="text-t4-bold text-white">Nghe</CText>
                </TouchableOpacity>
            </View>
        </View>
    )
}