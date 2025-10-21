import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
      initialRouteName="index"
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
