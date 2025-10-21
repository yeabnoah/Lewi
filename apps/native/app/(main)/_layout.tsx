import { Stack } from "expo-router";

export default function MainLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        animationDuration: 300,
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="add-meeting"
        options={{
          headerShown: false,
          title: "Add Event",
          animation: "slide_from_bottom",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="account-settings"
        options={{
          headerShown: false,
          title: "Account Settings",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="profile-stats"
        options={{
          headerShown: false,
          title: "Profile Stats",
          animation: "ios_from_right",
        }}
      />
      <Stack.Screen
        name="notifications"
        options={{
          title: "Notifications",
          animation: "ios_from_right",
        }}
      />
      <Stack.Screen
        name="privacy-security"
        options={{
          headerShown: false,
          title: "Privacy & Security",
          animation: "ios_from_right",
        }}
      />
      <Stack.Screen
        name="help-support"
        options={{
          headerShown: false,
          title: "Help & Support",
          animation: "ios_from_right",
        }}
      />
      <Stack.Screen
        name="add-cloth"
        options={{
          headerShown: false,
          title: "Add New Item",
          animation: "slide_from_bottom",
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
