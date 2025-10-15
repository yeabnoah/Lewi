import { Container } from "@/components/container";
import { useColorScheme } from "@/lib/use-color-scheme";
import { ScrollView, Text, View } from "react-native";
import { Switch } from "react-native-gesture-handler";

export default function Profile() {
  const { isDarkColorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Container>
      <ScrollView className="flex-1 p-6">
        <View className="py-8">
          <Text className="text-3xl font-bold text-foreground mb-2">
            Profile
          </Text>
          <Text className="text-lg text-muted-foreground">
            this is your profile screen.
          </Text>
        </View>

        <View className="flex-row items-center justify-between py-3 px-4 bg-card rounded-xl mb-2 border border-border">
          <View className="flex-1 mr-4">
            <Text className="text-base font-medium text-foreground mb-1">
              Dark Mode
            </Text>
            <Text className="text-sm text-muted-foreground leading-5">
              Switch between light and dark themes
            </Text>
          </View>
          <Switch value={isDarkColorScheme} onValueChange={toggleColorScheme} />
        </View>
      </ScrollView>
    </Container>
  );
}
