import { Notification02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { ScrollView, Text, View } from "react-native";

import QuickActions from "./QuickActions";
import TodaysPick from "./TodaysPick";
import TrendingCategories from "./TrendingCategories";
import UpcomingEvents from "./UpcomingEvents";
import WeatherCard from "./WeatherCard";

export default function HomeScreen() {
  return (
    <ScrollView
      className="flex-1 px-4 pt-[14%]"
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={true}
      bounces={true}
    >
      {/* Header */}
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="dark:text-white/40 text-black/40">Good Morning</Text>
          <Text className="text-2xl font-bold text-white">John Doe</Text>
        </View>

        <View className="bg-white/5 rounded-full p-3">
          <HugeiconsIcon icon={Notification02Icon} color="#DBFE01" size={20} />
        </View>
      </View>

      {/* Weather Card */}
      <WeatherCard />

      {/* Today's Pick */}
      <TodaysPick />

      {/* Upcoming Events */}
      <UpcomingEvents />

      {/* Trending Categories */}
      <TrendingCategories />

      {/* Quick Actions */}
      <QuickActions />
    </ScrollView>
  );
}
