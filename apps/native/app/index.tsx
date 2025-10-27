import { Redirect } from "expo-router";
import { authClient } from "@/lib/auth-client";
import { OnboardingUtils } from "@/lib/onboarding-utils";
import { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { AiGenerativeIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";

export default function Index() {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(
    null
  );
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const hasCompleted = await OnboardingUtils.hasCompletedOnboarding();
      setHasSeenOnboarding(hasCompleted);
    };

    checkOnboardingStatus();
  }, []);

  if (isPending || hasSeenOnboarding === null) {
    return (
      <View className="flex-1 bg-zinc-900 justify-center items-center">
        {/* Logo Animation */}
        <View className="items-center mb-8">
          <View className="w-20 h-20 rounded-2xl mb-4 items-center justify-center shadow-xl shadow-black/20 bg-lewi">
            <HugeiconsIcon icon={AiGenerativeIcon} size={40} color="#0A0A0A" />
          </View>
          <Text className="text-3xl font-bold tracking-tight text-lewi">
            lewi.ai
          </Text>
        </View>
        
        {/* Subtle Loading Indicator */}
        <ActivityIndicator size="small" color="#DBFE01" />
      </View>
    );
  }

  // Show onboarding for first-time users
  if (!hasSeenOnboarding && !session) {
    return <Redirect href="/(onboarding)" />;
  }

  // Show auth for users without session
  if (!session) {
    return <Redirect href="/(auth)" />;
  }

  // Show main app for authenticated users
  return <Redirect href="/(main)/(tabs)" />;
}


