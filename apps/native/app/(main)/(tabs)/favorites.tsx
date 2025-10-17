import { ScrollView, Text, View } from "react-native";

export default function Favorites() {
  return (
    <ScrollView className="flex-1 p-6">
      <View className="py-8">
        <Text className="text-3xl font-bold text-foreground mb-2">
          Favorites
        </Text>
        <Text className="text-lg text-muted-foreground">
          Your favorite items.
        </Text>
      </View>
    </ScrollView>
  );
}
