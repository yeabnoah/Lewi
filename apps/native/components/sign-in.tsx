import { authClient } from "@/lib/auth-client";
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

  const handleLogin = async ({ className }: { className: string }) => {
    setIsLoading(true);
    setError(null);

    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onError: (error) => {
          setError(error.error?.message || "Failed to sign in");
          setIsLoading(false);
        },
        onSuccess: () => {
          setEmail("");
          setPassword("");
          router.push("/(main)/(tabs)");
        },
        onFinished: () => {
          setIsLoading(false);
        },
      }
    );
  };

  return (
    <View className="flex-1 bg-background">
      {/* Hero Section */}
      <View className="flex-1 justify-center items-center px-8 relative">
        <View className="items-center mb-8">
          <View className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl mb-4 items-center justify-center shadow-2xl">
            <Text className="text-2xl font-bold p0 bg-lewi size-24 rounded-full"></Text>
          </View>
          <Text className="text-4xl mt-8 font-bold text-lewi mb-2 tracking-tight">
            lewi.ai
          </Text>
        </View>
      </View>

      {/* Auth Section */}
      <View className="bg-lewi/90 rounded-t-[28] px- py-10 shadow-2xl">
        <View className="items-center mb-8">
          <Text className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </Text>
          <Text className="text-gray-600 text-center leading-6">
            Sign in to your account
          </Text>
        </View>

        {error && (
          <View className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
            <Text className="text-red-600 text-sm text-center">{error}</Text>
          </View>
        )}

        <View className="space-y-4">
          <View>
            <TextInput
              className="p-4 rounded-2xl bg-white text-gray-900 border border-gray-200 text-base"
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View>
            <TextInput
              className="p-4 rounded-2xl bg-white text-gray-900 border border-gray-200 text-base"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#9CA3AF"
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            onPress={() => handleLogin({ className: "w-full" })}
            disabled={isLoading}
            className="bg-black rounded-2xl py-4 shadow-lg flex-row justify-center items-center"
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text className="text-white text-center font-semibold text-lg">
                Sign In
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-8 pt-6">
          <Text className="text-center text-gray-500 text-xs">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </View>
    </View>
  );
}
