import { LoginScreen } from "@/components/auth/login-screen";

// import { OnboardingScreen } from "@/components/auth/onboarding-screen";
// import { useState } from "react";

export default function UserTab() {
  // const [showLogin, setShowLogin] = useState(false);
  // if (!showLogin) return <OnboardingScreen onLogin={() => setShowLogin(true)} />;
  // return <LoginScreen showBack onBack={() => setShowLogin(false)} />;

  return <LoginScreen />;
}
