import { Stack } from "expo-router";

export default function MainLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="add-meeting"
        options={{ headerShown: true, title: "Add Event" }}
      />
    </Stack>
  );
}
