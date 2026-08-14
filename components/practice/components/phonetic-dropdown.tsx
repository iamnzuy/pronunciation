import { usePhoneList } from "@/components/quiz/hooks/use-phonelist";
import { CText } from "@/components/CText";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useQuestion } from "@/components/practice/hooks/use-question";

export const PhoneticDropdown = () => {
    const { pronunciation } = useLocalSearchParams();
    const [isPhoneticDropdownOpen, setIsPhoneticDropdownOpen] = useState(false);
    const { data: phoneticList } = usePhoneList();
    const { title: pronunciationTitle } = useQuestion();

    const handleSelectPhonetic = (phonetic: any) => {
        router.setParams({ pronunciation: phonetic.id });
        setIsPhoneticDropdownOpen(false);
    };

    return (
        <View className="relative">
            <TouchableOpacity className="flex-row items-center justify-between gap-2 border border-gray-200 rounded-full py-2.5 px-4" onPress={() => setIsPhoneticDropdownOpen((prev) => !prev)}>
                <CText className="text-t3-regular">{pronunciationTitle}</CText>
                <Ionicons name="chevron-down" size={14} color="#6B7280" />
            </TouchableOpacity>
            {isPhoneticDropdownOpen && <ScrollView style={{ maxHeight: 200 }} showsVerticalScrollIndicator className="absolute min-w-36 w-max bg-white z-50 top-full mt-2 border border-gray-200 rounded-2xl flex flex-col">
                {phoneticList.map((phonetic: any) => {
                    const isSelected = phonetic.id === pronunciation;
                    return (
                        <TouchableOpacity key={phonetic.id} onPress={() => handleSelectPhonetic(phonetic)} className="px-3 py-2.5 flex flex-row gap-2 items-center justify-start">
                            <View className="w-4 h-4 border border-dark-75 bg-white rounded-full flex items-center justify-center">
                                {isSelected && <View className="w-2.5 h-2.5 aspect-square rounded-full flex-shrink-0 bg-dark-75" />}
                            </View>
                            <CText className="text-t3-medium">{phonetic.title}</CText>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>}
        </View>
    )
}