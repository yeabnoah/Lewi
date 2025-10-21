import { authClient } from "@/lib/auth-client";
import { useColorScheme } from "@/lib/use-color-scheme";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
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
              className="p-4 rounded-2xl border text-base bg-zinc-700/50 text-white border-zinc-600 focus:border-lewi"
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
            <TextInput
              className="p-4 rounded-2xl border text-base bg-zinc-700/50 text-white border-zinc-600 focus:border-lewi"
              placeholder="Enter your password"
              placeholderTextColor="#9CA3AF"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="password"
            />
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
          <TouchableOpacity
            onPress={handleLogin}
            disabled={isLoading}
            className="bg-lewi rounded-2xl py-4 shadow-md flex-row justify-center items-center mt-2"
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#000" />
            ) : (
              <Text className="text-black font-bold text-lg">Sign In</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View className="flex-row items-center my-8">
          <View className="flex-1 h-px bg-zinc-600" />
          <Text className="mx-4 font-medium text-white/50">or</Text>
          <View className="flex-1 h-px bg-zinc-600" />
        </View>

        {/* Social buttons */}
        <View className="space-y-3">
          <TouchableOpacity className="rounded-2xl py-4 flex-row justify-center items-center border bg-zinc-700/30 border-zinc-600">
            <Text className="font-semibold text-base text-white">
              Continue with Google
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sign up */}
        <View className="items-center mt-10">
          <Text className="text-base text-white/70">
            Don't have an account?{" "}
            <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
              <Text className="text-lewi font-semibold">Sign Up</Text>
            </TouchableOpacity>
          </Text>
        </View>

        {/* Terms */}
        <Text className="text-center text-xs mt-8 leading-5 text-white/50">
          By continuing, you agree to our{" "}
          <Text className="font-medium text-lewi">Terms of Service</Text> and{" "}
          <Text className="font-medium text-lewi">Privacy Policy</Text>.
        </Text>
      </View>
    </View>
  );
}
