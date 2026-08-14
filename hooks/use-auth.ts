import AxiosClient, { removeAuthToken } from "@/lib/axios";
import { getOrCreateDeviceId } from "@/lib/use-device-hook";
import { configSWR } from "@/lib/utils";
import useSWR from "swr";

export function useAuth(options?: any) {
  const { data: profile, error, mutate, } = useSWR("/v1/users/me", { ...configSWR, revalidateOnFocus: true, shouldRetryOnError: false, ...(options || {}), });

  const login = async () => {
    await mutate();
  };

  const logout = async () => {
    const deviceId = await getOrCreateDeviceId();

    try {
      await AxiosClient.post("/devices/logout", { device_id: deviceId });
    } catch {
    }

    await removeAuthToken();
    await mutate(null, { revalidate: false });
  };

  const firstLoading = profile === undefined && error === undefined;
  const profileObj = profile?.data?.data || {};

  return {
    isLogin: firstLoading ? null : !!profile,
    profile: profileObj,
    courses: profileObj?.active_courses?.filter((course: any) => course?.product_id),
    error,
    login,
    logout,
    firstLoading,
    mutate,
  };
}
