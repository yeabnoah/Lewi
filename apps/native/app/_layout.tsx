import { setAndroidNavigationBar } from "@/lib/android-navigation-bar";
import { NAV_THEME } from "@/lib/constants";
import { useColorScheme } from "@/lib/use-color-scheme";
import TanStackQueryProvider from "@/providers/query-provider";
import {
  DarkTheme,
  DefaultTheme,
  type Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useRef, useState, useEffect } from "react";
import { ActivityIndicator, Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../global.css";
import { authClient } from "@/lib/auth-client";
import { OnboardingUtils } from "@/lib/onboarding-utils";

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export const unstable_settings = {
  initialRouteName: "(drawer)",
};

export default function RootLayout() {
  const hasMounted = useRef(false);
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(
    null
  );
  const { data: session, isPending } = authClient.useSession();

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === "web") {
      document.documentElement.classList.add("bg-background");
    }
    setAndroidNavigationBar(colorScheme);
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  // Check if user has seen onboarding
  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const hasCompleted = await OnboardingUtils.hasCompletedOnboarding();
      setHasSeenOnboarding(hasCompleted);
    };

    checkOnboardingStatus();
  }, []);

  if (!isColorSchemeLoaded || isPending || hasSeenOnboarding === null) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  // Show onboarding for first-time users
  if (!hasSeenOnboarding && !session) {
    return (
      <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
        <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
        <GestureHandlerRootView style={{ flex: 1 }}>
          <TanStackQueryProvider>
            <Stack>
              <Stack.Screen
                name="(onboarding)"
                options={{ headerShown: false }}
              />
            </Stack>
          </TanStackQueryProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    );
  }

  if (!session) {
    return (
      <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
        <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
        <GestureHandlerRootView style={{ flex: 1 }}>
          <TanStackQueryProvider>
            <Stack>
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            </Stack>
          </TanStackQueryProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <TanStackQueryProvider>
          <Stack>
            <Stack.Screen name="(main)" options={{ headerShown: false }} />
            <Stack.Screen
              name="modal"
              options={{ title: "Modal", presentation: "modal" }}
            />
          </Stack>
        </TanStackQueryProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined"
    ? React.useEffect
    : React.useLayoutEffect;
