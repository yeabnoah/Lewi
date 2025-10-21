import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
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
import { useState } from "react";
import { Image, Modal, Pressable, ScrollView, Text, View } from "react-native";

export default function Profile() {
  const { isDarkColorScheme } = useColorScheme();
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = async () => {
    setShowLogoutModal(false);

    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/(auth)/login");
          },
        },
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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
          <View className="relative h-20 w-20">
            <Image
              source={require("@/assets/images/outfit.jpg")}
              className="h-20 w-20 rounded-full"
              resizeMode="cover"
            />
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

      <View className="-mx-1 flex-row flex-wrap">
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
          </Card>
        </View>
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
        <Pressable
          className="flex-row items-center gap-3 rounded-2xl bg-zinc-900/60 px-4 py-4"
          onPress={() => router.push("/(main)/account-settings")}
        >
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

        <Pressable
          className="flex-row items-center gap-3 rounded-2xl bg-zinc-900/60 px-4 py-4"
          onPress={() => router.push("/(main)/notifications")}
        >
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

        <Pressable
          className="flex-row items-center gap-3 rounded-2xl bg-zinc-900/60 px-4 py-4"
          onPress={() => router.push("/(main)/privacy-security")}
        >
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

        <Pressable
          className="flex-row items-center gap-3 rounded-2xl bg-zinc-900/60 px-4 py-4"
          onPress={() => router.push("/(main)/help-support")}
        >
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

        <Pressable
          className="flex-row items-center gap-3 rounded-2xl bg-zinc-900/60 px-4 py-4"
          onPress={() => setShowLogoutModal(true)}
        >
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

      {/* Logout Confirmation Modal */}
      <Modal
        visible={showLogoutModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View className="flex-1 bg-black/50 items-center justify-center px-6">
          <View className="bg-zinc-900 rounded-2xl p-6 w-full max-w-sm">
            <View className="items-center mb-6">
              <View className="h-16 w-16 items-center justify-center rounded-full bg-red-500/20 mb-4">
                <HugeiconsIcon icon={LogoutIcon} size={32} color="#ef4444" />
              </View>
              <Text className="text-xl font-bold text-white text-center mb-2">
                Logout
              </Text>
              <Text className="text-white/70 text-center text-base">
                Are you sure you want to logout? You'll need to sign in again to
                access your account.
              </Text>
            </View>

            <View className="flex-row gap-3">
              <Button
                variant="outline"
                className="flex-1 rounded-xl border-zinc-700"
                onPress={() => setShowLogoutModal(false)}
              >
                <Text className="text-white font-medium">Cancel</Text>
              </Button>
              <Button
                className="flex-1 rounded-xl bg-red-500 active:bg-red-600"
                onPress={handleLogout}
              >
                <Text className="text-white font-medium">Logout</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
