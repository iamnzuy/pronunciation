import useSWR from "swr";
import { configSWR } from "@/lib/utils";

export const useClass = () => {
    const { data, isLoading } = useSWR("/v1/classes/669", configSWR);
    return {
        data: data?.data?.data,
        isLoading
    };
};