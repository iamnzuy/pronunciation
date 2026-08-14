import { configSWR } from "@/lib/utils";
import { useRoute } from "@react-navigation/native";
import useSWR from "swr";

export const usePhoneList = () => {
    const route = useRoute();
    const { id } = route.params as { id: string };

    const { data, isLoading, mutate } = useSWR(`/v1/pronunciation-practice/quizzes/2158/sounds?class_id=669`, configSWR);
    return {
        data: data?.data?.data?.parts || [],
        isLoading,
        mutate,
    }
}