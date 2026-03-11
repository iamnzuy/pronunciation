import clsx from "clsx"
import { fetcherClient } from "./axios";

export function cn(...inputs: any[]) {
    return clsx(inputs)
}

export const configSWR = {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    fetcher: fetcherClient,
    errorRetryCount: 3,
  };