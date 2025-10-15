import { Container } from "@/components/container";
import { ScrollView, Text, View } from "react-native";

export default function Wardrobe() {
  return (
    <Container>
      <ScrollView className="flex-1 p-6">
        <View className="py-8">
          <Text className="text-3xl font-bold text-foreground mb-2">
            Wardrobe
          </Text>
          <Text className="text-lg text-muted-foreground">
            Your wardrobe is your canvas.
          </Text>
        </View>
      </ScrollView>
    </Container>
  );
}
