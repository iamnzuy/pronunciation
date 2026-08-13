import { AxiosAPI, setAuthToken } from "@/lib/axios";
import { getOrCreateDeviceId } from "@/lib/use-device-hook";
import { useState } from "react";

const MOCK_CREDENTIALS = { username: "test56@nomail.com", password: "123456" };

export const useLogin = (onSuccess: () => void) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const requestLogin = async (username: string, secret: string) => {
    const deviceId = await getOrCreateDeviceId();
    const res = await AxiosAPI.post(
      "/v1/login",
      { username, password: secret },
      { headers: { "X-Device-Id": deviceId } },
    );
    const accessToken = res.data?.data?.access_token;
    if (!accessToken) throw new Error("Không nhận được token từ server");
    await setAuthToken(accessToken);
  };

  const submit = async () => {
    const useMock = !email.trim() || !password.trim();
    const username = useMock ? MOCK_CREDENTIALS.username : email.trim();
    const secret = useMock ? MOCK_CREDENTIALS.password : password;

    setError("");
    setLoading(true);
    try {
      await requestLogin(username, secret);
      onSuccess();
    } catch (err: any) {
      setError(
        err?.response?.data?.message ?? err?.message ?? "Đăng nhập thất bại",
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    loading,
    error,
    submit,
  };
};
