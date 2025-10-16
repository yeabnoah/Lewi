import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const Index = () => {
  return (
    <View className="flex-1 bg-background">
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

      <View className="bg-lewi/90 rounded-t-[28] px-8 py-10 shadow-2xl">
        <View className="items-center mb-8">
          <Text className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </Text>
          <Text className="text-gray-600 text-center leading-6">
            Discover your perfect style with AI.
          </Text>
        </View>

        <View className="space-y-4">
          <Link href="/login" asChild>
            <TouchableOpacity className="bg-black rounded-2xl py-4 shadow-lg">
              <Text className="text-white text-center font-semibold text-lg">
                Sign In
              </Text>
            </TouchableOpacity>
          </Link>

          <Link href="/signup" className="mt-5 w-full" asChild>
            <TouchableOpacity className="bg-black rounded-2xl py-4 shadow-lg">
              <Text className="text-white text-center font-semibold text-lg">
                Create Account
              </Text>
            </TouchableOpacity>
          </Link>
        </View>

        <View className="mt-8 pt-6">
          <Text className="text-center text-gray-500 text-xs">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Index;
