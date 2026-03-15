import { configSWR } from "@/lib/utils";
import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import useSWR from "swr";

export const useDraftAnswerPart = () => {
    const { classId, pronunciation: pronunciationId } = useLocalSearchParams();

    const { data, isLoading, mutate } = useSWR(`/v1/pronunciation-practice/classes/${classId}/parts/${pronunciationId}/draft-result`, {
        ...configSWR,
        revalidateIfStale: true,
    });

    const { draft_result, progress, title = "", completed_duration = 0, id } = data?.data?.data || {};

    const mappedDraftResult = useMemo(() => {
        if (!draft_result || isLoading) return null;
        return new Map(draft_result?.map((item: any) => [item.question_id, item]) || []);
    }, [draft_result]);

    return {
        draft_result: draft_result || [],
        completed_duration,
        mappedDraftResult,
        progress,
        id,
        title,
        isLoading,
        mutate,
    }
}