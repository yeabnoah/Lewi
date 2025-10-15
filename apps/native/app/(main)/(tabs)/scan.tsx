import { Container } from "@/components/container";
import { ScrollView, Text, View } from "react-native";

export default function Scan() {
  return (
    <Container>
      <ScrollView className="flex-1 p-6">
        <View className="py-8">
          <Text className="text-3xl font-bold text-foreground mb-2">Scan</Text>
          <Text className="text-lg text-muted-foreground">
            Scan your clothes.
          </Text>
        </View>
      </ScrollView>
    </Container>
  );
}
