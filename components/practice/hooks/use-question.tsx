import { configSWR } from "@/lib/utils";
import { useLocalSearchParams } from "expo-router";
import useSWR from "swr";

export const useQuestion = () => {
    const { pronunciation, id, classId } = useLocalSearchParams();
    const { data, isLoading } = useSWR(`/v1/pronunciation-practice/parts/${pronunciation}/questions?class_id=${classId}`, configSWR);

    return {
        data: data?.data?.data?.items || [],
        instruction: data?.data?.data?.instruction || "",
        id: data?.data?.data?.id || "",
        title: data?.data?.data?.title || "",
        isLoading,
    }
}