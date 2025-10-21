import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        // headerShown: false,
        animation: "ios_from_right",
        title: "Auth",
      }}
      initialRouteName="index"
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Auth",
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          headerShown: false,
          animation: "ios_from_right",
          title: "Auth",
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
          animation: "ios_from_right",
          title: "Auth",
        }}
      />
    </Stack>
  );
}
