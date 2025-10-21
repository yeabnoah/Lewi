import { Stack } from "expo-router";

export default function MainLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="add-meeting"
        options={{ headerShown: true, title: "Add Event" }}
      />
      <Stack.Screen
        name="account-settings"
        options={{ headerShown: true, title: "Account Settings" }}
      />
      <Stack.Screen
        name="profile-stats"
        options={{ headerShown: true, title: "Profile Stats" }}
      />
      <Stack.Screen name="notifications" options={{ title: "Notifications" }} />
      <Stack.Screen
        name="privacy-security"
        options={{ headerShown: true, title: "Privacy & Security" }}
      />
      <Stack.Screen
        name="help-support"
        options={{ headerShown: true, title: "Help & Support" }}
      />
    </Stack>
  );
}
