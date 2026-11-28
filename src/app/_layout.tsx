import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

import "../i18n";
import { initMonitoring } from "../services/monitoring";

initMonitoring();

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  );
}
