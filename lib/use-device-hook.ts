import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Application from "expo-application";
import * as Device from "expo-device";

const DEVICE_ID_KEY = "device_id";

export async function getOrCreateDeviceId(): Promise<string> {
  // Trả về cached ID nếu đã có
  const cached = await AsyncStorage.getItem(DEVICE_ID_KEY);
  if (cached) return cached;

  let id: string | null = null;

  try {
    if (Device.isDevice) {
      // Thiết bị thật: dùng ID gốc của thiết bị
      if (Application.getAndroidId) {
        id = Application.getAndroidId();
      } else {
        id = await Application.getIosIdForVendorAsync?.() ?? null;
      }
    }
  } catch (error) {
    console.warn("Could not get native device ID, falling back to random ID", error);
  }

  if (!id) {
    id = `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
  }

  await AsyncStorage.setItem(DEVICE_ID_KEY, id);
  return id;
}
