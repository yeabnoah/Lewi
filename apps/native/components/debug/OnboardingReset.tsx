import { OnboardingUtils } from "@/lib/onboarding-utils";
import { Text, TouchableOpacity, View } from "react-native";

export const OnboardingReset = () => {
  const handleResetOnboarding = async () => {
    await OnboardingUtils.resetOnboardingStatus();
    console.log(
      "Onboarding status reset - restart app to see onboarding again"
    );
  };

  return (
    <View className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg m-4">
      <Text className="text-red-400 text-sm font-semibold mb-2">
        Debug: Onboarding Reset
      </Text>
      <TouchableOpacity
        onPress={handleResetOnboarding}
        className="bg-red-500 rounded-lg py-2 px-4"
      >
        <Text className="text-white text-center font-semibold">
          Reset Onboarding Status
        </Text>
      </TouchableOpacity>
      <Text className="text-red-300 text-xs mt-2">
        This will reset onboarding status. Restart the app to see onboarding
        screens again.
      </Text>
    </View>
  );
};
