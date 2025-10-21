import { Notification02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import QuickActions from "./QuickActions";
import TodaysPick from "./TodaysPick";
import TrendingCategories from "./TrendingCategories";
import UpcomingEvents from "./UpcomingEvents";
import WeatherCard from "./WeatherCard";

export default function HomeScreen() {
  return (
    <View className="flex-1">
      <View className="px-4 pt-[14%] pb-2 backdrop-blur-sm">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="dark:text-white/40 text-black/40">
              Good Morning
            </Text>
            <Text className="text-2xl font-bold text-white">John Doe</Text>
          </View>

          <TouchableOpacity
            className="bg-white/5 rounded-full p-3"
            onPress={() => router.push("/notifications")}
            activeOpacity={0.7}
          >
            <HugeiconsIcon
              icon={Notification02Icon}
              color="#DBFE01"
              size={20}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={true}
        bounces={true}
      >
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
    </View>
  );
}
