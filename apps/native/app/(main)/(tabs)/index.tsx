import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Notification02Icon,
  Share01Icon,
  StarIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Image } from "expo-image";
import { useState } from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import ImageZoom from "react-native-image-pan-zoom";
import * as Haptic from "expo-haptics";

export default function TabOne() {
  const [isDarkColorScheme, setIsDarkColorScheme] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const openImageModal = (imageSource: any) => {
    setSelectedImage(imageSource);
    setModalVisible(true);
  };

  const closeImageModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  return (
    <ScrollView className="flex-1  px-6 pb-5 pt-[14%]">
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
      <View className=" flex-row items-center justify-between mt-6 bg-zinc-900 rounded-2xl p-4">
        <View>
          <Text className="text-white/40 text-sm">Current Weather</Text>
          <View className="flex-row items-center">
            <Text className="text-white text-2xl font-semibold">72°F</Text>
            <Text className="text-white/60 ml-2">Sunny & Clear</Text>
          </View>
          <Text className="text-white/40 text-sm mt-1">
            Perfect day for your style goals
          </Text>
        </View>
      </View>

      <View className=" flex-col gap-5 items-center justify-between mt-6">
        <View className=" flex-row items-center mx-2 justify-between w-full">
          <Text className="text-white text-xl font-semibold">Todays Pick</Text>
          <HugeiconsIcon icon={Share01Icon} color="#DBFE01" size={20} />
        </View>
        <View className="w-full max-w-sm ">
          <Card className=" bg-zinc-900/50 border-0 py-3 ">
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
                  <HugeiconsIcon icon={StarIcon} color="black" size={20} />
                  <Text className="text-black text-sm">Ai Pick</Text>
                </View>
              </View>
              <View className="flex-col mt-2 mx-1 items-center justify-between">
                <View className="flex-row mb-1 items-center gap-2 justify-between w-full mx-1">
                  <Text className="text-white/50 text-lg">
                    Lewi's Confidence
                  </Text>
                  <Text className="text-white/40 text-lg">90%</Text>
                </View>
                <Progress className="" value={33} />
              </View>

              <View className="flex-col items-center mx-1 justify-between">
                <Text className="text-white/50 text-sm mt-3">
                  This looks balacnces professionalism with weeekend comfort
                </Text>
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
                  </Pressable>
                </View>
              </View>
            </CardContent>
          </Card>
        </View>
      </View>

      {/* Image Modal */}
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
