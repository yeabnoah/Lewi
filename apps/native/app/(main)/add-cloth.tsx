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
import * as FileSystem from 'expo-file-system/legacy';
import * as Haptic from "expo-haptics";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Alert, Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ImageAnalysisResult {
  name: string;
  description: string;
  colors: string;
  type: string;
}

export default function AddClothScreen() {
  const { isDarkColorScheme } = useColorScheme();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [flashOn, setFlashOn] = useState(false);
  const [frontCamera, setFrontCamera] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ImageAnalysisResult | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const queryClient = useQueryClient();

  const API_BASE =
    process.env.EXPO_PUBLIC_CORS_ORIGIN
      ? process.env.EXPO_PUBLIC_CORS_ORIGIN
      : 'http://localhost:3001';

  // Mutation for analyzing image
  const analyzeImageMutation = useMutation({
    mutationFn: async (payload: { imageBase64: string }) => {
      const cookies = authClient.getCookie();
      if (!cookies) {
        throw new Error('Not authenticated');
      }
      const res = await axios.post(
        `${API_BASE}/api/gemini-analyze`,
        { imageBase64: payload.imageBase64 },
        {
          headers: {
            'Content-Type': 'application/json',
            'Cookie': cookies,
          },
        }
      );
      return res.data as ImageAnalysisResult;
    },
  });

  // Mutation for uploading wardrobe item
  const uploadWardrobeItemMutation = useMutation({
    mutationFn: async (payload: { imageUrl: string; name: string; description: string; colors: string; type: string }) => {
      const cookies = authClient.getCookie();
      if (!cookies) {
        throw new Error("Not authenticated");
      }

      const response = await axios.post(
        `${API_BASE}/api/wardrobe`,
        payload,
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
      Alert.alert("Success", "Your item has been added to your wardrobe!");
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
    setShowPreview(false);
    setAnalysisResult(null);
    setUploadedImageUrl(null);
  };

  const handleBackFromPreview = () => {
    Haptic.selectionAsync();
    setShowPreview(false);
    setAnalysisResult(null);
    setUploadedImageUrl(null);
  };

  const handleSave = () => {
    if (!analysisResult || !uploadedImageUrl) return;
    Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Medium);
    
    uploadWardrobeItemMutation.mutate({
      imageUrl: uploadedImageUrl,
      name: analysisResult.name,
      description: analysisResult.description,
      colors: analysisResult.colors,
      type: analysisResult.type,
    });
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
      // Step 1: Upload image to Supabase
      setIsUploading(true);
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
        Alert.alert("Upload failed", "We couldn't upload the image. Please try again.");
        setIsUploading(false);
        return;
      }

      const { data } = supabase.storage
        .from("lewi-bucket")
        .getPublicUrl(filePath);
      
      if (!data?.publicUrl) {
        Alert.alert("Error", "Failed to get image URL");
        setIsUploading(false);
        return;
      }

      // Step 2: Read image as base64 for analysis
      setIsUploading(false);
      setIsAnalyzing(true);
      const base64Image = await FileSystem.readAsStringAsync(capturedImage, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Step 3: Analyze image using Gemini
      const analysisResult = await analyzeImageMutation.mutateAsync({ 
        imageBase64: base64Image 
      });

      setIsAnalyzing(false);

      // Step 4: Show preview with analyzed data
      setAnalysisResult(analysisResult);
      setUploadedImageUrl(data.publicUrl);
      setShowPreview(true);
    } catch (err) {
      console.error("Error in analyze flow:", err);
      setIsUploading(false);
      setIsAnalyzing(false);
      Alert.alert(
        "Error", 
        err instanceof Error 
          ? err.message 
          : "Failed to analyze and upload the image. Please try again."
      );
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
        {showPreview && analysisResult && uploadedImageUrl && capturedImage ? (
          // Full Screen Preview Page
          <View className="flex-1 mx-[2vw]" edges={['top', 'bottom']}>
            {/* Header */}
            <View className="px-4 pt-[3%] pb-4">
              <Pressable
                onPress={handleBackFromPreview}
                className="flex-row items-center"
              >
                <HugeiconsIcon icon={ArrowLeftIcon} color="#DBFE01" size={24} />
                <Text className="text-white text-lg font-semibold ml-2">
                  Review & Save
                </Text>
              </Pressable>
            </View>

            {/* Content Container */}
            <View className="flex-1 px-2">
              {/* Image Section */}
              <View className="w-full rounded-2xl overflow-hidden mb-4" style={{ height: 280 }}>
                <Image
                  source={{ uri: capturedImage }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>

              {/* Analysis Results Card */}
              <View className="bg-zinc-900/60 rounded-2xl p-5 mb-4 flex-1">
                <Text className="text-2xl font-bold text-white mb-5">
                  Analysis Results
                </Text>
                
                <View className="gap-5">
                  {/* Name */}
                  <View className="pb-4 border-b border-white/10">
                    <Text className="text-white/70 text-xs font-medium mb-2 uppercase tracking-wider">
                      Name
                    </Text>
                    <Text className="text-white text-lg font-semibold">
                      {analysisResult.name}
                    </Text>
                  </View>

                  {/* Description */}
                  <View className="pb-4 border-b border-white/10">
                    <Text className="text-white/70 text-xs font-medium mb-2 uppercase tracking-wider">
                      Description
                    </Text>
                    <Text className="text-white text-base leading-5">
                      {analysisResult.description}
                    </Text>
                  </View>

                  {/* Color & Type Row */}
                  <View className="flex-row gap-4">
                    <View className="flex-1">
                      <Text className="text-white/70 text-xs font-medium mb-2 uppercase tracking-wider">
                        Color
                      </Text>
                      <Text className="text-white text-base font-semibold capitalize">
                        {analysisResult.colors}
                      </Text>
                    </View>
                    <View className="flex-1">
                      <Text className="text-white/70 text-xs font-medium mb-2 uppercase tracking-wider">
                        Category
                      </Text>
                      <Text className="text-white text-base font-semibold capitalize">
                        {analysisResult.type}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Action Buttons */}
              <View className="flex-row gap-3 pb-4">
                <Pressable
                  onPress={handleBackFromPreview}
                  className="flex-1 h-12 rounded-2xl items-center justify-center bg-white/10 active:bg-white/15"
                >
                  <Text className="text-white font-semibold text-base">
                    Edit
                  </Text>
                </Pressable>

                <Pressable
                  onPress={handleSave}
                  disabled={uploadWardrobeItemMutation.isPending}
                  className="flex-1 h-12 rounded-2xl items-center justify-center bg-lewi active:bg-lewi/90"
                >
                  <Text className="text-black font-bold text-base">
                    {uploadWardrobeItemMutation.isPending ? "Saving..." : "Save"}
                  </Text>
                </Pressable>
              </View>
            </View>

            {/* Loading Overlay */}
            {uploadWardrobeItemMutation.isPending && (
              <View className="absolute top-0 left-0 right-0 bottom-0 items-center justify-center bg-black/60">
                <Text className="text-white text-base">Saving to wardrobe...</Text>
              </View>
            )}
          </View>
        ) : capturedImage ? (
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
                  disabled={uploadWardrobeItemMutation.isPending || isUploading || isAnalyzing || analyzeImageMutation.isPending}
                  className="w-1/2 max-w-xs h-12 rounded-2xl items-center justify-center bg-lewi active:bg-lewi/90 shadow-lg shadow-black/20"
                >
                  <Text className="text-black font-bold text-lg">
                    {isAnalyzing || analyzeImageMutation.isPending
                      ? "Analyzing..."
                      : isUploading
                      ? "Uploading..."
                      : uploadWardrobeItemMutation.isPending
                      ? "Saving..."
                      : "Analyze"}
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

              {(isUploading || isAnalyzing || analyzeImageMutation.isPending) && (
                <View className="absolute top-0 left-0 right-0 bottom-0 items-center justify-center bg-black/60">
                  <Text className="text-white text-base">
                    {isAnalyzing || analyzeImageMutation.isPending
                      ? "Analyzing image..."
                      : "Uploading image..."}
                  </Text>
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