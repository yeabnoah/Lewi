import React, { useState } from 'react';
import { View, TextInput, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import * as FileSystem from 'expo-file-system/legacy';
import { supabase } from '@/lib/supabaseClient';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { authClient } from '@/lib/auth-client';

interface ImageAnalysisResult {
  name: string;
  description: string;
  colors: string;
  type: string;
}

interface ImageProcessorProps {
  onResult?: (result: ImageAnalysisResult) => void;
}

export default function ImageProcessor({ onResult }: ImageProcessorProps) {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [response, setResponse] = useState('');
  const [analysisResult, setAnalysisResult] = useState<ImageAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showColors, setShowColors] = useState(false);
  const [showType, setShowType] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const API_BASE =
  process.env.EXPO_PUBLIC_CORS_ORIGIN
    ? process.env.EXPO_PUBLIC_CORS_ORIGIN
    : 'http://localhost:3001';

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

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
      console.error(error);
    }
  };

  const processImage = async () => {
    if (!imageUri) {
      Alert.alert('Error', 'Please select an image');
      return;
    }

    setLoading(true);
    setResponse('');
    setAnalysisResult(null);
    setShowName(false);
    setShowDescription(false);
    setShowColors(false);
    setShowType(false);

    try {
      if (!API_BASE) {
        throw new Error('API base URL is not configured. Set EXPO_PUBLIC_WEB_API_BASE.');
      }

      // 1) Upload to Supabase (mirrors edit-profile flow)
      setIsUploading(true);
      const fileName = `analysis-${Date.now()}.jpg`;
      const filePath = `uploads/${fileName}`;

      const fetchResponse = await fetch(imageUri);
      const arrayBuffer = await fetchResponse.arrayBuffer();
      const fileBuffer = new Uint8Array(arrayBuffer);

      const { error: uploadError } = await supabase.storage
        .from('lewi-bucket')
        .upload(filePath, fileBuffer, {
          contentType: 'image/jpeg',
          upsert: false,
        });

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      const { data: publicUrlData } = supabase.storage
        .from('lewi-bucket')
        .getPublicUrl(filePath);

      // 2) Read base64 for backend analysis
      const base64Image = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // 3) Call backend route for analysis via TanStack Query + Axios with Cookie header
      const jsonResponse = await analyzeImageMutation.mutateAsync({ imageBase64: base64Image });
      setAnalysisResult(jsonResponse);
      setResponse('');
      if (onResult) onResult(jsonResponse);
    } catch (error) {
      console.error('Error processing image:', error);
      Alert.alert('Error', 'Failed to process image. Check your API key and try again.');
      setResponse('Error: ' + (error as Error).message);
    } finally {
      setIsUploading(false);
      setLoading(false);
    }
  };

  return (
    <ScrollView className="p-4 bg-white dark:bg-gray-950">
      <Text className="text-2xl font-bold mb-4">Image Processor</Text>
      
      {/* Image Picker */}
      <Button 
        onPress={pickImage} 
        className="mb-4"
      >
        <Text>Pick Image</Text>
      </Button>

      {imageUri && (
        <View className="mb-4">
          <Text className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Image selected: {imageUri.split('/').pop()}
          </Text>
        </View>
      )}

      {/* Process Button */}
      <Button 
        onPress={processImage} 
        disabled={loading || isUploading || analyzeImageMutation.isPending || !imageUri}
        className="mb-4"
      >
        <Text>
          {loading || analyzeImageMutation.isPending
            ? 'Analyzing...'
            : isUploading
            ? 'Uploading...'
            : 'Analyze Image'}
        </Text>
      </Button>

      {/* Analysis Result */}
      {analysisResult && (
        <View className="space-y-4">
          <View className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <Text className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-4">
              📸 Image Analysis Results
            </Text>
            
            {/* Action Buttons */}
            <View className="space-y-3">
              <Button 
                onPress={() => setShowName(!showName)}
                className="bg-green-500 hover:bg-green-600"
              >
                <Text className="text-white font-semibold">
                  {showName ? 'Hide Name' : 'Show Name'}
                </Text>
              </Button>
              
              <Button 
                onPress={() => setShowDescription(!showDescription)}
                className="bg-purple-500 hover:bg-purple-600"
              >
                <Text className="text-white font-semibold">
                  {showDescription ? 'Hide Description' : 'Show Description'}
                </Text>
              </Button>

              <Button 
                onPress={() => setShowColors(!showColors)}
                className="bg-blue-500 hover:bg-blue-600"
              >
                <Text className="text-white font-semibold">
                  {showColors ? 'Hide Color' : 'Show Color'}
                </Text>
              </Button>

              <Button 
                onPress={() => setShowType(!showType)}
                className="bg-amber-500 hover:bg-amber-600"
              >
                <Text className="text-white font-semibold">
                  {showType ? 'Hide Type' : 'Show Type'}
                </Text>
              </Button>
            </View>
            
            {/* Display Results */}
            <View className="mt-4 space-y-3">
              {showName && (
                <View className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <Text className="text-sm font-semibold text-green-700 dark:text-green-300 mb-2">
                    🏷️ Name:
                  </Text>
                  <Text className="text-base text-green-900 dark:text-green-100 font-medium">
                    {analysisResult.name}
                  </Text>
                </View>
              )}
              
              {showDescription && (
                <View className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                  <Text className="text-sm font-semibold text-purple-700 dark:text-purple-300 mb-2">
                    📝 Description:
                  </Text>
                  <Text className="text-base text-purple-900 dark:text-purple-100 leading-5">
                    {analysisResult.description}
                  </Text>
                </View>
              )}

              {showColors && (
                <View className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <Text className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-2">
                    🎨 Color:
                  </Text>
                  <Text className="text-base text-blue-900 dark:text-blue-100">
                    {analysisResult.colors}
                  </Text>
                </View>
              )}

              {showType && (
                <View className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                  <Text className="text-sm font-semibold text-amber-700 dark:text-amber-300 mb-2">
                    🧩 Type:
                  </Text>
                  <Text className="text-base text-amber-900 dark:text-amber-100">
                    {analysisResult.type}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      )}

      {/* Raw Response (fallback) */}
      {response && (
        <View className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <Text className="text-sm font-semibold mb-2 text-red-600 dark:text-red-400">
            Raw Response:
          </Text>
          <Text className="text-gray-900 dark:text-gray-100 text-sm">
            {response}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}
