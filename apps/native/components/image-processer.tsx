import React, { useState } from 'react';
import { View, TextInput, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import * as FileSystem from 'expo-file-system/legacy';

// Replace with your actual Gemini API Key or load from environment variables
const API_KEY = process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY || 'TODO';

interface ImageAnalysisResult {
  name: string;
  description: string;
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

    try {
      // Convert image to base64 using legacy FileSystem API
      const base64Image = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Initialize the Gemini API
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ 
        model: 'gemini-2.0-flash-exp',
      });

      // Call the API with structured prompt for JSON response
      const structuredPrompt = `Analyze this image and return this exact format as JSON:

{
  "name": "name to explain the image",
  "description": "describe the image"
}

Return ONLY the JSON object, no additional text or explanation.`;

      const result = await model.generateContent({
        contents: [
          {
            role: 'user',
            parts: [
              {
                inlineData: {
                  mimeType: 'image/jpeg',
                  data: base64Image,
                },
              },
              {
                text: structuredPrompt,
              },
            ],
          },
        ],
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
          },
        ],
      });

      const text = result.response.text();
      
      // Try to parse the JSON response
      try {
        const jsonResponse = JSON.parse(text);
        setAnalysisResult(jsonResponse);
        setResponse(''); // Clear raw response since we have structured data
        
        if (onResult) {
          onResult(jsonResponse);
        }
      } catch (parseError) {
        // If JSON parsing fails, show the raw response
        setResponse(`Raw response: ${text}`);
        setAnalysisResult(null);
        console.warn('Failed to parse JSON response:', parseError);
        
        if (onResult) {
          onResult({ name: 'Parse Error', description: text });
        }
      }
    } catch (error) {
      console.error('Error processing image:', error);
      Alert.alert('Error', 'Failed to process image. Check your API key and try again.');
      setResponse('Error: ' + (error as Error).message);
    } finally {
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
        disabled={loading || !imageUri}
        className="mb-4"
      >
        <Text>{loading ? 'Analyzing...' : 'Analyze Image'}</Text>
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

      {/* API Key Warning */}
      {API_KEY === 'TODO' && (
        <View className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
          <Text className="text-yellow-800 dark:text-yellow-200">
            ⚠️ Please set your Google Gemini API key in the EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY environment variable
          </Text>
        </View>
      )}
    </ScrollView>
  );
}
