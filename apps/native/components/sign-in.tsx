import { authClient } from "@/lib/auth-client";
import { useColorScheme } from "@/lib/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const { isDarkColorScheme } = useColorScheme();

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await authClient.signIn.email(
        { email, password },
        {
          onError: (error) => {
            console.error("Sign in error:", error);
            setError(error.error?.message || "Failed to sign in");
            setIsLoading(false);
          },
          onSuccess: () => {
            setEmail("");
            setPassword("");
            router.push("/(main)/(tabs)");
          },
          onFinished: () => setIsLoading(false),
        }
      );
    } catch (error) {
      console.error("Network error:", error);
      setError("Network error. Please check your connection and try again.");
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 items-center justify-center px-6">
      {/* Main content */}
      <View className="w-full max-w-md">
        {/* Header */}
        <View className="mb-8">
          <Text className="text-3xl font-bold text-center text-white">
            Welcome Back
          </Text>
          <Text className="text-center mt-2 text-white/70">
            Sign in to continue your journey with Lewi
          </Text>
        </View>

        {/* Input fields */}
        <View className="space-y-5">
          <View>
            <Text className="font-semibold mb-2 text-base text-white">
              Email
            </Text>
            <TextInput
              style={{
                paddingHorizontal: 16,
                paddingVertical: 16,
                borderRadius: 16,
                fontSize: 14,
                marginBottom: 8,
                backgroundColor: "rgba(63, 63, 70, 0.5)",
                color: "white",
              }}
              placeholder="Enter your email"
              placeholderTextColor="#9CA3AF"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>

          <View>
            <Text className="font-semibold mb-2 text-base text-white">
              Password
            </Text>
            <View className="relative">
              <TextInput
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 16,
                  paddingRight: 50,
                  borderRadius: 16,
                  fontSize: 14,
                  marginBottom: 8,
                  backgroundColor: "rgba(63, 63, 70, 0.5)",
                  color: "white",
                }}
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoComplete="password"
              />
              <Pressable
                onPress={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: 16,
                  top: "50%",
                  transform: [{ translateY: -10 }],
                  padding: 4,
                }}
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={20}
                  color="#9CA3AF"
                />
              </Pressable>
            </View>
          </View>

          {error && (
            <Text className="text-red-500 text-sm text-center">{error}</Text>
          )}

          <View className="items-end">
            <TouchableOpacity>
              <Text className="font-medium text-white/70">
                Forgot password?
              </Text>
            </TouchableOpacity>
          </View>

          {/* Sign in button */}
          <Pressable
            onPress={handleLogin}
            disabled={isLoading}
            className="bg-white mt-5 rounded-2xl py-4 shadow-md flex-row justify-center items-center "
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#000" />
            ) : (
              <Text className="text-black font-bold text-lg">Sign In</Text>
            )}
          </Pressable>
        </View>

        {/* Divider */}
        <View className="flex-row items-center my-8">
          <View className="flex-1 h-px bg-zinc-600" />
          <Text className="mx-4 font-medium text-white/50">or</Text>
          <View className="flex-1 h-px bg-zinc-600" />
        </View>

        {/* Social buttons */}
        <View className="space-y-3">
          <Pressable className="rounded-2xl py-4 flex-row justify-center items-center  bg-zinc-700/30 ">
            <Text className="font-semibold text-base text-white">
              Continue with Google
            </Text>
          </Pressable>
        </View>

        {/* Sign up */}
        <View className="items-center mt-10">
          <Text className="text-base text-white/70">
            Don't have an account?{" "}
            <Pressable onPress={() => router.push("/(auth)/signup")}>
              <Text className="text-white font-semibold">Sign Up</Text>
            </Pressable>
          </Text>
        </View>

        {/* Terms */}
        <Text className="text-center text-xs mt-8 leading-5 text-white/50">
          By continuing, you agree to our{" "}
          <Text className="font-medium text-white">Terms of Service</Text> and{" "}
          <Text className="font-medium text-white">Privacy Policy</Text>.
        </Text>
      </View>
    </View>
  );
}
