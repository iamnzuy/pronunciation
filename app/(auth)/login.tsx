import { CText, CTextInput } from "@/components/CText";
import { AxiosAPI, setAuthToken } from "@/lib/axios";
import { getOrCreateDeviceId } from "@/lib/use-device-hook";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function login(username: string, password: string): Promise<{ token: string; user: any }> {
    const deviceId = await getOrCreateDeviceId();
    const res = await AxiosAPI.post("/v1/login", { username, password }, {
      headers: { "X-Device-Id": deviceId },
    });
    console.log(res.data?.data?.access_token);
    const access_token = res.data?.data?.access_token;
    if (!access_token) throw new Error("Không nhận được token từ server");
    await setAuthToken(access_token);
    return { token: access_token, user: res.data?.data ?? res.data };
  }

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError("Vui lòng nhập email và mật khẩu");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await login(email.trim(), password);
      router.replace("/course" as never);
    } catch (err: any) {
      const msg = err?.response?.data?.message ?? err?.message ?? "Đăng nhập thất bại";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Back button */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="px-6 pt-4 pb-2"
          >
            <CText className="text-gray-500 text-base">← Quay lại</CText>
          </TouchableOpacity>

          <View className="px-6 flex-1">
            <View className="items-center mt-6 mb-10">
              <Image
                source={require("../../assets/images/youpass-logo.png")}
                style={{ height: 48, width: 144 }}
                resizeMode="contain"
              />
              <CText className="text-gray-400 text-sm mt-2">
                Developed by IELTS 1984
              </CText>
            </View>

            {/* Title */}
            <CText className="text-2xl font-bold text-gray-900 mb-1">
              Chào mừng trở lại! 👋
            </CText>
            <CText className="text-gray-500 text-sm mb-8">
              Đăng nhập để tiếp tục hành trình IELTS của bạn
            </CText>

            {/* Email */}
            <View className="mb-4">
              <CText className="text-gray-700 text-sm font-semibold mb-2">
                Email
              </CText>
              <View className="border border-gray-200 rounded-2xl px-4 py-3 bg-gray-50 flex-row items-center">
                <CText className="mr-3 text-gray-400">📧</CText>
                <CTextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="email@example.com"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="flex-1 text-gray-900 text-base"
                />
              </View>
            </View>

            {/* Password */}
            <View className="mb-2">
              <CText className="text-gray-700 text-sm font-semibold mb-2">
                Mật khẩu
              </CText>
              <View className="border border-gray-200 rounded-2xl px-4 py-3 bg-gray-50 flex-row items-center">
                <CText className="mr-3 text-gray-400">🔒</CText>
                <CTextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Nhập mật khẩu"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showPassword}
                  className="flex-1 text-gray-900 text-base"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <CText className="text-gray-400 text-sm">
                    {showPassword ? "Ẩn" : "Hiện"}
                  </CText>
                </TouchableOpacity>
              </View>
            </View>

            {/* Forgot password */}
            <TouchableOpacity className="self-end mb-4">
              <CText className="text-primary text-sm font-medium">
                Quên mật khẩu?
              </CText>
            </TouchableOpacity>

            {/* Error message */}
            {!!error && (
              <View className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4">
                <CText className="text-red-500 text-sm">{error}</CText>
              </View>
            )}

            {/* Login button */}
            <TouchableOpacity
              onPress={handleLogin}
              disabled={loading}
              className="bg-primary rounded-2xl py-4 items-center mb-4"
              style={{ opacity: loading ? 0.7 : 1 }}
            >
              {loading
                ? <ActivityIndicator color="white" />
                : <CText className="text-white text-lg font-bold">Đăng nhập</CText>
              }
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center mb-4">
              <View className="flex-1 h-px bg-gray-200" />
              <CText className="mx-4 text-gray-400 text-sm">hoặc</CText>
              <View className="flex-1 h-px bg-gray-200" />
            </View>

            {/* Social login */}
            <TouchableOpacity className="border border-gray-200 rounded-2xl py-4 items-center flex-row justify-center mb-3">
              <CText className="mr-2 text-lg">🌐</CText>
              <CText className="text-gray-700 font-semibold">
                Tiếp tục với Google
              </CText>
            </TouchableOpacity>

            {/* Register */}
            <View className="flex-row justify-center mt-6 pb-8">
              <CText className="text-gray-500 text-sm">Chưa có tài khoản? </CText>
              <TouchableOpacity>
                <CText className="text-primary text-sm font-bold">Đăng ký</CText>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
