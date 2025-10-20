import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useState } from "react";
import * as Haptic from "expo-haptics";
import { useRouter } from "expo-router";
import { HugeiconsIcon } from "@hugeicons/react-native";
import {
  PlusSignIcon,
  Calendar01Icon,
  UserIcon,
  ClothesIcon,
} from "@hugeicons/core-free-icons";
import dummyEvents from "@/components/dummy-data/dummy-events";
import dummyPastEvents from "@/components/dummy-data/dummy-past-events";

export default function Events() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const router = useRouter();

  const iconMap: Record<string, any> = {
    briefcase: Calendar01Icon,
    utensils: UserIcon,
    dumbbell: ClothesIcon,
    rings: UserIcon,
  };

  return (
    <ScrollView
      className="flex-1 px-4 pt-[14%]"
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={true}
      bounces={true}
    >
      <View className="flex-row items-center justify-between mb-8">
        <View>
          <Text className="text-white/60 text-sm font-medium mb-1">
            Planner
          </Text>
          <Text className="text-3xl font-bold text-white">Events</Text>
        </View>
        <Pressable
          className="bg-white/5 rounded-full p-3 w-12 h-12 items-center justify-center"
          onPress={() => {
            Haptic.selectionAsync();
            router.push("/(main)/add-meeting");
          }}
        >
          <HugeiconsIcon icon={PlusSignIcon} color="white" size={24} />
        </Pressable>
      </View>

      {/* Segmented tabs */}
      <View className="bg-zinc-900 rounded-2xl p-1 flex-row items-center w-full max-w-[380px] self-center mb-6">
        <Pressable
          className={`flex-1 py-3 rounded-2xl items-center ${
            activeTab === "upcoming" ? "bg-white" : "bg-transparent"
          }`}
          onPress={() => {
            if (activeTab !== "upcoming") {
              Haptic.selectionAsync();
              setActiveTab("upcoming");
            }
          }}
        >
          <Text
            className={`text-sm font-semibold ${
              activeTab === "upcoming" ? "text-black" : "text-white/70"
            }`}
          >
            Upcoming
          </Text>
        </Pressable>

        <Pressable
          className={`flex-1 py-3 rounded-2xl items-center ${
            activeTab === "past" ? "bg-white" : "bg-transparent"
          }`}
          onPress={() => {
            if (activeTab !== "past") {
              Haptic.selectionAsync();
              setActiveTab("past");
            }
          }}
        >
          <Text
            className={`text-sm font-semibold ${
              activeTab === "past" ? "text-black" : "text-white/70"
            }`}
          >
            Past Events
          </Text>
        </Pressable>
      </View>

      {/* Content */}
      <View className="mt-2 gap-6">
        {(activeTab === "upcoming" ? dummyEvents : dummyPastEvents).map(
          (event: any) => (
            <View
              key={event.id}
              className="bg-zinc-900/60 rounded-2xl p-5 relative"
            >
              {/* Corner icon */}
              <View className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/10 items-center justify-center">
                <HugeiconsIcon
                  icon={iconMap[event.icon] ?? Calendar01Icon}
                  color="white"
                  size={20}
                />
              </View>
              {/* Event header row */}
              <View className="flex-row items-start justify-between">
                <View className="flex-1 pl-14">
                  <Text className="text-lg font-semibold text-white">
                    {event.title}
                  </Text>
                  <View className="mt-1 gap-1">
                    <View className="flex-row items-center gap-2">
                      <Text className="text-sm text-white/70">
                        {event.time}
                      </Text>
                    </View>
                    <View className="flex-row items-center gap-2">
                      <Text className="text-sm text-white/70">
                        {event.location}
                      </Text>
                    </View>
                  </View>
                </View>
                <Text className="text-xl text-white/40">›</Text>
              </View>

              {/* Detail card: upcoming shows AI Suggestion; past shows What you wore */}
              {activeTab === "upcoming" ? (
                <View className="mt-4 bg-zinc-900 rounded-xl p-4 ">
                  <View className="flex-row items-center justify-between mb-3">
                    <Text className="text-sm font-semibold text-white/70">
                      AI Suggestion
                    </Text>
                    <Text className="text-sm font-semibold text-white/70">
                      {event.aiSuggestion.match}% match
                    </Text>
                  </View>
                  <View className="flex-row gap-4 items-center">
                    <Image
                      // Supports local require(...) or remote URI
                      source={
                        typeof event.aiSuggestion.image === "string"
                          ? { uri: event.aiSuggestion.image }
                          : event.aiSuggestion.image
                      }
                      className="w-20 h-20 rounded-xl bg-white/10"
                    />
                    <View className="flex-1">
                      <Text className="text-base font-semibold text-white">
                        {event.aiSuggestion.label}
                      </Text>
                      <Text className="text-sm text-white/70" numberOfLines={2}>
                        {event.aiSuggestion.description}
                      </Text>
                      <View className="mt-2 flex-row items-center gap-2">
                        <Text className="text-sm text-white/70">
                          {event.aiSuggestion.weather.temperature},{" "}
                          {event.aiSuggestion.weather.condition}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              ) : (
                <View className="mt-4 bg-zinc-900 rounded-xl p-4 ">
                  <Text className="text-sm font-semibold text-white/70 mb-3">
                    What you wore:
                  </Text>
                  <View className="flex-row gap-3 items-center">
                    <Image
                      source={
                        typeof event.wore.image === "string"
                          ? { uri: event.wore.image }
                          : event.wore.image
                      }
                      className="w-20 h-20 rounded-xl bg-white/10"
                    />
                    <View className="flex-1">
                      <Text className="text-base font-semibold text-white">
                        {event.wore.label}
                      </Text>
                      <View className="flex-row items-center gap-2 mt-1">
                        <Text className="text-sm text-red-400">
                          {"❤".repeat(event.wore.hearts)}
                        </Text>
                        <Text className="text-sm text-white/70">
                          {event.wore.rating}/5
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            </View>
          )
        )}
      </View>
    </ScrollView>
  );
}
