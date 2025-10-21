import { Calendar01Icon, Camera01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import * as Haptic from "expo-haptics";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function QuickActions() {
  return (
    <View className="mx-1 mb-4">
      <Text className="text-white text-lg font-semibold mb-4">
        Quick Actions
      </Text>

      <View className="flex-row justify-between">
        {/* Add to Wardrobe Card */}
        <Pressable
          onPress={() => {
            Haptic.selectionAsync();
            router.push("/(main)/(tabs)/wardrobe");
          }}
          className="flex-1 mr-2 bg-zinc-900/50 rounded-2xl p-4 border border-white/5"
        >
          <View className="items-center">
            {/* Gradient Icon Background */}
            <View
              className="w-12 h-12 rounded-full items-center justify-center mb-3"
              style={{
                backgroundColor: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
              }}
            >
              <View
                className="w-12 h-12 rounded-full items-center justify-center"
                style={{
                  backgroundColor: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                }}
              >
                <HugeiconsIcon icon={Camera01Icon} color="white" size={24} />
              </View>
            </View>

            <Text className="text-white text-sm font-semibold mb-1 text-center">
              Add to Wardrobe
            </Text>
            <Text className="text-white/60 text-xs text-center">
              Snap & organize
            </Text>
          </View>
        </Pressable>

        {/* Style Match Card */}
        <Pressable
          onPress={() => {
            Haptic.selectionAsync();
            router.push("/(main)/(tabs)/event");
          }}
          className="flex-1 ml-2 bg-zinc-900/50 rounded-2xl p-4 border border-white/5"
        >
          <View className="items-center">
            {/* Gradient Icon Background */}
            <View
              className="w-12 h-12 rounded-full items-center justify-center mb-3"
              style={{
                backgroundColor: "linear-gradient(135deg, #F59E0B, #FCD34D)",
              }}
            >
              <View
                className="w-12 h-12 rounded-full items-center justify-center"
                style={{
                  backgroundColor: "linear-gradient(135deg, #F59E0B, #FCD34D)",
                }}
              >
                <HugeiconsIcon icon={Calendar01Icon} color="white" size={24} />
              </View>
            </View>

            <Text className="text-white text-sm font-semibold mb-1 text-center">
              Style Planner
            </Text>
            <Text className="text-white/60 text-xs text-center">
              Plan your events
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
