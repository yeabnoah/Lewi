import { useColorScheme } from "@/lib/use-color-scheme";
import { AiGenerativeIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Link } from "expo-router";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <SafeAreaView className="flex-1 bg-zinc-900">
      {/* Header Section */}
      <View className="flex-1 justify-center items-center px-6">
        {/* Logo / Brand */}
        <View className="items-center mb-8">
          <View className="w-20 h-20 rounded-2xl mb-6 items-center justify-center shadow-xl shadow-black/20 bg-lewi">
            <HugeiconsIcon icon={AiGenerativeIcon} size={32} color="#0A0A0A" />
          </View>

          <Text className="text-4xl font-bold tracking-tight text-lewi mb-3">
            lewi.ai
          </Text>

          <Text className="text-base text-center leading-6 max-w-xs text-white/80">
            Your personal AI stylist
          </Text>
        </View>
      </View>

      {/* Bottom Section */}
      <View className="bg-zinc-800/50 rounded-t-3xl px-6 py-10 shadow-2xl shadow-black/20">
        <View className="items-center mb-8">
          <Text className="text-3xl font-bold mb-2 text-white">
            Welcome Back
          </Text>
          <Text className="text-center text-white/70 text-base">
            Discover your perfect style with AI
          </Text>
        </View>

        {/* Buttons */}
        <View className="gap-4">
          <Link href="/login" asChild>
            <Pressable className="bg-white rounded-2xl py-4 shadow-lg shadow-black/20">
              <Text className="text-center font-semibold text-lg text-black">
                Sign In
              </Text>
            </Pressable>
          </Link>

          <Link href="/signup" asChild>
            <Pressable className="bg-zinc-700 rounded-2xl py-4 shadow-lg shadow-black/20">
              <Text className="text-center font-semibold text-lg text-white">
                Create Account
              </Text>
            </Pressable>
          </Link>
        </View>

        {/* Terms */}
        <View className="mt-8 pt-6 border-t border-zinc-700">
          <Text className="text-center text-xs text-white/60">
            By continuing, you agree to our{" "}
            <Text className="text-white underline">Terms</Text> and{" "}
            <Text className="text-white underline">Privacy Policy</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;
