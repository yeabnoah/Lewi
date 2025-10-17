import { Link } from "expo-router";
import { Text, TouchableOpacity, View, useColorScheme } from "react-native";

const Index = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const theme = {
    lewi: "#DBFE01",
    bg: isDark ? "#0D0D0D" : "#FFFFFF",
    text: isDark ? "#F9FAFB" : "#111827",
    subtext: isDark ? "#9CA3AF" : "#4B5563",
    card: isDark ? "#1A1A1A" : "#F9FAFB",
    button: isDark ? "#F9FAFB" : "#000000",
    buttonText: isDark ? "#000000" : "#FFFFFF",
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      {/* Center Section */}
      <View className="flex-1 justify-center items-center px-8">
        {/* Logo / Brand */}
        <View className="items-center mb-8">
          <View
            className="w-20 h-20 rounded-2xl mb-6 items-center justify-center shadow-2xl"
            style={{ backgroundColor: theme.lewi }}
          >
            <Text className="text-3xl font-bold" style={{ color: "#000" }}>
              L
            </Text>
          </View>

          <Text
            className="text-4xl font-bold tracking-tight"
            style={{ color: theme.lewi }}
          >
            lewi.ai
          </Text>
        </View>

        <Text
          className="text-base text-center leading-6 max-w-xs"
          style={{ color: theme.subtext }}
        >
          Your personal AI stylist — discover, plan, and perfect your look with
          Lewi.
        </Text>
      </View>

      {/* Bottom Section */}
      <View
        className="rounded-t-3xl px-8 py-10 shadow-2xl"
        style={{
          backgroundColor: theme.lewi,
        }}
      >
        <View className="items-center mb-8">
          <Text className="text-3xl font-bold mb-2" style={{ color: "#000" }}>
            Welcome Back
          </Text>
          <Text className="text-center leading-6 text-gray-800">
            Discover your perfect style with AI.
          </Text>
        </View>

        {/* Buttons */}
        <View style={{ gap: 14 }}>
          <Link href="/login" asChild>
            <TouchableOpacity
              className="rounded-2xl py-4 shadow-lg"
              style={{ backgroundColor: theme.button }}
            >
              <Text
                className="text-center font-semibold text-lg"
                style={{ color: theme.buttonText }}
              >
                Sign In
              </Text>
            </TouchableOpacity>
          </Link>

          <Link href="/signup" asChild>
            <TouchableOpacity
              className="rounded-2xl py-4 shadow-lg"
              style={{ backgroundColor: theme.button }}
            >
              <Text
                className="text-center font-semibold text-lg"
                style={{ color: theme.buttonText }}
              >
                Create Account
              </Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Terms */}
        <View className="mt-8 pt-6">
          <Text className="text-center text-xs" style={{ color: "#1F2937" }}>
            By continuing, you agree to our{" "}
            <Text style={{ textDecorationLine: "underline" }}>
              Terms of Service
            </Text>{" "}
            and{" "}
            <Text style={{ textDecorationLine: "underline" }}>
              Privacy Policy
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Index;
