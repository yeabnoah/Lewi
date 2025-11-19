import { useColorScheme } from "@/lib/use-color-scheme";
import { ArrowLeftIcon, MagicWand02Icon, SparklesIcon, CheckmarkCircle01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import * as Haptic from "expo-haptics";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Mock data type for UI development
type WardrobeItem = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  type: string;
  color: string;
};

export default function CommandOutfitScreen() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<WardrobeItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    Keyboard.dismiss();
    Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Medium);
    setIsGenerating(true);
    setResults([]);
    setSelectedItems(new Set());

    // Simulate API call
    setTimeout(() => {
      setResults([
        {
          id: "1",
          name: "Navy Blue Blazer",
          description: "Classic fit navy blue blazer, perfect for business casual.",
          imageUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=3436&auto=format&fit=crop",
          type: "OUTERWEAR",
          color: "Blue",
        },
        {
          id: "2",
          name: "White Oxford Shirt",
          description: "Crisp white button-down shirt.",
          imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=3388&auto=format&fit=crop",
          type: "TOP",
          color: "White",
        },
        {
          id: "3",
          name: "Beige Chinos",
          description: "Slim fit beige chinos.",
          imageUrl: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=3387&auto=format&fit=crop",
          type: "BOTTOM",
          color: "Beige",
        },
      ]);
      setIsGenerating(false);
    }, 2000);
  };

  const toggleSelection = (id: string) => {
    Haptic.selectionAsync();
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  const handleCreateOutfit = () => {
    if (selectedItems.size === 0) return;
    Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Medium);
    Alert.alert(
      "Outfit Created!",
      `Successfully created an outfit with ${selectedItems.size} items.`,
      [{ text: "OK", onPress: () => router.back() }]
    );
  };

  const renderItem = ({ item }: { item: WardrobeItem }) => {
    const isSelected = selectedItems.has(item.id);
    return (
      <Pressable 
        onPress={() => toggleSelection(item.id)}
        className={`rounded-2xl p-3 mb-3 flex-row items-center border ${
          isSelected ? "bg-zinc-800 border-lewi" : "bg-zinc-900/50 border-white/5"
        }`}
      >
        <View className="h-20 w-20 rounded-xl overflow-hidden bg-zinc-800 mr-4 relative">
          <Image
            source={{ uri: item.imageUrl }}
            className="h-full w-full"
            resizeMode="cover"
          />
          {isSelected && (
            <View className="absolute inset-0 bg-black/40 items-center justify-center">
              <HugeiconsIcon icon={CheckmarkCircle01Icon} size={24} color="#DBFE01" variant="solid" />
            </View>
          )}
        </View>
        <View className="flex-1">
          <View className="flex-row justify-between items-start">
            <Text className={`font-semibold text-base mb-1 ${isSelected ? "text-lewi" : "text-white"}`}>
              {item.name}
            </Text>
            <View className="bg-zinc-800 px-2 py-1 rounded-md">
              <Text className="text-white/60 text-[10px] uppercase font-medium">
                {item.type}
              </Text>
            </View>
          </View>
          <Text className="text-white/60 text-sm numberOfLines={2}">
            {item.description}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Header */}
        <View className="px-4 py-3 flex-row items-center justify-between z-10">
          <Pressable
            onPress={() => {
              Haptic.selectionAsync();
              router.back();
            }}
            className="h-10 w-10 rounded-full items-center justify-center bg-zinc-900 active:bg-zinc-800"
          >
            <HugeiconsIcon icon={ArrowLeftIcon} size={20} color="white" />
          </Pressable>
          <Text className="text-white font-bold text-lg">Magic Outfit</Text>
          <View className="w-10" />
        </View>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 px-4 pt-4">
            {/* Input Section */}
            <View className="mb-6">
              <Text className="text-white/80 text-base mb-3 font-medium">
                Describe your occasion or vibe
              </Text>
              <View className="bg-zinc-900 rounded-2xl p-4 border border-white/10 min-h-[120px]">
                <TextInput
                  className="text-white text-lg leading-6 flex-1"
                  placeholder="e.g. I need a sharp outfit for a tech conference in San Francisco. It should be smart casual but comfortable."
                  placeholderTextColor="#525252"
                  multiline
                  textAlignVertical="top"
                  value={prompt}
                  onChangeText={setPrompt}
                  autoFocus
                />
              </View>
            </View>

            {/* Generate Button */}
            <Pressable
              onPress={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className={`h-14 rounded-2xl flex-row items-center justify-center mb-8 ${
                !prompt.trim() ? "bg-zinc-800 opacity-50" : "bg-lewi active:bg-lewi/90"
              }`}
            >
              {isGenerating ? (
                <ActivityIndicator color="black" />
              ) : (
                <>
                  <HugeiconsIcon
                    icon={MagicWand02Icon}
                    size={20}
                    color={!prompt.trim() ? "#A1A1AA" : "black"}
                    variant="solid"
                  />
                  <Text
                    className={`font-bold text-lg ml-2 ${
                      !prompt.trim() ? "text-zinc-400" : "text-black"
                    }`}
                  >
                    {results.length > 0 ? "Regenerate" : "Generate Outfit"}
                  </Text>
                </>
              )}
            </Pressable>

            {/* Results Section */}
            <View className="flex-1">
              {results.length > 0 && (
                <View className="flex-row items-center justify-between mb-4">
                  <View className="flex-row items-center">
                    <HugeiconsIcon icon={SparklesIcon} size={16} color="#DBFE01" />
                    <Text className="text-white/80 font-semibold ml-2 text-sm uppercase tracking-wider">
                      Recommended Items
                    </Text>
                  </View>
                  {selectedItems.size > 0 && (
                    <Text className="text-lewi text-sm font-bold">
                      {selectedItems.size} selected
                    </Text>
                  )}
                </View>
              )}

              {results.length === 0 && !isGenerating ? (
                <View className="flex-1 items-center justify-center opacity-30">
                  <HugeiconsIcon icon={MagicWand02Icon} size={48} color="white" />
                  <Text className="text-white text-center mt-4 max-w-[200px]">
                    Enter a prompt above to generate personalized outfit recommendations
                  </Text>
                </View>
              ) : (
                <FlatList
                  data={results}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                  contentContainerStyle={{ paddingBottom: 120 }}
                  showsVerticalScrollIndicator={false}
                  ListEmptyComponent={
                    isGenerating ? (
                      <View className="items-center justify-center py-10">
                        <Text className="text-white/50">Analyzing your wardrobe...</Text>
                      </View>
                    ) : null
                  }
                />
              )}
            </View>

            {/* Floating Create Outfit Button (shown when items are selected) */}
            {selectedItems.size > 0 && (
              <View className="absolute bottom-8 left-4 right-4">
                <Pressable
                  onPress={handleCreateOutfit}
                  className="h-14 bg-white rounded-2xl flex-row items-center justify-center shadow-lg shadow-black/50 active:bg-white/90"
                >
                  <Text className="text-black font-bold text-lg mr-2">
                    Create Outfit
                  </Text>
                  <View className="bg-black/10 px-2 py-1 rounded-md">
                    <Text className="text-black text-xs font-bold">
                      {selectedItems.size}
                    </Text>
                  </View>
                </Pressable>
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
