import ImageProcessor from "@/components/image-processer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { useColorScheme } from "@/lib/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";


import {
  AiGenerativeIcon,
  ArrowRight01Icon,
  Chart01Icon,
  Edit01Icon,
  FunctionCircleIcon,
  LogoutIcon,
  Notification01Icon,
  Shield01Icon,
  User02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Image, Modal, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const { isDarkColorScheme } = useColorScheme();
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { data: session } = authClient.useSession();

  const dicebearPlaceholder = useMemo(() => {
    const seed =
      session?.user?.id || session?.user?.email || session?.user?.name || "guest";
    // Use a PNG endpoint to avoid SVG support issues in React Native
    // Using 'avataaars' style for a modern, professional look
    return `https://api.dicebear.com/8.x/avataaars/png?seed=${encodeURIComponent(
      seed
    )}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf&radius=50`;
  }, [session?.user?.id, session?.user?.email, session?.user?.name]);

  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  useEffect(() => {
    const initial = session?.user?.image ?? dicebearPlaceholder;
    setAvatarUri(initial);
  }, [session?.user?.image, dicebearPlaceholder]);

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
    <SafeAreaView className="flex-1 mx-[2vw]">
      {/* <View className="px-4 py-3 pt-[3%] backdrop-blur-sm">
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl font-bold text-white">Profile</Text>
        </View>
      </View>

      <ScrollView
        className="flex-1 px-4 mt-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={true}
        bounces={true}
      >
      
        <View className="bg-zinc-900/60 rounded-2xl p-5 mb-6">
          <View className="flex-row gap-4">
            <View className="relative h-20 w-20">
              <Image
                source={
                  avatarUri
                    ? { uri: avatarUri }
                    : require("@/assets/images/outfit.jpg")
                }
                className="h-20 w-20 rounded-full"
                resizeMode="cover"
                onError={() => {
                  if (avatarUri !== dicebearPlaceholder) {
                    setAvatarUri(dicebearPlaceholder);
                  }
                }}
              />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-semibold text-white">
                {session?.user?.name}
              </Text>
              <Text className="mt-1 text-white/70">
                {session?.user?.email}
              </Text>
              <Text className="mt-1 text-white/70 text-sm">
                Joined since {new Date(session?.user?.createdAt as Date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </Text>
            </View>
            <Pressable
              className="h-8 w-8 items-center justify-center rounded-full bg-white/10"
              onPress={() => {
                router.push("/(main)/edit-profile");
              }}
            >
              <HugeiconsIcon
                icon={Edit01Icon}
                size={16}
                color={isDarkColorScheme ? "#FFFFFF" : "#0A0A0A"}
              />
            </Pressable>
          </View>
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
            <Text className="flex-1 text-white font-medium">
              Help & Support
            </Text>
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
                  Are you sure you want to logout? You'll need to sign in again
                  to access your account.
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
      </ScrollView> */}


    <ImageProcessor />
    </SafeAreaView>
  );
}
