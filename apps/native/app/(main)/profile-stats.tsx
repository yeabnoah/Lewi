import { Container } from "@/components/container";
import { Card } from "@/components/ui/card";
import { useColorScheme } from "@/lib/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function ProfileStats() {
  const { isDarkColorScheme } = useColorScheme();
  const router = useRouter();

  return (
    <Container>
      <ScrollView
        className="flex-1 px-4 pt-[12%]"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={true}
        bounces={true}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between mb-6">
          <View className="flex-row items-center gap-3">
            <Pressable
              accessibilityLabel="Go back"
              className="bg-white/5 rounded-full p-3 w-12 h-12 items-center justify-center"
              onPress={() => router.back()}
            >
              <Ionicons
                name="chevron-back"
                size={22}
                color={isDarkColorScheme ? "#FFFFFF" : "#0A0A0A"}
              />
            </Pressable>
            <Text className="text-2xl font-bold text-white">Your Stats</Text>
          </View>
        </View>

        {/* Stats Grid */}
        <View className="-mx-1 flex-row flex-wrap">
          <View className="w-1/2 px-1 mb-2">
            <Card className="items-center rounded-2xl py-6 gap-2 bg-zinc-900/60 border-transparent">
              <View className="h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <Ionicons
                  name="bar-chart-outline"
                  size={20}
                  color={isDarkColorScheme ? "#FFFFFF" : "#0A0A0A"}
                />
              </View>
              <Text className="text-2xl font-bold text-white">42</Text>
              <Text className="text-white/70 text-xs">Outfits Created</Text>
            </Card>
          </View>

          <View className="w-1/2 px-1 mb-2">
            <Card className="items-center rounded-2xl py-6 gap-2 bg-zinc-900/60 border-transparent">
              <View className="h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <Ionicons
                  name="shirt-outline"
                  size={20}
                  color={isDarkColorScheme ? "#FFFFFF" : "#0A0A0A"}
                />
              </View>
              <Text className="text-2xl font-bold text-white">156</Text>
              <Text className="text-white/70 text-xs">Items in Wardrobe</Text>
            </Card>
          </View>

          <View className="w-1/2 px-1 mb-2">
            <Card className="items-center rounded-2xl py-6 gap-2 bg-zinc-900/60 border-transparent">
              <View className="h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={20}
                  color={isDarkColorScheme ? "#FFFFFF" : "#0A0A0A"}
                />
              </View>
              <Text className="text-2xl font-bold text-white">23</Text>
              <Text className="text-white/70 text-xs">Stylist Chats</Text>
            </Card>
          </View>

          <View className="w-1/2 px-1 mb-2">
            <Card className="items-center rounded-2xl py-6 gap-2 bg-zinc-900/60 border-transparent">
              <View className="h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <Ionicons
                  name="heart-outline"
                  size={20}
                  color={isDarkColorScheme ? "#FFFFFF" : "#0A0A0A"}
                />
              </View>
              <Text className="text-2xl font-bold text-white">18</Text>
              <Text className="text-white/70 text-xs">Favorite Outfits</Text>
            </Card>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}
