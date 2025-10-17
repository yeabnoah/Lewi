import { authClient } from "@/lib/auth-client";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scheme = useColorScheme();
  const isDark = scheme === "dark";

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
    <View
      className={`flex-1 items-center justify-center px-6 ${
        isDark ? "bg-black" : "bg-white"
      }`}
    >
      {/* Main card */}
      <View
        className={`w-full max-w-md rounded-3xl p-8 shadow-xl border ${
          isDark ? "bg-zinc-900 border-zinc-800" : "bg-white border-gray-100"
        }`}
      >
        {/* Header */}
        <View className="mb-8">
          <Text
            className={`text-3xl font-extrabold text-center ${
              isDark ? "text-white" : "text-black"
            }`}
          >
            Welcome Back
          </Text>
          <Text
            className={`text-center mt-2 ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Sign in to continue your journey with Lewi
          </Text>
        </View>

        {/* Input fields */}
        <View className="space-y-5">
          <View>
            <Text
              className={`font-semibold mb-2 text-base ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Email
            </Text>
            <TextInput
              className={`p-4 rounded-2xl border text-base ${
                isDark
                  ? "bg-zinc-800 text-white border-zinc-700 focus:border-lewi"
                  : "bg-gray-50 text-gray-900 border-gray-200 focus:border-lewi focus:bg-white"
              }`}
              placeholder="Enter your email"
              placeholderTextColor={isDark ? "#9CA3AF" : "#9CA3AF"}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>

          <View>
            <Text
              className={`font-semibold mb-2 text-base ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Password
            </Text>
            <TextInput
              className={`p-4 rounded-2xl border text-base ${
                isDark
                  ? "bg-zinc-800 text-white border-zinc-700 focus:border-lewi"
                  : "bg-gray-50 text-gray-900 border-gray-200 focus:border-lewi focus:bg-white"
              }`}
              placeholder="Enter your password"
              placeholderTextColor={isDark ? "#9CA3AF" : "#9CA3AF"}
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
              <Text
                className={`font-medium ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
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
          <View
            className={`flex-1 h-px ${isDark ? "bg-zinc-700" : "bg-gray-200"}`}
          />
          <Text
            className={`mx-4 font-medium ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            or
          </Text>
          <View
            className={`flex-1 h-px ${isDark ? "bg-zinc-700" : "bg-gray-200"}`}
          />
        </View>

        {/* Social buttons */}
        <View className="space-y-3">
          <TouchableOpacity
            className={`rounded-2xl py-4 flex-row justify-center items-center border ${
              isDark
                ? "bg-zinc-900 border-zinc-700"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <Text
              className={`font-semibold text-base ${
                isDark ? "text-white" : "text-gray-800"
              }`}
            >
              Continue with Google
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sign up */}
        <View className="items-center mt-10">
          <Text
            className={`text-base ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Don't have an account?{" "}
            <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
              <Text className="text-lewi font-semibold">Sign Up</Text>
            </TouchableOpacity>
          </Text>
        </View>

        {/* Terms */}
        <Text
          className={`text-center text-xs mt-8 leading-5 ${
            isDark ? "text-gray-500" : "text-gray-400"
          }`}
        >
          By continuing, you agree to our{" "}
          <Text className="font-medium text-lewi">Terms of Service</Text> and{" "}
          <Text className="font-medium text-lewi">Privacy Policy</Text>.
        </Text>
      </View>
    </View>
  );
}
