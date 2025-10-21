import * as SecureStore from "expo-secure-store";

export const OnboardingUtils = {
  /**
   * Check if user has completed onboarding
   */
  async hasCompletedOnboarding(): Promise<boolean> {
    try {
      const status = await SecureStore.getItemAsync("hasSeenOnboarding");
      return status === "true";
    } catch (error) {
      console.error("Error checking onboarding status:", error);
      return false;
    }
  },

  /**
   * Mark onboarding as completed
   */
  async markOnboardingCompleted(): Promise<void> {
    try {
      await SecureStore.setItemAsync("hasSeenOnboarding", "true");
    } catch (error) {
      console.error("Error marking onboarding as completed:", error);
    }
  },

  /**
   * Reset onboarding status (useful for testing)
   */
  async resetOnboardingStatus(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync("hasSeenOnboarding");
    } catch (error) {
      console.error("Error resetting onboarding status:", error);
    }
  },
};
