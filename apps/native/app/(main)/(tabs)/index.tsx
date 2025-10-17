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
        <Text className="text-lewi text-sm font-medium">
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
          <Text className=" text-2xl font-bold text-lewi">John Doe</Text>
        </View>

        <View className=" bg-secondary/50 rounded-full p-3">
          <HugeiconsIcon icon={Notification02Icon} color="#DBFE01" size={20} />
        </View>
      </View>
      {/* Expandable Weather Card */}
      <View className="mt-6 relative overflow-hidden">
        {/* Background Gradient */}
        <View className="absolute inset-0 bg-gradient-to-br from-lewi/10 via-lewi/5 to-transparent rounded-xl" />

        {/* Main Card */}
        <View className="bg-zinc-900/60 backdrop-blur-sm rounded-xl border border-white/5">
          {/* Header - Always Visible - Larger */}
          <Pressable
            onPress={() => {
              Haptic.selectionAsync();
              setIsWeatherExpanded(!isWeatherExpanded);
            }}
            className="p-6"
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center flex-1">
                <View className="w-12 h-12 bg-lewi/20 rounded-full items-center justify-center mr-4">
                  <HugeiconsIcon icon={SunIcon} color="#DBFE01" size={20} />
                </View>
                <View className="flex-1">
                  <Text className="text-white/60 text-sm font-medium mb-1">
                    Current Weather
                  </Text>
                  <Text className="text-white text-lg font-semibold">
                    72°F Sunny
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center">
                <View className="bg-white/10 rounded-full px-3 py-2 mr-3">
                  <Text className="text-white/80 text-sm font-medium">
                    Live
                  </Text>
                </View>
                <HugeiconsIcon
                  icon={isWeatherExpanded ? ArrowUp01Icon : ArrowDown01Icon}
                  color="#9CA3AF"
                  size={20}
                />
              </View>
            </View>
          </Pressable>

          {/* Expanded Content - Conditional */}
          {isWeatherExpanded && (
            <View className="px-4 pb-4 border-t border-white/10">
              {/* Location and Main Weather */}
              <View className="pt-4 mb-4">
                <Text className="text-white text-sm font-medium mb-1">
                  San Francisco, CA
                </Text>
                <View className="flex-row items-center justify-between">
                  <View className="flex-1">
                    <View className="flex-row items-baseline">
                      <Text className="text-white text-3xl font-light">72</Text>
                      <Text className="text-white/60 text-lg ml-1">°F</Text>
                    </View>
                    <Text className="text-white/80 text-base font-medium">
                      Sunny & Clear
                    </Text>
                    <Text className="text-white/50 text-sm">
                      Feels like 75°F
                    </Text>
                  </View>

                  {/* Weather Icon */}
                  <View className="w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full items-center justify-center">
                    <HugeiconsIcon icon={SunIcon} color="#FCD34D" size={32} />
                  </View>
                </View>
              </View>

              {/* Weather Details Grid */}
              <View className="flex-row justify-between mb-4">
                <View className="items-center flex-1">
                  <View className="w-8 h-8 bg-white/10 rounded-full items-center justify-center mb-2">
                    <HugeiconsIcon icon={WinkIcon} color="#9CA3AF" size={16} />
                  </View>
                  <Text className="text-white/60 text-xs mb-1">Wind</Text>
                  <Text className="text-white text-sm font-medium">8 mph</Text>
                </View>

                <View className="items-center flex-1">
                  <View className="w-8 h-8 bg-white/10 rounded-full items-center justify-center mb-2">
                    <HugeiconsIcon icon={EyeIcon} color="#9CA3AF" size={16} />
                  </View>
                  <Text className="text-white/60 text-xs mb-1">Visibility</Text>
                  <Text className="text-white text-sm font-medium">10 mi</Text>
                </View>

                <View className="items-center flex-1">
                  <View className="w-8 h-8 bg-white/10 rounded-full items-center justify-center mb-2">
                    <HugeiconsIcon
                      icon={ThermometerIcon}
                      color="#9CA3AF"
                      size={16}
                    />
                  </View>
                  <Text className="text-white/60 text-xs mb-1">Humidity</Text>
                  <Text className="text-white text-sm font-medium">65%</Text>
                </View>
              </View>

              {/* Style Recommendation */}
              <View className="pt-3 border-t border-white/10">
                <View className="flex-row items-center">
                  <View className="w-6 h-6 bg-lewi rounded-full items-center justify-center mr-3">
                    <Text className="text-black text-xs font-bold">L</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-white/80 text-sm font-medium">
                      Perfect day for your style goals
                    </Text>
                    <Text className="text-lewi text-xs">
                      Light layers recommended
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      </View>

      <View className=" flex-col gap-5 items-center justify-between mt-6">
        <View className=" flex-row items-center mx-2 justify-between w-full">
          <Text className="text-white text-xl font-semibold">Todays Pick</Text>
          <HugeiconsIcon icon={Share01Icon} color="#DBFE01" size={20} />
        </View>
        <View className="w-full max-w-sm mx-0 ">
          <Card className=" bg-zinc-900/50 border-0 pt-3 pb-5 ">
            <CardContent className="mx-0 px-3">
              <Pressable
                onPress={() => {
                  Haptic.selectionAsync();
                  openImageModal(require("@/assets/images/outfit.jpg"));
                }}
              >
                <Image
                  className="w-full h-full rounded-2xl"
                  style={{ width: "100%", height: 200, borderRadius: 10 }}
                  source={require("@/assets/images/outfit.jpg")}
                  placeholder={{ blurhash: "LEHV6nWB2yk8pyo0adR*.7kCMdnj" }}
                  contentFit="cover"
                  transition={1000}
                />
              </Pressable>
              <View className="flex-row mx-1 mt-5 items-center justify-between">
                <View>
                  <Text className="text-white text-2xl font-medium">
                    Casual Friday Vibes
                  </Text>
                  <Text className="text-white/40 text-sm">Work Outfit</Text>
                </View>

                <View className="flex-row items-center gap-2 bg-lewi rounded-full p-2">
                  <HugeiconsIcon icon={StarIcon} color="black" size={12} />
                  <Text className="text-black text-sm">Ai Pick</Text>
                </View>
              </View>

              <View className="flex-col items-center mt-3 justify-between">
                <View className="flex-row mt-2 items-center gap-2 w-full">
                  <Pressable
                    className="flex-1"
                    onPress={() => {
                      Haptic.selectionAsync();
                      openImageModal(require("@/assets/images/shirt.jpg"));
                    }}
                  >
                    <Image
                      style={{
                        width: "100%",
                        aspectRatio: 1,
                        borderRadius: 10,
                      }}
                      className="rounded-2xl"
                      source={require("@/assets/images/shirt.jpg")}
                      placeholder={{ blurhash: "LEHV6nWB2yk8pyo0adR*.7kCMdnj" }}
                      contentFit="cover"
                      transition={1000}
                    />
                    <Text className="text-white/50 text-sm mt-2 text-center">
                      Green Olive Shirt
                    </Text>
                    <Text className="text-white/20 text-sm text-center">
                      Tops
                    </Text>
                  </Pressable>
                  <Pressable
                    className="flex-1"
                    onPress={() => {
                      Haptic.selectionAsync();
                      openImageModal(require("@/assets/images/jeans1.jpg"));
                    }}
                  >
                    <Image
                      style={{
                        width: "100%",
                        aspectRatio: 1,
                        borderRadius: 10,
                      }}
                      className="rounded-2xl"
                      source={require("@/assets/images/jeans1.jpg")}
                      placeholder={{ blurhash: "LEHV6nWB2yk8pyo0adR*.7kCMdnj" }}
                      contentFit="cover"
                      transition={1000}
                    />
                    <Text className="text-white/50 text-sm mt-2 text-center">
                      white jeans
                    </Text>
                    <Text className="text-white/20 text-sm text-center">
                      Bottoms
                    </Text>
                  </Pressable>
                  <Pressable
                    className="flex-1"
                    onPress={() => {
                      Haptic.selectionAsync();
                      openImageModal(require("@/assets/images/shoes2.jpg"));
                    }}
                  >
                    <Image
                      style={{
                        width: "100%",
                        aspectRatio: 1,
                        borderRadius: 10,
                      }}
                      className="rounded-2xl"
                      source={require("@/assets/images/shoes2.jpg")}
                      placeholder={{ blurhash: "LEHV6nWB2yk8pyo0adR*.7kCMdnj" }}
                      contentFit="cover"
                      transition={1000}
                    />
                    <Text className="text-white/50 text-sm mt-2 text-center">
                      white Jordan Shoes
                    </Text>
                    <Text className="text-white/20 text-sm text-center">
                      Shoes
                    </Text>
                  </Pressable>
                </View>
              </View>
            </CardContent>
          </Card>
        </View>
      </View>

      <View className="mt-8 mb-4">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-white text-lg font-semibold">
            Upcoming Events
          </Text>
          <Pressable
            onPress={() => {
              Haptic.selectionAsync();
            }}
          >
            <Text className="text-lewi text-sm font-medium">See All</Text>
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

      <View className=" mx-1 mb-4">
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

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeImageModal}
      >
        <View className="flex-1 bg-black/90 justify-center items-center">
          <Pressable
            className="absolute top-12 right-6 z-10 bg-white/20 rounded-full p-2"
            onPress={() => {
              Haptic.selectionAsync();
              closeImageModal();
            }}
          >
            <Text className="text-white text-lg font-bold">×</Text>
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
