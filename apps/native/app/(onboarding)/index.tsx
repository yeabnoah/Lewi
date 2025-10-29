import { OnboardingUtils } from "@/lib/onboarding-utils";
import { useColorScheme } from "@/lib/use-color-scheme";
import { ArrowLeftIcon, ArrowRightIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const OnboardingScreen = () => {
  const { isDarkColorScheme } = useColorScheme();
  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleGetStarted = async () => {
    await OnboardingUtils.markOnboardingCompleted();
    router.push("/(auth)");
  };

  const handleNext = () => {
    if (currentPage < 2) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);

      scrollViewRef.current?.scrollTo({
        x: nextPage * width,
        animated: true,
      });
    } else {
      handleGetStarted();
    }
  };

  const handleSkip = () => {
    router.push("/(auth)");
  };

  const onScroll = (event: any) => {
    const pageIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    if (pageIndex !== currentPage) {
      setCurrentPage(pageIndex);
    }
  };

  // const onboardingData = [
  //   {
  //     id: 1,
  //     title: "Discover Your Style",
  //     subtitle: "AI-Powered Fashion",
  //     description:
  //       "Get personalized outfit recommendations that match your unique style and preferences",
  //     image: require("@/assets/2.png"),
  //     gradient: ["#667eea", "#764ba2"] as const,
  //     icon: "👗",
  //   },
  //   {
  //     id: 2,
  //     title: "Smart Wardrobe",
  //     subtitle: "Organize & Mix",
  //     description:
  //       "Digitally organize your clothes and discover endless outfit combinations",
  //     image: require("@/assets/1.png"),
  //     gradient: ["#f093fb", "#f5576c"] as const,
  //     icon: "✨",
  //   },
  //   {
  //     id: 3,
  //     title: "Perfect Outfits",
  //     subtitle: "Every Occasion",
  //     description:
  //       "Never wonder what to wear again. Get the perfect outfit for any event",
  //     image: require("@/assets/images/shoes.jpg"),
  //     gradient: ["#4facfe", "#00f2fe"] as const,
  //     icon: "🎯",
  //   },
  // ];

  return (
    <View className="flex-1">
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />

      {/* Background Gradient */}
      <LinearGradient
        colors={["#0a0a0a", "#1a1a1a", "#2a2a2a"] as const}
        className="absolute inset-0"
      />
      
      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="flex-row justify-end items-center px-6 py-4 z-10">
          <TouchableOpacity
            onPress={handleSkip}
            className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm"
          >
            <Text className="text-white/80 text-sm font-medium">Skip</Text>
          </TouchableOpacity>
        </View>

        
        {/* <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          className="flex-1"
        >
          {onboardingData.map((item, index) => (
            <View key={item.id} style={{ width }} className="flex-1 px-6">
              <View className="flex-1 justify-center items-center">
                <View className="w-full max-w-xs mb-6">
                  <Image
                    source={item.image}
                    className="w-full h-48 rounded-2xl"
                    resizeMode="cover"
                  />
                </View>


                <View className="items-center px-4">
                  <Text className="text-xl text-white/60 font-medium mb-2 text-center">
                    {item.subtitle}
                  </Text>
                  <Text className="text-3xl font-bold text-white mb-4 text-center leading-tight">
                    {item.title}
                  </Text>
                  <Text className="text-base text-white/70 text-center leading-6 max-w-xs">
                    {item.description}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView> */}

        {/* Bottom Section */}
        <View className="px-6 pb-8">
          {/* Page Indicators */}
          <View className="flex-row justify-center mb-8">
            <View className="flex-row">
              {[0, 1, 2].map((index) => (
                <View
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    currentPage === index ? "bg-lewi" : "bg-white/10"
                  }`}
                  style={{ marginHorizontal: 6 }}
                />
              ))}
            </View>
          </View>

          {/* Bottom Navigation */}
          <View className="flex-row justify-between items-center">
            {/* Back Button */}
            <TouchableOpacity
              onPress={() => {
                if (currentPage > 0) {
                  const prevPage = currentPage - 1;
                  setCurrentPage(prevPage);
                  scrollViewRef.current?.scrollTo({
                    x: prevPage * width,
                    animated: true,
                  });
                }
              }}
              className={`px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm flex-row items-center justify-center gap-2 ${
                currentPage === 0 ? "opacity-50" : ""
              }`}
              disabled={currentPage === 0}
            >
              <HugeiconsIcon icon={ArrowLeftIcon} size={20} color="#ffffff" />
              <Text className="text-white/80 text-sm font-medium">Back</Text>
            </TouchableOpacity>

            {/* Continue Button */}
            <TouchableOpacity
              onPress={handleNext}
              className="px-4 py-2 rounded-full bg-lewi flex-row items-center justify-center gap-2"
            >
              <Text className="text-black text-sm font-medium">
                {currentPage === 2 ? "Get Started" : "Continue"}
              </Text>
              <HugeiconsIcon icon={ArrowRightIcon} size={20} color="#0A0A0A" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default OnboardingScreen;
