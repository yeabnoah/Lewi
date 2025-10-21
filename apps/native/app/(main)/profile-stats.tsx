import { Container } from "@/components/container";
import { Card } from "@/components/ui/card";
import { useColorScheme } from "@/lib/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";
import { AwardIcon, ClockIcon, TargetIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Dimensions, Pressable, ScrollView, Text, View } from "react-native";

export default function ProfileStats() {
  const { isDarkColorScheme } = useColorScheme();
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const screenWidth = Dimensions.get("window").width;

  // Mock data for charts and stats
  const weeklyData = [12, 8, 15, 10, 18, 14, 16];
  const monthlyData = [45, 52, 38, 61, 55, 48, 42, 39, 44, 51, 47, 53];
  const outfitCategories = [
    { name: "Casual", count: 18, percentage: 43, color: "#10b981" },
    { name: "Formal", count: 12, percentage: 29, color: "#3b82f6" },
    { name: "Party", count: 8, percentage: 19, color: "#f59e0b" },
    { name: "Workout", count: 4, percentage: 9, color: "#ef4444" },
  ];

  const recentActivity = [
    {
      type: "outfit",
      action: "Created",
      item: "Summer Casual Look",
      time: "2h ago",
    },
    {
      type: "item",
      action: "Added",
      item: "Blue Denim Jacket",
      time: "5h ago",
    },
    {
      type: "chat",
      action: "Stylist Chat",
      item: "Color coordination advice",
      time: "1d ago",
    },
    {
      type: "outfit",
      action: "Favorited",
      item: "Office Professional",
      time: "2d ago",
    },
  ];

  const achievements = [
    {
      title: "Style Explorer",
      description: "Created 25+ outfits",
      progress: 25,
      max: 25,
      icon: "star",
    },
    {
      title: "Wardrobe Master",
      description: "Added 100+ items",
      progress: 156,
      max: 100,
      icon: "shirt",
    },
    {
      title: "Social Butterfly",
      description: "Shared 10+ outfits",
      progress: 7,
      max: 10,
      icon: "share",
    },
  ];

  const renderBarChart = (data: number[], maxValue: number) => {
    return (
      <View className="flex-row items-end justify-between h-24 px-2">
        {data.map((value, index) => (
          <View key={index} className="flex-1 items-center mx-1">
            <View
              className="bg-lewi rounded-t-sm w-full"
              style={{
                height: (value / maxValue) * 80,
                minHeight: 4,
              }}
            />
            <Text className="text-white/60 text-xs mt-1">{index + 1}</Text>
          </View>
        ))}
      </View>
    );
  };

  const renderPieChart = () => {
    return (
      <View className="items-center">
        <View className="w-32 h-32 rounded-full border-4 border-white/10 items-center justify-center relative">
          {/* Simplified pie chart using overlapping circles */}
          <View className="absolute inset-0 rounded-full bg-green-500 opacity-20" />
          <View
            className="absolute inset-0 rounded-full bg-blue-500 opacity-20"
            style={{ transform: [{ rotate: "90deg" }] }}
          />
          <View
            className="absolute inset-0 rounded-full bg-yellow-500 opacity-20"
            style={{ transform: [{ rotate: "180deg" }] }}
          />
          <View
            className="absolute inset-0 rounded-full bg-red-500 opacity-20"
            style={{ transform: [{ rotate: "270deg" }] }}
          />
          <View className="w-24 h-24 rounded-full bg-zinc-900/80 items-center justify-center">
            <Text className="text-white font-bold text-lg">42</Text>
            <Text className="text-white/70 text-xs">Total</Text>
          </View>
        </View>
        <View className="mt-4 gap-2">
          {outfitCategories.map((category, index) => (
            <View key={index} className="flex-row items-center gap-2">
              <View
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <Text className="text-white/70 text-sm">{category.name}</Text>
              <Text className="text-white text-sm font-medium">
                {category.count}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <ScrollView
      className="flex-1 p-4"
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={true}
      bounces={true}
    >
      {/* Period Selector */}
      <View className="flex-row bg-white/5 rounded-2xl p-1 mb-6">
        {["week", "month", "year"].map((period) => (
          <Pressable
            key={period}
            className={`flex-1 py-3 rounded-xl ${
              selectedPeriod === period ? "bg-lewi" : "bg-transparent"
            }`}
            onPress={() => setSelectedPeriod(period)}
          >
            <Text
              className={`text-center font-medium capitalize ${
                selectedPeriod === period ? "text-black" : "text-white/70"
              }`}
            >
              {period}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Quick Stats Grid */}
      <View className="-mx-1 flex-row flex-wrap mb-6">
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
            <View className="flex-row items-center gap-1 mt-1">
              <Ionicons name="trending-up" size={12} color="#10b981" />
              <Text className="text-green-400 text-xs">+12%</Text>
            </View>
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
            <View className="flex-row items-center gap-1 mt-1">
              <Ionicons name="trending-up" size={12} color="#10b981" />
              <Text className="text-green-400 text-xs">+8%</Text>
            </View>
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
            <View className="flex-row items-center gap-1 mt-1">
              <Ionicons name="trending-up" size={12} color="#10b981" />
              <Text className="text-green-400 text-xs">+15%</Text>
            </View>
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
            <View className="flex-row items-center gap-1 mt-1">
              <Ionicons name="trending-up" size={12} color="#10b981" />
              <Text className="text-green-400 text-xs">+22%</Text>
            </View>
          </Card>
        </View>
      </View>

      {/* Activity Chart */}
      <Card className="rounded-2xl p-5 mb-6 bg-zinc-900/60 border-transparent">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-lg font-semibold text-white">
            Activity Overview
          </Text>
          <View className="flex-row items-center gap-2">
            <Ionicons name="trending-up" size={16} color="#10b981" />
            <Text className="text-green-400 text-sm font-medium">
              +18% this week
            </Text>
          </View>
        </View>
        {renderBarChart(
          selectedPeriod === "week" ? weeklyData : monthlyData.slice(0, 7),
          Math.max(
            ...(selectedPeriod === "week"
              ? weeklyData
              : monthlyData.slice(0, 7))
          )
        )}
        <View className="flex-row justify-between mt-2">
          <Text className="text-white/60 text-xs">Mon</Text>
          <Text className="text-white/60 text-xs">Tue</Text>
          <Text className="text-white/60 text-xs">Wed</Text>
          <Text className="text-white/60 text-xs">Thu</Text>
          <Text className="text-white/60 text-xs">Fri</Text>
          <Text className="text-white/60 text-xs">Sat</Text>
          <Text className="text-white/60 text-xs">Sun</Text>
        </View>
      </Card>

      {/* Outfit Categories */}
      <Card className="rounded-2xl p-5 mb-6 bg-zinc-900/60 border-transparent">
        <Text className="text-lg font-semibold text-white mb-4">
          Outfit Categories
        </Text>
        {renderPieChart()}
      </Card>

      {/* Achievements */}
      <Card className="rounded-2xl p-5 mb-6 bg-zinc-900/60 border-transparent">
        <View className="flex-row items-center gap-2 mb-4">
          <HugeiconsIcon
            icon={AwardIcon}
            size={20}
            color={isDarkColorScheme ? "#FFFFFF" : "#0A0A0A"}
          />
          <Text className="text-lg font-semibold text-white">Achievements</Text>
        </View>
        <View className="gap-4">
          {achievements.map((achievement, index) => (
            <View key={index} className="flex-row items-center gap-3">
              <View className="h-12 w-12 items-center justify-center rounded-full bg-white/10">
                <Ionicons
                  name={achievement.icon as any}
                  size={20}
                  color={isDarkColorScheme ? "#FFFFFF" : "#0A0A0A"}
                />
              </View>
              <View className="flex-1">
                <Text className="text-white font-medium">
                  {achievement.title}
                </Text>
                <Text className="text-white/70 text-sm">
                  {achievement.description}
                </Text>
                <View className="flex-row items-center gap-2 mt-1">
                  <View className="flex-1 h-2 bg-white/10 rounded-full">
                    <View
                      className="h-2 bg-lewi rounded-full"
                      style={{
                        width: `${Math.min(
                          (achievement.progress / achievement.max) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </View>
                  <Text className="text-white/70 text-xs">
                    {achievement.progress}/{achievement.max}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </Card>

      {/* Recent Activity */}
      <Card className="rounded-2xl p-5 mb-6 bg-zinc-900/60 border-transparent">
        <View className="flex-row items-center gap-2 mb-4">
          <HugeiconsIcon
            icon={ClockIcon}
            size={20}
            color={isDarkColorScheme ? "#FFFFFF" : "#0A0A0A"}
          />
          <Text className="text-lg font-semibold text-white">
            Recent Activity
          </Text>
        </View>
        <View className="gap-3">
          {recentActivity.map((activity, index) => (
            <View key={index} className="flex-row items-center gap-3">
              <View className="h-8 w-8 items-center justify-center rounded-full bg-white/10">
                <Ionicons
                  name={
                    activity.type === "outfit"
                      ? "shirt-outline"
                      : activity.type === "item"
                      ? "add-outline"
                      : "chatbubble-outline"
                  }
                  size={16}
                  color={isDarkColorScheme ? "#FFFFFF" : "#0A0A0A"}
                />
              </View>
              <View className="flex-1">
                <Text className="text-white font-medium">
                  {activity.action} {activity.item}
                </Text>
                <Text className="text-white/70 text-sm">{activity.time}</Text>
              </View>
            </View>
          ))}
        </View>
      </Card>

      {/* Style Insights */}
      <Card className="rounded-2xl p-5 mb-6 bg-zinc-900/60 border-transparent">
        <View className="flex-row items-center gap-2 mb-4">
          <HugeiconsIcon
            icon={TargetIcon}
            size={20}
            color={isDarkColorScheme ? "#FFFFFF" : "#0A0A0A"}
          />
          <Text className="text-lg font-semibold text-white">
            Style Insights
          </Text>
        </View>
        <View className="gap-4">
          <View className="flex-row items-center justify-between p-3 rounded-xl bg-white/5">
            <Text className="text-white font-medium">Most Worn Color</Text>
            <View className="flex-row items-center gap-2">
              <View className="w-4 h-4 rounded-full bg-blue-500" />
              <Text className="text-white">Navy Blue</Text>
            </View>
          </View>
          <View className="flex-row items-center justify-between p-3 rounded-xl bg-white/5">
            <Text className="text-white font-medium">Favorite Brand</Text>
            <Text className="text-white">Zara</Text>
          </View>
          <View className="flex-row items-center justify-between p-3 rounded-xl bg-white/5">
            <Text className="text-white font-medium">Style Score</Text>
            <View className="flex-row items-center gap-1">
              <Text className="text-white font-bold">8.5</Text>
              <Text className="text-white/70 text-sm">/10</Text>
            </View>
          </View>
        </View>
      </Card>
    </ScrollView>
  );
}
