import * as NavigationBar from "expo-navigation-bar";
import { Platform } from "react-native";
import { NAV_THEME } from "@/lib/constants";

export async function setAndroidNavigationBar(theme: "light" | "dark") {
  if (Platform.OS !== "android") return;

  try {
    await NavigationBar.setButtonStyleAsync(
      theme === "dark" ? "light" : "dark"
    );

    // Only set background color if edge-to-edge is not enabled
    // This prevents the warning about setBackgroundColorAsync not being supported with edge-to-edge
    await NavigationBar.setBackgroundColorAsync(
      theme === "dark" ? NAV_THEME.dark.background : NAV_THEME.light.background
    );
  } catch (error) {
    // Silently handle the error if setBackgroundColorAsync fails
    // This is expected when edge-to-edge is enabled
    console.warn("Navigation bar background color could not be set:", error);
  }
}
