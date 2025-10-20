import { FlatList, Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { HeartAddIcon } from "@hugeicons/core-free-icons";
import * as Haptic from "expo-haptics";
import ImageModal from "./ImageModal";
import { useState } from "react";

const trendingCategories = [
  {
    id: "1",
    title: "Minimalist Chic",
    image: require("@/assets/images/outfit.jpg"),
    trendPercentage: "+15%",
    isLiked: false,
  },
  {
    id: "2",
    title: "Street Style",
    image: require("@/assets/images/jeans.jpg"),
    trendPercentage: "+28%",
    isLiked: true,
  },
  {
    id: "3",
    title: "Athleisure",
    image: require("@/assets/images/shoes.jpg"),
    trendPercentage: "+12%",
    isLiked: false,
  },
  {
    id: "4",
    title: "Vintage Vibes",
    image: require("@/assets/images/jeans1.jpg"),
    trendPercentage: "+22%",
    isLiked: true,
  },
  {
    id: "5",
    title: "Bohemian",
    image: require("@/assets/images/shirt.jpg"),
    trendPercentage: "+8%",
    isLiked: false,
  },
];

export default function TrendingCategories() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const openImageModal = (imageSource: any) => {
    setSelectedImage(imageSource);
    setModalVisible(true);
  };

  const renderTrendingItem = ({ item }: { item: any }) => (
    <View className="w-32 mr-3">
      <Pressable
        onPress={() => {
          Haptic.selectionAsync();
          openImageModal(item.image);
        }}
        className="relative"
      >
        {/* Image Container */}
        <View className="relative">
          <Image
            style={{
              width: 130,
              height: 130,
              borderRadius: 12,
            }}
            source={item.image}
            contentFit="cover"
          />

          {/* Heart Icon - Top Right */}
          <Pressable
            onPress={() => {
              Haptic.selectionAsync();
              // Toggle like state here
            }}
            className="absolute top-2 right-2 w-6 h-6 bg-white/20 rounded-full items-center justify-center"
          >
            <HugeiconsIcon
              icon={HeartAddIcon}
              color={item.isLiked ? "#EF4444" : "#9CA3AF"}
              size={14}
            />
          </Pressable>
        </View>

        {/* Title */}
        <Text className="text-white text-sm font-medium mt-2 mb-1">
          {item.title}
        </Text>

        {/* Trend Indicator */}
        <Text className="text-lewi text-xs font-medium">
          {item.trendPercentage} this week
        </Text>
      </Pressable>
    </View>
  );

  return (
    <View className="ml-1 mb-4">
      <Text className="text-white text-lg font-semibold mb-4">
        Trending Now
      </Text>

      <FlatList
        horizontal
        decelerationRate="fast"
        data={trendingCategories}
        showsHorizontalScrollIndicator={false}
        renderItem={renderTrendingItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20, paddingRight: 16 }}
        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
      />

      <ImageModal
        visible={modalVisible}
        selectedImage={selectedImage}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}
