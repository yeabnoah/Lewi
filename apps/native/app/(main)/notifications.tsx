import {
  ArrowLeftIcon,
  Calendar01Icon,
  ClothesIcon,
  CloudBigRainIcon,
  Notification02Icon,
  StarIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Dummy notification data
const notifications = [
  {
    id: "1",
    title: "New outfit suggestion",
    message: "We found a perfect outfit for your meeting today!",
    time: "2 minutes ago",
    isRead: false,
    type: "outfit",
  },
  {
    id: "2",
    title: "Weather update",
    message:
      "It's going to rain this afternoon. Consider bringing an umbrella!",
    time: "1 hour ago",
    isRead: false,
    type: "weather",
  },
  {
    id: "3",
    title: "Event reminder",
    message: "Your meeting with Sarah starts in 30 minutes",
    time: "2 hours ago",
    isRead: true,
    type: "event",
  },
  {
    id: "4",
    title: "Wardrobe update",
    message: "New items added to your wardrobe collection",
    time: "1 day ago",
    isRead: true,
    type: "wardrobe",
  },
  {
    id: "5",
    title: "Style tip",
    message: "Try pairing your blue shirt with beige pants for a fresh look",
    time: "2 days ago",
    isRead: true,
    type: "tip",
  },
  {
    id: "6",
    title: "Style tip",
    message: "Try pairing your blue shirt with beige pants for a fresh look",
    time: "2 days ago",
    isRead: true,
    type: "tip",
  },
  {
    id: "7",
    title: "Style tip",
    message: "Try pairing your blue shirt with beige pants for a fresh look",
    time: "2 days ago",
    isRead: true,
    type: "tip",
  },
  {
    id: "8",
    title: "Style tip",
    message: "Try pairing your blue shirt with beige pants for a fresh look",
    time: "2 days ago",
    isRead: true,
    type: "tip",
  },
  {
    id: "9",
    title: "Style tip",
    message: "Try pairing your blue shirt with beige pants for a fresh look",
    time: "2 days ago",
    isRead: true,
    type: "tip",
  },
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "outfit":
      return ClothesIcon;
    case "weather":
      return CloudBigRainIcon;
    case "event":
      return Calendar01Icon;
    case "wardrobe":
      return ClothesIcon;
    case "tip":
      return StarIcon;
    default:
      return Notification02Icon;
  }
};

const getNotificationColor = (type: string) => {
  switch (type) {
    case "outfit":
      return "#DBFE01";
    case "weather":
      return "#3B82F6";
    case "event":
      return "#EF4444";
    case "wardrobe":
      return "#8B5CF6";
    case "tip":
      return "#F59E0B";
    default:
      return "#6B7280";
  }
};

export default function NotificationsScreen() {
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <SafeAreaView className="flex-1 ">
      {/* Header */}
      <View className="px-4 pt-[4%] pb-4 ">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex-row items-center"
          >
            <HugeiconsIcon icon={ArrowLeftIcon} color="#DBFE01" size={24} />
            <Text className="text-white text-lg font-semibold ml-2">
              Notifications
            </Text>
          </TouchableOpacity>

          {unreadCount > 0 && (
            <View className="bg-red-500 rounded-full px-2 py-1">
              <Text className="text-white text-xs font-bold">
                {unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Notifications List */}
      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {notifications.length === 0 ? (
          <View className="flex-1 items-center justify-center py-20">
            <HugeiconsIcon
              icon={Notification02Icon}
              color="#6B7280"
              size={64}
            />
            <Text className="text-gray-400 text-lg font-medium mt-4">
              No notifications yet
            </Text>
            <Text className="text-gray-500 text-sm mt-2 text-center">
              We'll notify you when there's something new
            </Text>
          </View>
        ) : (
          <View className="py-4">
            {notifications.map((notification) => (
              <TouchableOpacity
                key={notification.id}
                className={`p-4 rounded-xl mb-3 ${
                  notification.isRead
                    ? "bg-white/5"
                    : "bg-white/10 border border-white/20"
                }`}
                activeOpacity={0.7}
              >
                <View className="flex-row items-start">
                  {/* Notification Icon */}
                  <View
                    className="w-10 h-10 rounded-full items-center justify-center mr-3"
                    style={{
                      backgroundColor:
                        getNotificationColor(notification.type) + "20",
                    }}
                  >
                    <HugeiconsIcon
                      icon={getNotificationIcon(notification.type)}
                      color={getNotificationColor(notification.type)}
                      size={20}
                    />
                  </View>

                  {/* Notification Content */}
                  <View className="flex-1">
                    <View className="flex-row items-center justify-between mb-1">
                      <Text className="text-white font-semibold text-base">
                        {notification.title}
                      </Text>
                      {!notification.isRead && (
                        <View className="w-2 h-2 bg-[#DBFE01] rounded-full" />
                      )}
                    </View>

                    <Text className="text-gray-300 text-sm leading-5 mb-2">
                      {notification.message}
                    </Text>

                    <Text className="text-gray-500 text-xs">
                      {notification.time}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
