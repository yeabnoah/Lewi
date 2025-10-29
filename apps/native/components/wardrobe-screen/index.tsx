import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import {
  AddIcon,
  Cancel01Icon,
  Camera01Icon,
  FilterHorizontalIcon,
  FolderIcon,
  HeartAddIcon,
  SearchIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import * as Haptic from "expo-haptics";
import { router } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WardrobeScreen() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Animation values
  const cameraOpacity = useRef(new Animated.Value(0)).current;
  const galleryOpacity = useRef(new Animated.Value(0)).current;
  const cameraTranslateY = useRef(new Animated.Value(0)).current;
  const galleryTranslateY = useRef(new Animated.Value(0)).current;

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
    isFetching,
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

  useEffect(() => {
    if (isExpanded) {
      // Expand animation - all buttons appear simultaneously
      Animated.parallel([
        Animated.timing(cameraOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(cameraTranslateY, {
          toValue: 30,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(galleryOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(galleryTranslateY, {
          toValue: -60,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Collapse animation
      Animated.parallel([
        Animated.timing(cameraOpacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(cameraTranslateY, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(galleryOpacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(galleryTranslateY, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isExpanded, cameraOpacity, galleryOpacity, cameraTranslateY, galleryTranslateY]);

  const handleToggleExpand = () => {
    Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Medium);
    setIsExpanded(!isExpanded);
  };

  const handleSourceSelection = (source: "camera" | "gallery") => {
    Haptic.selectionAsync();
    setIsExpanded(false);
    router.push({
      pathname: "/(main)/add-cloth",
      params: { source },
    });
  };

  const onRefresh = async () => {
    Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Light);
    await refetch();
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

  const handleItemPress = (item: any) => {
    Haptic.selectionAsync();
    router.push({
      pathname: "/(main)/wardrobe-details",
      params: {
        item: JSON.stringify(item),
      },
    });
  };

  const renderWardrobeItem = ({ item }: { item: any }) => (
    <View className="flex-1 mx-1 mb-4">
      <Pressable
        onPress={() => handleItemPress(item)}
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
        refreshControl={
          <RefreshControl
            refreshing={isFetching && !isLoading}
            onRefresh={onRefresh}
            tintColor="#DBFE01"
            colors={["#DBFE01"]}
          />
        }
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
      </ScrollView>

      {/* Expandable FAB Group */}
      <View className="absolute bottom-6 right-5 items-end">
        {/* Camera Button */}
        <Animated.View
          style={{
            opacity: cameraOpacity,
            transform: [{ translateY: cameraTranslateY }],
            marginBottom: 0,
          }}
          pointerEvents={isExpanded ? "auto" : "none"}
        >
          <Pressable
            onPress={() => handleSourceSelection("camera")}
            className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-lg active:scale-95"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <HugeiconsIcon icon={Camera01Icon} size={20} color="#000" />
          </Pressable>
        </Animated.View>

        {/* Gallery Button */}
        <Animated.View
          style={{
            opacity: galleryOpacity,
            transform: [{ translateY: galleryTranslateY }],
            marginBottom: 0,
          }}
          pointerEvents={isExpanded ? "auto" : "none"}
        >
          <Pressable
            onPress={() => handleSourceSelection("gallery")}
            className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-lg active:scale-95"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <HugeiconsIcon icon={FolderIcon} size={20} color="#000" />
          </Pressable>
        </Animated.View>

        {/* Main Add/Close Button */}
        <Pressable
          onPress={handleToggleExpand}
          className="w-14 h-14 bg-white rounded-full items-center justify-center shadow-lg active:scale-95"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8,
          }}
        >
          <HugeiconsIcon
            icon={isExpanded ? Cancel01Icon : AddIcon}
            size={24}
            color="#000"
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
