import { Button } from "@/components/ui/button";
import { useColorScheme } from "@/lib/use-color-scheme";
import {
  ArrowLeftIcon,
  CameraIcon,
  FlashIcon,
  RefreshIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import * as Haptic from "expo-haptics";
import { router } from "expo-router";
import { useState } from "react";
import { Dimensions, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function AddClothScreen() {
  const { isDarkColorScheme } = useColorScheme();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const [frontCamera, setFrontCamera] = useState(false);

  const handleCapture = () => {
    Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Medium);
    // TODO: Implement camera capture functionality
    console.log("Capturing image...");
    // Simulate capture for now
    setCapturedImage(
      "https://via.placeholder.com/400x600/333333/FFFFFF?text=Captured+Image"
    );
  };

  const handleRetake = () => {
    Haptic.selectionAsync();
    setCapturedImage(null);
  };

  const handleAnalyze = () => {
    Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Medium);
    setIsAnalyzing(true);
    // TODO: Implement AI analysis
    console.log("Analyzing image with AI...");
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      router.back();
    }, 3000);
  };

  const handleToggleFlash = () => {
    Haptic.selectionAsync();
    setFlashOn(!flashOn);
  };

  const handleFlipCamera = () => {
    Haptic.selectionAsync();
    setFrontCamera(!frontCamera);
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      {/* Header */}
      <View className="absolute top-0 left-0 right-0 z-10 px-4 py-3 pt-[12%]">
        <View className="flex-row items-center justify-between">
          <Pressable
            onPress={() => {
              Haptic.selectionAsync();
              router.back();
            }}
            className="h-11 w-11 rounded-full items-center justify-center bg-black/50 active:bg-black/70"
          >
            <HugeiconsIcon icon={ArrowLeftIcon} size={18} color="white" />
          </Pressable>
          <View>
            <Text className="text-white/80 text-sm font-medium mb-1">
              Add to Collection
            </Text>
            <Text className="text-2xl font-bold text-white">Capture Item</Text>
          </View>
          <View className="w-11" />
        </View>
      </View>

      {/* Camera View */}
      <View className="flex-1">
        {capturedImage ? (
          // Captured Image Preview
          <View className="flex-1">
            <Image
              source={{ uri: capturedImage }}
              className="flex-1"
              resizeMode="cover"
            />

            {/* Image Overlay Controls */}
            <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/20">
              <View className="flex-1 justify-between p-6">
                {/* Top Controls */}
                <View className="flex-row justify-between items-start pt-16">
                  <Pressable
                    onPress={handleRetake}
                    className="h-12 w-12 rounded-full items-center justify-center bg-black/50 active:bg-black/70"
                  >
                    <HugeiconsIcon
                      icon={ArrowLeftIcon}
                      size={20}
                      color="white"
                    />
                  </Pressable>

                  <View className="items-center">
                    <Text className="text-white text-lg font-semibold mb-1">
                      Great Shot!
                    </Text>
                    <Text className="text-white/80 text-sm">
                      Ready to analyze with AI?
                    </Text>
                  </View>

                  <View className="w-12" />
                </View>

                {/* Bottom Controls */}
                <View className="items-center">
                  <Button
                    onPress={handleAnalyze}
                    disabled={isAnalyzing}
                    className="h-16 w-64 rounded-2xl bg-lewi active:bg-lewi/90 shadow-lg shadow-black/20"
                  >
                    <Text className="text-black font-bold text-lg">
                      {isAnalyzing ? "Analyzing..." : "Analyze with AI"}
                    </Text>
                  </Button>

                  {isAnalyzing && (
                    <View className="mt-4 items-center">
                      <View className="h-2 w-32 bg-white/20 rounded-full overflow-hidden">
                        <View className="h-full bg-lewi rounded-full animate-pulse" />
                      </View>
                      <Text className="text-white/80 text-sm mt-2">
                        AI is analyzing your item...
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </View>
        ) : (
          // Camera Preview
          <View className="flex-1 bg-zinc-900">
            {/* Camera Placeholder */}
            <View className="flex-1 items-center justify-center">
              <HugeiconsIcon
                icon={CameraIcon}
                size={80}
                color="white"
                className="mb-4"
              />
              <Text className="text-white text-xl font-semibold mb-2">
                Position your item
              </Text>
              <Text className="text-white/70 text-center px-8">
                Make sure the item is well-lit and clearly visible
              </Text>
            </View>

            {/* Camera Controls */}
            <View className="absolute bottom-0 left-0 right-0 p-6">
              <View className="flex-row items-center justify-between mb-6">
                {/* Flash Toggle */}
                <Pressable
                  onPress={handleToggleFlash}
                  className="h-12 w-12 rounded-full items-center justify-center bg-black/50 active:bg-black/70"
                >
                  <HugeiconsIcon
                    icon={FlashIcon}
                    size={20}
                    color={flashOn ? "#DBFE01" : "white"}
                  />
                </Pressable>

                {/* Capture Button */}
                <Pressable
                  onPress={handleCapture}
                  className="h-20 w-20 rounded-full items-center justify-center bg-white active:bg-white/90 shadow-lg"
                >
                  <View className="h-16 w-16 rounded-full border-4 border-black" />
                </Pressable>

                {/* Flip Camera */}
                <Pressable
                  onPress={handleFlipCamera}
                  className="h-12 w-12 rounded-full items-center justify-center bg-black/50 active:bg-black/70"
                >
                  <HugeiconsIcon icon={RefreshIcon} size={20} color="white" />
                </Pressable>
              </View>

              {/* Instructions */}
              <View className="items-center">
                <Text className="text-white/80 text-sm text-center">
                  Tap the white button to capture
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
