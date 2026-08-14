import { SetOptions, ACCESSIBLE, getGenericPassword, setGenericPassword, resetGenericPassword } from "react-native-keychain";

const AUTH_TOKEN_SERVICE = process.env.EXPO_PUBLIC_AUTH_TOKEN_SERVICE || "com.youpass.auth";

const KEYCHAIN_OPTIONS: SetOptions = {
  service: AUTH_TOKEN_SERVICE,
  accessible: ACCESSIBLE.AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY,
};

let cachedToken: string | null = null;

export const getAuthToken = async (): Promise<string | null> => {
  if (cachedToken) return cachedToken;

  try {
    const credentials = await getGenericPassword({ service: AUTH_TOKEN_SERVICE });
    cachedToken = credentials ? credentials.password : null;
  } catch (error) {
    console.warn("Không đọc được auth token từ Keychain", error);
    cachedToken = null;
  }

  return cachedToken;
}

export const setAuthToken = async (token: string): Promise<void> => {
  cachedToken = token;

  try {
    await setGenericPassword("auth_token", token, KEYCHAIN_OPTIONS);
  } catch (error) {
    console.warn("Không lưu được auth token vào Keychain", error);
  }
}

export const removeAuthToken = async (): Promise<void> => {
  cachedToken = null;

  try {
    await resetGenericPassword({ service: AUTH_TOKEN_SERVICE });
  } catch (error) {
    console.warn("Không xoá được auth token khỏi Keychain", error);
  }
}
