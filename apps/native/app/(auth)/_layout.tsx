import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{ headerShown: false, animation: "ios_from_right" }}
      initialRouteName="index"
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="login" />
    </Stack>
  );
}
