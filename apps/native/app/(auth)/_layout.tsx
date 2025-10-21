import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{ headerShown: false, animation: "ios_from_right" }}
      initialRouteName="index"
    >
      <Stack.Screen options={{ headerShown: false }} name="index" />
      <Stack.Screen
        options={{ headerShown: false, animation: "ios_from_right" }}
        name="signup"
      />
      <Stack.Screen
        options={{ headerShown: false, animation: "ios_from_right" }}
        name="login"
      />
    </Stack>
  );
}
