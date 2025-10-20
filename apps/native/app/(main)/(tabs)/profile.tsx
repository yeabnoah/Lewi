import { Button } from "@/components/ui/button";
import { useColorScheme } from "@/lib/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";
import {
  AiGenerativeIcon,
  ArrowRight01Icon,
  Chart01Icon,
  FunctionCircleIcon,
  LogoutIcon,
  Notification01Icon,
  Shield01Icon,
  User02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function Profile() {
  const { isDarkColorScheme } = useColorScheme();
  const router = useRouter();

  return (
    <ScrollView
      className="flex-1 px-4 pt-[12%]"
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={true}
      bounces={true}
    >
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-2xl font-bold text-white">Profile</Text>
        <Pressable
          accessibilityLabel="Open settings"
          className="bg-white/5 rounded-full p-3 w-12 h-12 items-center justify-center"
        >
          <Ionicons
            name="settings-outline"
            size={22}
            color={isDarkColorScheme ? "#FFFFFF" : "#0A0A0A"}
          />
        </Pressable>
      </View>

      <View className="bg-zinc-900/60 rounded-2xl p-5 mb-6">
        {/* Card header */}

        {/* Avatar + details */}
        <View className="flex-row items-center gap-4">
          <View className="relative h-20 w-20 items-center justify-center rounded-full bg-white/10">
            <Text className="text-xl font-semibold">SJ</Text>
            <View className="absolute -bottom-1 -right-1 h-8 w-8 items-center justify-center rounded-full bg-white/10">
              <HugeiconsIcon
                icon={AiGenerativeIcon}
                size={16}
                color={isDarkColorScheme ? "#FFFFFF" : "#0A0A0A"}
              />
            </View>
          </View>
          <View className="flex-1">
            <Text className="text-lg font-semibold text-white">
              Sarah Johnson
            </Text>
            <Text className="mt-1 text-white/70">sarah.johnson@email.com</Text>
            <Text className="mt-1 text-white/70 text-sm">
              Joined September 2024
            </Text>
          </View>
        </View>
        <Button
          variant="default"
          className="mt-5 self-start flex-row items-center gap-2 rounded-full px-6 py-3 bg-lewi active:bg-lewi/90 shadow-lg shadow-black/20"
        >
          <Ionicons name="pencil" size={16} color="#0A0A0A" />
          <Text className="text-black font-semibold">Edit Profile</Text>
        </Button>
      </View>

      {/* Settings Section */}

      <Text className="mt-4 text-white/90 text-lg font-semibold mb-3">
        Settings
      </Text>
      <View className="gap-3">
        <Pressable
          className="flex-row items-center gap-3 rounded-2xl bg-zinc-900/60 px-4 py-4"
          onPress={() => router.push("/(main)/profile-stats")}
        >
          <View className="h-10 w-10 items-center justify-center rounded-full bg-white/10">
            <HugeiconsIcon
              icon={Chart01Icon}
              size={20}
              color={isDarkColorScheme ? "#FFFFFF" : "#0A0A0A"}
            />
          </View>
          <Text className="flex-1 text-white font-medium">View Stats</Text>
          <Ionicons
            name="chevron-forward"
            size={18}
            color={isDarkColorScheme ? "#A3A3A3" : "#737373"}
          />
        </Pressable>
        <Pressable className="flex-row items-center gap-3 rounded-2xl bg-zinc-900/60 px-4 py-4">
          <View className="h-10 w-10 items-center justify-center rounded-full bg-white/10">
            <HugeiconsIcon
              icon={User02Icon}
              size={20}
              color={isDarkColorScheme ? "#FFFFFF" : "#0A0A0A"}
            />
          </View>
          <Text className="flex-1 text-white font-medium">
            Account Settings
          </Text>
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            size={18}
            color={isDarkColorScheme ? "#A3A3A3" : "#737373"}
          />
        </Pressable>

        <Pressable className="flex-row items-center gap-3 rounded-2xl bg-zinc-900/60 px-4 py-4">
          <View className="h-10 w-10 items-center justify-center rounded-full bg-white/10">
            <HugeiconsIcon
              icon={Notification01Icon}
              size={20}
              color={isDarkColorScheme ? "#FFFFFF" : "#0A0A0A"}
            />
          </View>
          <Text className="flex-1 text-white font-medium">Notifications</Text>
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            name="chevron-forward"
            size={18}
            color={isDarkColorScheme ? "#A3A3A3" : "#737373"}
          />
        </Pressable>

        <Pressable className="flex-row items-center gap-3 rounded-2xl bg-zinc-900/60 px-4 py-4">
          <View className="h-10 w-10 items-center justify-center rounded-full bg-white/10">
            <HugeiconsIcon
              icon={Shield01Icon}
              size={20}
              color={isDarkColorScheme ? "#FFFFFF" : "#0A0A0A"}
            />
          </View>
          <Text className="flex-1 text-white font-medium">
            Privacy & Security
          </Text>
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            size={18}
            color={isDarkColorScheme ? "#A3A3A3" : "#737373"}
          />
        </Pressable>

        <Pressable className="flex-row items-center gap-3 rounded-2xl bg-zinc-900/60 px-4 py-4">
          <View className="h-10 w-10 items-center justify-center rounded-full bg-white/10">
            <HugeiconsIcon
              icon={FunctionCircleIcon}
              size={20}
              color={isDarkColorScheme ? "#FFFFFF" : "#0A0A0A"}
            />
          </View>
          <Text className="flex-1 text-white font-medium">Help & Support</Text>
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            size={18}
            color={isDarkColorScheme ? "#A3A3A3" : "#737373"}
          />
        </Pressable>

        <Pressable className="flex-row items-center gap-3 rounded-2xl bg-zinc-900/60 px-4 py-4">
          <View className="h-10 w-10 items-center justify-center rounded-full bg-white/10">
            <HugeiconsIcon icon={LogoutIcon} size={20} color="#ef4444" />
          </View>
          <Text className="flex-1 font-medium" style={{ color: "#ef4444" }}>
            Logout
          </Text>
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            name="chevron-forward"
            size={18}
            color={isDarkColorScheme ? "#A3A3A3" : "#737373"}
          />
        </Pressable>
      </View>
    </ScrollView>
  );
}
