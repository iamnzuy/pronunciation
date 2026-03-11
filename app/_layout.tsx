import { Stack } from "expo-router";
import "./globals.css";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="practice/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="course" options={{ headerShown: false }} />
      <Stack.Screen name="quiz/[id]" options={{ headerShown: false }} />
    </Stack>
  );
}
