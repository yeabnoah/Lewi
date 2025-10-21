import { authClient } from "@/lib/auth-client";
import { useColorScheme } from "@/lib/use-color-scheme";
import { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { isDarkColorScheme } = useColorScheme();

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
    <View className="flex-1 items-center justify-center px-6">
      <View className="w-full max-w-md">
        <View className="mb-8">
          <Text className="text-3xl font-bold text-center text-white">
            Create Account
          </Text>
          <Text className="text-center mt-2 text-white/70">
            Join Lewi and start your style journey today
          </Text>
        </View>

        {/* Inputs */}
        <View className="space-y-6">
          <View>
            <Text className="font-semibold mb-3 text-base text-white">
              Name
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
              placeholder="Your name"
              placeholderTextColor="#9CA3AF"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View>
            <Text className="font-semibold mb-3 text-base text-white">
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
              placeholder="Your email"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View>
            <Text className="font-semibold mb-2 text-base text-white">
              Password
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
            className="bg-lewi mt-5 rounded-2xl py-4 shadow-md flex-row justify-center items-center "
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
          <View className="flex-1 h-px bg-zinc-600" />
          <Text className="mx-4 font-medium text-white/50">or</Text>
          <View className="flex-1 h-px bg-zinc-600" />
        </View>

        {/* Social Buttons */}
        <View className="space-y-3">
          <TouchableOpacity className="rounded-2xl py-4 flex-row justify-center items-center  bg-zinc-700/30  ">
            <Text className="font-semibold text-base text-white">
              Continue with Google
            </Text>
          </TouchableOpacity>
        </View>

        <View className="items-center mt-10">
          <Text className="text-base text-white/70">
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
