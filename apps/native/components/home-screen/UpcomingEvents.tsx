import { FlatList, Pressable, Text, View } from "react-native";
import { HugeiconsIcon } from "@hugeicons/react-native";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  DishIcon,
} from "@hugeicons/core-free-icons";
import * as Haptic from "expo-haptics";

const upcomingEvents = [
  {
    id: "1",
    title: "Team Meeting",
    time: "2:00 PM Today",
    dressCode: "Business Casual",
    icon: BriefcaseIcon,
    iconBg: "bg-amber-100",
    iconColor: "#8B4513",
  },
  {
    id: "2",
    title: "Dinner Date",
    time: "Tomorrow 7:00 PM",
    dressCode: "Smart Casual",
    icon: DishIcon,
    iconBg: "bg-gray-100",
    iconColor: "#6B7280",
  },
];

const renderEventItem = ({ item }: { item: any }) => (
  <Pressable
    onPress={() => {
      Haptic.selectionAsync();
    }}
    className="bg-zinc-900/50 rounded-2xl p-4 mb-3 flex-row items-center"
  >
    {/* Icon */}
    <View
      className={`w-12 h-12 rounded-full ${item.iconBg} items-center justify-center mr-4`}
    >
      <HugeiconsIcon icon={item.icon} color={item.iconColor} size={24} />
    </View>

    {/* Event Details */}
    <View className="flex-1">
      <Text className="text-white text-lg font-semibold mb-1">
        {item.title}
      </Text>
      <Text className="text-white/60 text-sm mb-2">{item.time}</Text>
      <Text className="text-white/80 text-sm font-medium">
        Suggested: {item.dressCode}
      </Text>
    </View>

    {/* Arrow */}
    <HugeiconsIcon icon={ArrowRightIcon} color="#6B7280" size={20} />
  </Pressable>
);

export default function UpcomingEvents() {
  return (
    <View className="mt-8 mb-4">
      <View className="flex-row justify-between items-center mx-2 mb-4">
        <Text className="text-white text-lg font-semibold">
          Upcoming Events
        </Text>
        <Pressable
          onPress={() => {
            Haptic.selectionAsync();
          }}
        >
          <Text className="text-white/80 text-sm font-medium">See All</Text>
        </Pressable>
      </View>

      <FlatList
        data={upcomingEvents}
        renderItem={renderEventItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
    </View>
  );
}
