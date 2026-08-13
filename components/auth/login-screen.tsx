import { CText, CTextInput } from "@/components/CText";
import { useLogin } from "@/components/auth/hooks/use-login";
import { router } from "expo-router";
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

interface LoginScreenProps {
  showBack?: boolean;
  onBack?: () => void;
}

export const LoginScreen = ({ showBack = false, onBack }: LoginScreenProps) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    loading,
    error,
    submit,
  } = useLogin(() => router.push("/course" as never));

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
          {showBack && (
            <View className="flex-row items-center justify-between px-6 pb-2 pt-4">
              <TouchableOpacity onPress={onBack ?? (() => router.back())}>
                <CText className="text-base text-gray-500">← Quay lại</CText>
              </TouchableOpacity>
            </View>
          )}

          <View className="flex-1 px-6">
            <View className="mb-10 mt-6 items-center">
              <Image
                source={require("@/assets/images/youpass-logo.png")}
                style={{ height: 48, width: 144 }}
                resizeMode="contain"
              />
              <CText className="mt-2 text-sm text-gray-400">
                Developed by IELTS 1984
              </CText>
            </View>

            <CText className="mb-1 text-2xl font-bold text-gray-900">
              Chào mừng trở lại! 👋
            </CText>
            <CText className="mb-8 text-sm text-gray-500">
              Đăng nhập để tiếp tục hành trình IELTS của bạn
            </CText>

            <View className="mb-4">
              <CText className="mb-2 text-sm font-semibold text-gray-700">
                Email
              </CText>
              <View className="flex-row items-center rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
                <CText className="mr-3 text-gray-400">📧</CText>
                <CTextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="email@example.com"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="flex-1 text-base text-gray-900"
                />
              </View>
            </View>

            <View className="mb-2">
              <CText className="mb-2 text-sm font-semibold text-gray-700">
                Mật khẩu
              </CText>
              <View className="flex-row items-center rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
                <CText className="mr-3 text-gray-400">🔒</CText>
                <CTextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Nhập mật khẩu"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showPassword}
                  className="flex-1 text-base text-gray-900"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <CText className="text-sm text-gray-400">
                    {showPassword ? "Ẩn" : "Hiện"}
                  </CText>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity className="mb-4 self-end">
              <CText className="text-sm font-medium text-primary">
                Quên mật khẩu?
              </CText>
            </TouchableOpacity>

            {!!error && (
              <View className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                <CText className="text-sm text-red-500">{error}</CText>
              </View>
            )}

            <TouchableOpacity
              onPress={submit}
              disabled={loading}
              className="mb-4 items-center rounded-2xl bg-primary py-4"
              style={{ opacity: loading ? 0.7 : 1 }}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <CText className="text-lg font-bold text-white">Đăng nhập</CText>
              )}
            </TouchableOpacity>

            <View className="mb-4 flex-row items-center">
              <View className="h-px flex-1 bg-gray-200" />
              <CText className="mx-4 text-sm text-gray-400">hoặc</CText>
              <View className="h-px flex-1 bg-gray-200" />
            </View>

            <TouchableOpacity className="mb-3 flex-row items-center justify-center rounded-2xl border border-gray-200 py-4">
              <CText className="mr-2 text-lg">🌐</CText>
              <CText className="font-semibold text-gray-700">
                Tiếp tục với Google
              </CText>
            </TouchableOpacity>

            <View className="mt-6 flex-row justify-center pb-8">
              <CText className="text-sm text-gray-500">Chưa có tài khoản? </CText>
              <TouchableOpacity>
                <CText className="text-sm font-bold text-primary">Đăng ký</CText>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
