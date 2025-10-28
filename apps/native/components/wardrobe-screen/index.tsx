import ImageModal from "@/components/home-screen/ImageModal";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import {
  AddIcon,
  FilterHorizontalIcon,
  HeartAddIcon,
  SearchIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import * as Haptic from "expo-haptics";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WardrobeScreen() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const categories = [
    { id: "all", name: "All" },
    { id: "TOP", name: "Tops" },
    { id: "BOTTOM", name: "Bottoms" },
    { id: "DRESS", name: "Dresses" },
  ];

  const {
    data: wardrobeItems = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["wardrobe"],
    queryFn: async () => {
      const cookies = authClient.getCookie();
      if (!cookies) {
        throw new Error("Not authenticated");
      }

      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_CORS_ORIGIN!}/api/wardrobe`,
        {
          headers: {
            'Cookie': cookies,
          },
        }
      );

      return response.data?.wardrobe || [];
    },
    retry: 1,
    staleTime: 5 * 60 * 1000, 
  });

  const openImageModal = (imageSource: any) => {
    setSelectedImage(imageSource);
    setModalVisible(true);
  };

  const handleAddCloth = () => {
    Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Medium);
    router.push("/(main)/add-cloth");
  };

  const totalItems = wardrobeItems.length;
  const outfitsCreated = 42; 
  const mostWorn = 8; 

  const filteredItems = useMemo(() => {
    if (selectedCategory === "all") {
      return wardrobeItems;
    }
    return wardrobeItems.filter((item: any) => item.wardrobeCategory === selectedCategory);
  }, [selectedCategory, wardrobeItems]);

  const renderWardrobeItem = ({ item }: { item: any }) => (
    <View className="flex-1 mx-1 mb-4">
      <Pressable
        onPress={() => {
          Haptic.selectionAsync();
          openImageModal({ uri: item.imageUrl });
        }}
        className="bg-zinc-900/60 rounded-2xl overflow-hidden"
      >
        <View className="relative">
          <Image
            source={{ uri: item.imageUrl }}
            className="w-full h-48"
            resizeMode="cover"
          />
          <Pressable
            onPress={() => {
              Haptic.selectionAsync();
            }}
            className="absolute top-3 right-3 w-7 h-7 bg-white/20 rounded-full items-center justify-center"
          >
            <HugeiconsIcon icon={HeartAddIcon} color="#9CA3AF" size={16} />
          </Pressable>
        </View>
        <View className="p-4">
          <Text className="text-white font-semibold text-base mb-1">
            {item.name}
          </Text>
          <View className="flex-row items-center">
            <View className="w-2 h-2 bg-white/40 rounded-full mr-2" />
            <Text className="text-white/70 text-sm capitalize">
              {item.wardrobeCategory?.toLowerCase()} • {item.color}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 mx-[2vw]">
      {/* Sticky Header */}
      <View className="px-5 py-4 pt-[3%] backdrop-blur-sm">
        <View className="flex-row items-center justify-between ">
          <View>
            <Text className="text-white/60 text-sm font-medium mb-1">
              My Collection
            </Text>
            <Text className="text-2xl font-bold text-white">Wardrobe</Text>
          </View>
          <Pressable
            onPress={() => Haptic.selectionAsync()}
            className="h-11 w-11 rounded-full items-center justify-center bg-white/5 active:bg-white/10"
          >
            <HugeiconsIcon
              icon={FilterHorizontalIcon}
              size={18}
              color="white"
            />
          </Pressable>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        className="flex-1 px-5"
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View className="flex flex-row bg-zinc-900/60 rounded-2xl items-center px-4 mb-6">
          <HugeiconsIcon icon={SearchIcon} size={20} color="white" />
          <Input
            placeholder="Search your wardrobe..."
            className="h-14 flex-1 pl-3 text-white border-none border-0 text-lg"
            placeholderClassName="text-white/60 text-lg"
            style={{ backgroundColor: "transparent" }}
          />
        </View>

        {/* Category Filter Buttons */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-6"
          contentContainerStyle={{ paddingRight: 20 }}
        >
          <View className="flex-row gap-3">
            {categories.map((category) => (
              <Pressable
                key={category.id}
                onPress={() => {
                  Haptic.selectionAsync();
                  setSelectedCategory(category.id);
                }}
                className={`px-5 py-3 rounded-full ${
                  selectedCategory === category.id ? "bg-white" : "bg-white/10"
                }`}
              >
                <Text
                  className={`text-sm font-semibold ${
                    selectedCategory === category.id
                      ? "text-black"
                      : "text-white"
                  }`}
                >
                  {category.name}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>

        <View className="pb-6">
          <View className="flex-row justify-between mb-8">
            <View className="bg-zinc-900/60 rounded-2xl p-5 flex-1 mr-2">
              <Text className="text-3xl font-bold text-white text-center mb-1">
                {totalItems}
              </Text>
              <Text className="text-xs text-white/60 text-center font-medium">
                Total Items
              </Text>
            </View>
            <View className="bg-zinc-900/60 rounded-2xl p-5 flex-1 mx-1">
              <Text className="text-3xl font-bold text-white text-center mb-1">
                {outfitsCreated}
              </Text>
              <Text className="text-xs text-white/60 text-center font-medium">
                Outfits Created
              </Text>
            </View>
            <View className="bg-zinc-900/60 rounded-2xl p-5 flex-1 ml-2">
              <Text className="text-3xl font-bold text-white text-center mb-1">
                {mostWorn}
              </Text>
              <Text className="text-xs text-white/60 text-center font-medium">
                Most Worn
              </Text>
            </View>
          </View>

          {isLoading ? (
            <View className="flex-1 items-center justify-center py-20">
              <ActivityIndicator size="large" color="white" />
              <Text className="text-white/60 mt-4">Loading wardrobe...</Text>
            </View>
          ) : error ? (
            <View className="flex-1 items-center justify-center py-20">
              <Text className="text-white/60 text-center mb-4">
                {error?.message || "Failed to load wardrobe data"}
              </Text>
              <Pressable
                onPress={() => refetch()}
                className="bg-white px-6 py-3 rounded-xl"
              >
                <Text className="text-black font-semibold">Retry</Text>
              </Pressable>
            </View>
          ) : (
            <FlatList
              data={filteredItems}
              renderItem={renderWardrobeItem}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              scrollEnabled={false}
              contentContainerStyle={{ paddingBottom: 20 }}
              columnWrapperStyle={{ justifyContent: "space-between" }}
            />
          )}
        </View>

        <ImageModal
          visible={modalVisible}
          selectedImage={selectedImage}
          onClose={() => setModalVisible(false)}
        />
      </ScrollView>

      <Pressable
        onPress={handleAddCloth}
        className="absolute bottom-6 right-5 w-14 h-14 bg-white rounded-full items-center justify-center shadow-lg active:scale-95"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        <HugeiconsIcon icon={AddIcon} size={24} color="#000" />
      </Pressable>
    </SafeAreaView>
  );
}
