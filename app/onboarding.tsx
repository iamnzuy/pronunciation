import { OnboardingScreen } from "@/components/auth/onboarding-screen";
import { router } from "expo-router";

export default function Onboarding() {
  return <OnboardingScreen onLogin={() => router.push("/login" as never)} />;
}
