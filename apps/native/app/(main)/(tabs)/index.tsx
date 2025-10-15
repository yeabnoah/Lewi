import { Container } from "@/components/container";
import { useState } from "react";
import { ScrollView, Switch, Text, useColorScheme, View } from "react-native";

export default function TabOne() {
  const [isDarkColorScheme, setIsDarkColorScheme] = useState(false);
  return (
    <Container>
      <ScrollView className="flex-1 p-6">
        <View className="py-8">
          <Text className="text-3xl font-bold text-[#DBFE01] mb-2">
            Tab One
          </Text>
          <Text className="text-lg text-muted-foreground">
            Explore the first section of your app
          </Text>

          <Switch
            className="w-fit h-fit"
            value={isDarkColorScheme}
            onValueChange={setIsDarkColorScheme}
          />
          <Text className=" text-white">
            {isDarkColorScheme ? "Dark" : "Light"}
          </Text>
        </View>
      </ScrollView>
    </Container>
  );
}
