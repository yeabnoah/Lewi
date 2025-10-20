import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { SentIcon } from "@hugeicons/core-free-icons";
import * as Haptic from "expo-haptics";
import ImageModal from "./ImageModal";

export default function TodaysPick() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const openImageModal = (imageSource: any) => {
    setSelectedImage(imageSource);
    setModalVisible(true);
  };

  return (
    <View className="mt-6">
      <View className="flex-row items-center mx-2 justify-between mb-1">
        <Text className="text-white text-lg font-semibold">Today's Pick</Text>
      </View>

      {/* Main Layout Container */}
      <View className="bg-zinc-900/50 rounded-2xl px-2 pt-2 pb-4">
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

      <ImageModal
        visible={modalVisible}
        selectedImage={selectedImage}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}
