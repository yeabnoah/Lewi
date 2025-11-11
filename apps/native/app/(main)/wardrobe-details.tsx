import { authClient } from "@/lib/auth-client";
import { API_BASE_URL } from "@/lib/constants";
import { ArrowLeftIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import * as Haptic from "expo-haptics";
import { router, useLocalSearchParams } from "expo-router";
import { Alert, Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function WardrobeDetailsScreen() {
  const params = useLocalSearchParams();
  const queryClient = useQueryClient();

  const API_BASE = API_BASE_URL;

  // Parse the item data from params
  const item = params.item ? JSON.parse(params.item as string) : null;

  // Mutation for deleting wardrobe item
  const deleteWardrobeItemMutation = useMutation({
    mutationFn: async (itemId: string) => {
      const cookies = authClient.getCookie();
      if (!cookies) {
        throw new Error("Not authenticated");
      }

      const response = await axios.delete(
        `${API_BASE}/api/wardrobe`,
        {
          headers: {
            'Cookie': cookies,
          },
          data: { id: itemId },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch wardrobe data
      queryClient.invalidateQueries({ queryKey: ["wardrobe"] });
      Alert.alert("Success", "Item deleted successfully!", [
        { text: "OK", onPress: () => router.back() }
      ]);
    },
    onError: (error) => {
      console.error("Delete failed:", error);
      Alert.alert("Error", "Failed to delete item. Please try again.");
    },
  });

  if (!item) {
    return (
      <SafeAreaView className="flex-1 bg-black items-center justify-center">
        <Text className="text-white/60 text-base">Item not found</Text>
        <Pressable
          onPress={() => router.back()}
          className="mt-4 bg-white px-6 py-3 rounded-xl"
        >
          <Text className="text-black font-semibold">Go Back</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const handleBack = () => {
    Haptic.selectionAsync();
    router.back();
  };

  const handleDelete = () => {
    Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Medium);
    Alert.alert(
      "Delete Item",
      "Are you sure you want to delete this item? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteWardrobeItemMutation.mutate(item.id);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-black mx-[2vw]">
      {/* Header */}
      <View className="px-4 pt-[3%] pb-4">
        <Pressable onPress={handleBack} className="flex-row items-center">
          <HugeiconsIcon icon={ArrowLeftIcon} color="#DBFE01" size={24} />
          <Text className="text-white text-lg font-semibold ml-2">
            Item Details
          </Text>
        </Pressable>
      </View>

      {/* Content Container */}
      <ScrollView
        className="flex-1 px-2"
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Image Section */}
        <View className="w-full rounded-2xl overflow-hidden mb-4" style={{ height: 280 }}>
          <Image
            source={{ uri: item.imageUrl }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>

        {/* Item Details Card */}
        <View className="bg-zinc-900/60 rounded-2xl p-5 mb-4">
          <Text className="text-2xl font-bold text-white mb-5">
            Item Information
          </Text>
          
          <View className="gap-5">
            {/* Name */}
            <View className="pb-4 border-b border-white/10">
              <Text className="text-white/70 text-xs font-medium mb-2 uppercase tracking-wider">
                Name
              </Text>
              <Text className="text-white text-lg font-semibold">
                {item.name}
              </Text>
            </View>

            {/* Description */}
            {item.description && (
              <View className="pb-4 border-b border-white/10">
                <Text className="text-white/70 text-xs font-medium mb-2 uppercase tracking-wider">
                  Description
                </Text>
                <Text className="text-white text-base leading-5">
                  {item.description}
                </Text>
              </View>
            )}

            {/* Color & Category Row */}
            <View className="flex-row gap-4">
              <View className="flex-1">
                <Text className="text-white/70 text-xs font-medium mb-2 uppercase tracking-wider">
                  Color
                </Text>
                <Text className="text-white text-base font-semibold capitalize">
                  {item.color || "N/A"}
                </Text>
              </View>
              <View className="flex-1">
                <Text className="text-white/70 text-xs font-medium mb-2 uppercase tracking-wider">
                  Category
                </Text>
                <Text className="text-white text-base font-semibold capitalize">
                  {item.wardrobeCategory?.toLowerCase() || "N/A"}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="flex-row gap-3 pb-4">
          <Pressable
            onPress={handleDelete}
            disabled={deleteWardrobeItemMutation.isPending}
            className="flex-1 h-12 rounded-2xl items-center justify-center bg-red-500/20 border border-red-500/30 active:bg-red-500/30"
            style={{
              opacity: deleteWardrobeItemMutation.isPending ? 0.5 : 1,
            }}
          >
            <View className="flex-row items-center gap-2">
              <Ionicons name="trash-outline" size={18} color="#EF4444" />
              <Text className="text-red-500 font-semibold text-base">
                {deleteWardrobeItemMutation.isPending ? "Deleting..." : "Delete"}
              </Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

