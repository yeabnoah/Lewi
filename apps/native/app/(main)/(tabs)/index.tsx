import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowDown01Icon,
  ArrowRightIcon,
  ArrowUp01Icon,
  BriefcaseIcon,
  DishIcon,
  EyeIcon,
  HeartAddIcon,
  Notification02Icon,
  Share01Icon,
  StarIcon,
  SunIcon,
  ThermometerIcon,
  WinkIcon,
  Camera01Icon,
  UserIcon,
  SentIcon,
  ClosedCaptionIcon,
  Cancel01Icon,
  AiGenerativeIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import * as Haptic from "expo-haptics";
import { Image } from "expo-image";
import { useState } from "react";
import {
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import ImageZoom from "react-native-image-pan-zoom";

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

// Upcoming events data
const upcomingEvents = [
  {
    id: "1",
    title: "Team Meeting",
    time: "2:00 PM Today",
    dressCode: "Business Casual",
    icon: BriefcaseIcon,
    iconBg: "bg-amber-100",
    iconColor: "#8B4513",
  },
  {
    id: "2",
    title: "Dinner Date",
    time: "Tomorrow 7:00 PM",
    dressCode: "Smart Casual",
    icon: DishIcon,
    iconBg: "bg-gray-100",
    iconColor: "#6B7280",
  },
];

export default function TabOne() {
  const [isDarkColorScheme, setIsDarkColorScheme] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [isWeatherExpanded, setIsWeatherExpanded] = useState(false);

  const openImageModal = (imageSource: any) => {
    setSelectedImage(imageSource);
    setModalVisible(true);
  };

  const closeImageModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
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

  // Event card component
  const renderEventItem = ({ item }: { item: any }) => (
    <Pressable
      onPress={() => {
        Haptic.selectionAsync();
      }}
      className="bg-zinc-900/50 rounded-2xl p-4 mb-3 flex-row items-center"
    >
      {/* Icon */}
      <View
        className={`w-12 h-12 rounded-full ${item.iconBg} items-center justify-center mr-4`}
      >
        <HugeiconsIcon icon={item.icon} color={item.iconColor} size={24} />
      </View>

      {/* Event Details */}
      <View className="flex-1">
        <Text className="text-white text-lg font-semibold mb-1">
          {item.title}
        </Text>
        <Text className="text-white/60 text-sm mb-2">{item.time}</Text>
        <Text className="text-white/80 text-sm font-medium">
          Suggested: {item.dressCode}
        </Text>
      </View>

      {/* Arrow */}
      <HugeiconsIcon icon={ArrowRightIcon} color="#6B7280" size={20} />
    </Pressable>
  );

  return (
    <ScrollView
      className="flex-1 px-4 pt-[14%]"
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={true}
      bounces={true}
    >
      <View className=" flex-row justify-between items-center">
        <View>
          <Text className=" dark:text-white/40 text-black/40">
            Good Morning
          </Text>
          <Text className=" text-2xl font-bold text-white">John Doe</Text>
        </View>

        <View className=" bg-white/5 rounded-full p-3">
          <HugeiconsIcon icon={Notification02Icon} color="#DBFE01" size={20} />
        </View>
      </View>
      {/* Expandable Weather Card */}
      <View className="mt-6 relative overflow-hidden rounded-xl">
        {/* Main Card */}
        <View className="bg-zinc-900/60 rounded-2xl ">
          <Pressable
            onPress={() => {
              Haptic.selectionAsync();
              setIsWeatherExpanded(!isWeatherExpanded);
            }}
            className="px-5 py-4"
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center flex-1">
                <View className="w-10 h-10 bg-white/40 rounded-full items-center justify-center mr-4">
                  <HugeiconsIcon icon={SunIcon} color="white" size={20} />
                </View>
                <View className="flex-1">
                  <Text className="text-white/60 text-sm font-medium mb-1">
                    Current Weather
                  </Text>
                  <Text className="text-white font-semibold">72°F Sunny</Text>
                </View>
              </View>

              <View className="flex-row items-center">
                <HugeiconsIcon
                  icon={isWeatherExpanded ? ArrowUp01Icon : ArrowDown01Icon}
                  color="#9CA3AF"
                  size={20}
                />
              </View>
            </View>
          </Pressable>

          {/* Expanded Content - Conditional - Compact */}
          {isWeatherExpanded && (
            <View className="px-6 pb-4">
              {/* Compact Weather Info */}
              <View className="">
                <View className="flex-row items-center justify-between mb-3">
                  <View className="flex-1">
                    <Text className="text-white/60 text-xs mb-1">
                      San Francisco, CA
                    </Text>
                    <View className="flex-row items-baseline">
                      <Text className="text-white text-2xl font-light">72</Text>
                      <Text className="text-white/60 text-sm ml-1">°F</Text>
                      <Text className="text-white/50 text-xs ml-2">
                        Feels like 75°F
                      </Text>
                    </View>
                  </View>
                  <View className="w-10 h-10 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full items-center justify-center">
                    <HugeiconsIcon icon={SunIcon} color="#FCD34D" size={20} />
                  </View>
                </View>

                {/* Compact Details Row */}
                <View className="flex-row justify-between mb-3">
                  <View className="flex-row items-center">
                    <HugeiconsIcon icon={WinkIcon} color="#9CA3AF" size={14} />
                    <Text className="text-white/60 text-xs ml-1">Wind</Text>
                    <Text className="text-white text-xs ml-1 font-medium">
                      8 mph
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <HugeiconsIcon icon={EyeIcon} color="#9CA3AF" size={14} />
                    <Text className="text-white/60 text-xs ml-1">
                      Visibility
                    </Text>
                    <Text className="text-white text-xs ml-1 font-medium">
                      10 mi
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <HugeiconsIcon
                      icon={ThermometerIcon}
                      color="#9CA3AF"
                      size={14}
                    />
                    <Text className="text-white/60 text-xs ml-1">Humidity</Text>
                    <Text className="text-white text-xs ml-1 font-medium">
                      65%
                    </Text>
                  </View>
                </View>

                {/* Compact Style Recommendation */}
                <View className="flex-row items-center pt-2 border-t border-white/10">
                  <View className="w-5 h-5 bg-white/40 rounded-full items-center justify-center mr-2">
                    <Text className="text-white text-xs font-bold">L</Text>
                  </View>
                  <Text className="text-white/80 text-xs flex-1">
                    Light layers recommended
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </View>

      {/* Today's Pick Section - New Layout */}
      <View className="mt-6">
        <View className="flex-row items-center mx-2 justify-between mb-1">
          <Text className="text-white text-lg font-semibold">Today's Pick</Text>
        </View>

        {/* Main Layout Container */}
        <View className="bg-zinc-900/50 rounded-2xl px-2 pt-2 pb-4 ">
          {/* Image and Side Squares Row */}
          <View className="flex-row mb-4">
            {/* Main Image Area */}
            <View className="flex-1 mr-3">
              <Pressable
                onPress={() => {
                  Haptic.selectionAsync();
                  openImageModal(require("@/assets/images/outfit.jpg"));
                }}
                className="bg-black rounded-xl overflow-hidden"
                style={{ height: 200 }}
              >
                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 12,
                  }}
                  source={require("@/assets/images/outfit.jpg")}
                  placeholder={{ blurhash: "LEHV6nWB2yk8pyo0adR*.7kCMdnj" }}
                  contentFit="cover"
                  transition={1000}
                />
              </Pressable>
            </View>

            {/* Side Content Areas - Right Side */}
            <View className="w-20 justify-between space-y-3">
              {/* Square 1 */}
              <Pressable
                onPress={() => {
                  Haptic.selectionAsync();
                  openImageModal(require("@/assets/images/shirt.jpg"));
                }}
                className="bg-black rounded-xl overflow-hidden"
                style={{ height: 60 }}
              >
                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 12,
                  }}
                  source={require("@/assets/images/shirt.jpg")}
                  placeholder={{ blurhash: "LEHV6nWB2yk8pyo0adR*.7kCMdnj" }}
                  contentFit="cover"
                  transition={1000}
                />
              </Pressable>

              {/* Square 2 */}
              <Pressable
                onPress={() => {
                  Haptic.selectionAsync();
                  openImageModal(require("@/assets/images/jeans1.jpg"));
                }}
                className="bg-black rounded-xl overflow-hidden"
                style={{ height: 60 }}
              >
                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 12,
                  }}
                  source={require("@/assets/images/jeans1.jpg")}
                  placeholder={{ blurhash: "LEHV6nWB2yk8pyo0adR*.7kCMdnj" }}
                  contentFit="cover"
                  transition={1000}
                />
              </Pressable>

              {/* Square 3 */}
              <Pressable
                onPress={() => {
                  Haptic.selectionAsync();
                  openImageModal(require("@/assets/images/shoes2.jpg"));
                }}
                className="bg-black rounded-xl overflow-hidden"
                style={{ height: 60 }}
              >
                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 12,
                  }}
                  source={require("@/assets/images/shoes2.jpg")}
                  placeholder={{ blurhash: "LEHV6nWB2yk8pyo0adR*.7kCMdnj" }}
                  contentFit="cover"
                  transition={1000}
                />
              </Pressable>
            </View>
          </View>

          {/* Full Width Text Content */}
          <View className="space-y-3 mx-2">
            {/* Main Title with Creative Styling */}
            <View className="flex-row items-baseline justify-between">
              <View className="flex-1">
                <Text className="text-white text-xl font-bold tracking-tight">
                  Casual Friday Vibes
                </Text>
                <View className="flex-row items-center mt-1">
                  <View className="w-2 h-2 bg-white/40 rounded-full mr-2" />
                  <Text className="text-white/80 text-sm font-medium">
                    Perfect for Work
                  </Text>
                </View>
              </View>

              <Pressable
                onPress={() => {
                  Haptic.selectionAsync();
                }}
                className="bg-white/5 rounded-full p-2"
              >
                <HugeiconsIcon icon={SentIcon} color="white" size={20} />
              </Pressable>
            </View>
          </View>
        </View>
      </View>

      <View className="mt-8 mb-4">
        <View className="flex-row justify-between items-center mx-2 mb-4">
          <Text className="text-white text-lg font-semibold">
            Upcoming Events
          </Text>
          <Pressable
            onPress={() => {
              Haptic.selectionAsync();
            }}
          >
            <Text className="text-white/80 text-sm font-medium">See All</Text>
          </Pressable>
        </View>

        <FlatList
          data={upcomingEvents}
          renderItem={renderEventItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      </View>

      <View className=" ml-1  mb-4">
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
      </View>

      {/* Quick Actions Section */}
      <View className="mx-1 mb-4">
        <Text className="text-white text-lg font-semibold mb-4">
          Quick Actions
        </Text>

        <View className="flex-row justify-between">
          {/* Add to Wardrobe Card */}
          <Pressable
            onPress={() => {
              Haptic.selectionAsync();
              // Navigate to add to wardrobe
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
                    backgroundColor:
                      "linear-gradient(135deg, #3B82F6, #8B5CF6)",
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
              // Navigate to style match
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
                    backgroundColor:
                      "linear-gradient(135deg, #F59E0B, #FCD34D)",
                  }}
                >
                  <HugeiconsIcon icon={UserIcon} color="white" size={24} />
                </View>
              </View>

              <Text className="text-white text-sm font-semibold mb-1 text-center">
                Style Match
              </Text>
              <Text className="text-white/60 text-xs text-center">
                Find similar looks
              </Text>
            </View>
          </Pressable>
        </View>
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeImageModal}
      >
        <View className="flex-1 bg-black/90 justify-center items-center">
          <Pressable
            className="absolute top-12 right-6 z-10 bg-white size-8 items-center justify-center rounded-full"
            onPress={() => {
              Haptic.selectionAsync();
              closeImageModal();
            }}
          >
            <HugeiconsIcon icon={Cancel01Icon} color="black" size={20} />
          </Pressable>

          {selectedImage && (
            <ImageZoom
              cropWidth={Dimensions.get("window").width}
              cropHeight={Dimensions.get("window").height}
              imageWidth={Dimensions.get("window").width}
              imageHeight={Dimensions.get("window").height * 0.8}
              enableSwipeDown={true}
              onSwipeDown={() => {
                Haptic.selectionAsync();
                closeImageModal();
              }}
            >
              <Image
                source={selectedImage}
                style={{
                  width: Dimensions.get("window").width,
                  height: Dimensions.get("window").height * 0.8,
                }}
                contentFit="contain"
                transition={200}
              />
            </ImageZoom>
          )}
        </View>
      </Modal>
    </ScrollView>
  );
}
