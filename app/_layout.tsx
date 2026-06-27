import "react-native-gesture-handler";
import "react-native-reanimated";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { colors } from "../src/core/theme";
import { AppStateProvider } from "../src/features/app-state/AppStateProvider";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AppStateProvider>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            contentStyle: { backgroundColor: colors.background },
            headerShadowVisible: false,
            headerStyle: { backgroundColor: colors.background },
            headerTintColor: colors.textPrimary,
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: "800"
            }
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="listening/index" options={{ title: "Hören" }} />
          <Stack.Screen name="reading/index" options={{ title: "Lesen" }} />
          <Stack.Screen name="writing/index" options={{ title: "Schreiben" }} />
          <Stack.Screen name="speaking/index" options={{ title: "Sprechen" }} />
          <Stack.Screen name="trainer/index" options={{ title: "Fehlertrainer" }} />
        </Stack>
      </AppStateProvider>
    </SafeAreaProvider>
  );
}
