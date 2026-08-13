import { Tabs } from "expo-router";
import { House, User } from "lucide-react-native";
import { Platform } from "react-native";

const ACTIVE_COLOR = "#F15F22";
const INACTIVE_COLOR = "#8E8E93";

export const unstable_settings = { anchor: "index" };

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: ACTIVE_COLOR,
        tabBarInactiveTintColor: INACTIVE_COLOR,
        tabBarLabelStyle: {
          fontFamily: "Nunito_600SemiBold",
          fontSize: 12,
        },
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopColor: "#E5E5EA",
          height: Platform.OS === "ios" ? 88 : 64,
          paddingTop: 6,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <House color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: "User",
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
