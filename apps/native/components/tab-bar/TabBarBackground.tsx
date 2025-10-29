import { View, StyleSheet } from "react-native";
import { useColorScheme } from "@/lib/use-color-scheme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function TabBarBackground() {
  const { isDarkColorScheme } = useColorScheme();
  const insets = useSafeAreaInsets();
  const backgroundColor = isDarkColorScheme 
    ? "#0A0A0A" 
    : "#FFFFFF";
  
  return (
    <View 
      style={[
        styles.container,
        { 
          backgroundColor,
          paddingBottom: insets.bottom,
        }
      ]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    // Add subtle shadow for depth
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
});

