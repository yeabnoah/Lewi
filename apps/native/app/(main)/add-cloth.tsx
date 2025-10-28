import { authClient } from "@/lib/auth-client";
import { supabase } from "@/lib/supabaseClient";
import { useColorScheme } from "@/lib/use-color-scheme";
import {
  ArrowLeftIcon,
  FlashIcon,
  RefreshIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as Haptic from "expo-haptics";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Alert, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddClothScreen() {
  const { isDarkColorScheme } = useColorScheme();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [flashOn, setFlashOn] = useState(false);
  const [frontCamera, setFrontCamera] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const queryClient = useQueryClient();

  // Mutation for uploading wardrobe item
  const uploadWardrobeItemMutation = useMutation({
    mutationFn: async (imageUrl: string) => {
      const cookies = authClient.getCookie();
      if (!cookies) {
        throw new Error("Not authenticated");
      }

      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_CORS_ORIGIN!}/api/wardrobe`,
        { imageUrl },
        {
          headers: {
            'Cookie': cookies,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch wardrobe data
      queryClient.invalidateQueries({ queryKey: ["wardrobe"] });
      Alert.alert("Image uploaded successfully", "The image has been uploaded successfully");
      router.back();
    },
    onError: (error) => {
      console.error("API upload failed:", error);
      Alert.alert("Upload failed", "We couldn't save the item. Please try again.");
    },
  });

  const handleCapture = async () => {
    if (!cameraRef.current) return;
    
    Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Medium);
    
    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        skipProcessing: false,
      });
      if (photo) {
        setCapturedImage(photo.uri);
      }
    } catch (error) {
      console.error("Error capturing photo:", error);
    }
  };

  const handleRetake = () => {
    Haptic.selectionAsync();
    setCapturedImage(null);
  };

  const handleToggleFlash = () => {
    Haptic.selectionAsync();
    setFlashOn(!flashOn);
  };

  const handleFlipCamera = () => {
    Haptic.selectionAsync();
    setFrontCamera(!frontCamera);
  };

  const handleAnalyze = async () => {
    if (!capturedImage) return;
    Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Medium);

    try {
      const fileName = `${Date.now()}.jpg`;
      const filePath = `uploads/${fileName}`;

      const response = await fetch(capturedImage);
      const arrayBuffer = await response.arrayBuffer();
      const fileBuffer = new Uint8Array(arrayBuffer);

      const { error } = await supabase.storage
        .from("lewi-bucket")
        .upload(filePath, fileBuffer, {
          contentType: "image/jpeg",
          upsert: false,
        });

      if (error) {
        console.error("Upload failed:", error.message);
        return;
      }

      const { data } = supabase.storage
        .from("lewi-bucket")
        .getPublicUrl(filePath);
      
      if (data?.publicUrl) {
        console.log("Uploaded image URL:", data.publicUrl);
        // Use mutation to upload wardrobe item
        uploadWardrobeItemMutation.mutate(data.publicUrl);
      }
    } catch (err) {
      console.error("Unexpected upload error:", err);
      Alert.alert("Upload failed", "We couldn't upload the image. Please try again.");
    }
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView className="flex-1 bg-black items-center justify-center px-6">
        <Text className="text-white text-lg text-center mb-4">
          We need your permission to use the camera
        </Text>
        <Pressable
          onPress={requestPermission}
          className="bg-lewi px-6 py-3 rounded-xl"
        >
          <Text className="text-black font-semibold">Grant Permission</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      {/* Header - Only show when not viewing captured image */}
      {!capturedImage && (
        <View className="absolute top-0 left-0 right-0 z-10 px-4 py-3 pt-[12%]">
          <View className="flex-row items-center justify-between">
            <Pressable
              onPress={() => {
                Haptic.selectionAsync();
                router.back();
              }}
              className="h-11 w-11 rounded-full items-center justify-center bg-black/50 active:bg-black/70"
            >
              {/* <HugeiconsIcon icon={ArrowLeftIcon} size={18} color="white" /> */}
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
      )}

      {/* Camera View */}
      <View className="flex-1">
        {capturedImage ? (
          <View className="flex-1 bg-black">
            <Image
              source={{ uri: capturedImage }}
              className="flex-1"
              resizeMode="contain"
            />
            
            <View className="absolute top-0 left-0 right-0 bottom-0 justify-between p-6">
              <Pressable
                onPress={() => {
                  Haptic.selectionAsync();
                  router.back();
                }}
                className="self-start mt-16 h-12 w-12 rounded-full items-center justify-center bg-black/50 active:bg-black/70"
              >
                <HugeiconsIcon
                  icon={ArrowLeftIcon}
                  size={20}
                  color="white"
                />
              </Pressable>

              <View className="items-center gap-4 flex-row justify-between">
                <Pressable
                  onPress={handleAnalyze}
                  disabled={uploadWardrobeItemMutation.isPending}
                  className="w-1/2 max-w-xs h-12 rounded-2xl items-center justify-center bg-lewi active:bg-lewi/90 shadow-lg shadow-black/20"
                >
                  <Text className="text-black font-bold text-lg">
                    {uploadWardrobeItemMutation.isPending ? "Uploading..." : "Analyze"}
                  </Text>
                </Pressable>

                <Pressable
                  onPress={handleRetake}
                  className="w-1/2 max-w-xs h-12 rounded-2xl items-center justify-center bg-white/20 active:bg-white/30 border border-white/30"
                >
                  <Text className="text-white font-semibold text-lg">
                    Retake
                  </Text>
                </Pressable>
              </View>

              {uploadWardrobeItemMutation.isPending && (
                <View className="absolute top-0 left-0 right-0 bottom-0 items-center justify-center bg-black/60">
                  <Text className="text-white text-base">Uploading image...</Text>
                </View>
              )}
            </View>
          </View>
        ) : (
          // Real Camera Preview
          <CameraView
            ref={cameraRef}
            style={{ flex: 1 }}
            facing={frontCamera ? "front" : "back"}
            flash={flashOn ? "on" : "off"}
          >
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
          </CameraView>
        )}
      </View>
    </SafeAreaView>
  );
}