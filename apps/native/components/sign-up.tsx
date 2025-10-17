import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { router } from "expo-router";

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  const handleSignUp = async () => {
    setIsLoading(true);
    setError(null);

    await authClient.signUp.email(
      { name, email, password },
      {
        onError: (error) => {
          setError(error.error?.message || "Failed to sign up");
          setIsLoading(false);
        },
        onSuccess: () => {
          setName("");
          setEmail("");
          setPassword("");
          router.push("/(auth)/login");
        },
        onFinished: () => {
          setIsLoading(false);
        },
      }
    );
  };

  return (
    <View
      className={`flex-1 items-center justify-center px-6 ${
        isDark ? "bg-black" : "bg-white"
      }`}
    >
      {/* Main Card */}
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
            Create Account
          </Text>
          <Text
            className={`text-center mt-2 ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Join Lewi and start your style journey today
          </Text>
        </View>

        {/* Inputs */}
        <View className="space-y-5">
          <View>
            <Text
              className={`font-semibold mb-2 text-base ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Name
            </Text>
            <TextInput
              className={`p-4 rounded-2xl border text-base ${
                isDark
                  ? "bg-zinc-800 text-white border-zinc-700 focus:border-lewi"
                  : "bg-gray-50 text-gray-900 border-gray-200 focus:border-lewi focus:bg-white"
              }`}
              placeholder="Your name"
              placeholderTextColor="#9CA3AF"
              value={name}
              onChangeText={setName}
            />
          </View>

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
              placeholder="Your email"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
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
              placeholder="Create a password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {error && (
            <Text className="text-red-500 text-sm text-center">{error}</Text>
          )}

          {/* Sign Up Button */}
          <TouchableOpacity
            onPress={handleSignUp}
            disabled={isLoading}
            className="bg-lewi rounded-2xl py-4 shadow-md flex-row justify-center items-center mt-2"
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#000" />
            ) : (
              <Text className="text-black font-bold text-lg">Sign Up</Text>
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

        {/* Social Buttons */}
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

        <View className="items-center mt-10">
          <Text
            className={`text-base ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Already have an account?{" "}
            <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
              <Text className="text-lewi font-semibold">Sign In</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </View>
  );
}
