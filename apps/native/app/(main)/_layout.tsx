import { Stack } from "expo-router";

export default function MainLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="add-meeting"
        options={{ headerShown: false, title: "Add Event" }}
      />
      <Stack.Screen
        name="account-settings"
        options={{ headerShown: false, title: "Account Settings" }}
      />
      <Stack.Screen
        name="profile-stats"
        options={{ headerShown: false, title: "Profile Stats" }}
      />
      <Stack.Screen name="notifications" options={{ title: "Notifications" }} />
      <Stack.Screen
        name="privacy-security"
        options={{ headerShown: false, title: "Privacy & Security" }}
      />
      <Stack.Screen
        name="help-support"
        options={{ headerShown: false, title: "Help & Support" }}
      />
    </Stack>
  );
}
