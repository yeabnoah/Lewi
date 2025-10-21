import { Card } from "@/components/ui/card";
import { useColorScheme } from "@/lib/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";
import {
  LockIcon,
  Mail01Icon,
  PhoneLockFreeIcons,
  User02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function AccountSettings() {
  const { isDarkColorScheme } = useColorScheme();
  const router = useRouter();

  return (
    <ScrollView
      className="flex-1 p-4"
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={true}
      bounces={true}
    >
      {/* Profile Information */}
      <Card className="rounded-2xl p-5 mb-6 bg-zinc-900/60 border-transparent">
        <Text className="text-lg font-semibold text-white mb-4">
          Profile Information
        </Text>

        <View className="gap-4">
          <Pressable className="flex-row items-center gap-3 rounded-xl bg-white/5 px-4 py-3">
            <View className="h-10 w-10 items-center justify-center rounded-full bg-white/10">
              <HugeiconsIcon
                icon={User02Icon}
                size={20}
                color={isDarkColorScheme ? "#FFFFFF" : "#0A0A0A"}
              />
            </View>
            <View className="flex-1">
              <Text className="text-white font-medium">Full Name</Text>
              <Text className="text-white/70 text-sm">Sarah Johnson</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={isDarkColorScheme ? "#A3A3A3" : "#737373"}
            />
          </Pressable>

          <Pressable className="flex-row items-center gap-3 rounded-xl bg-white/5 px-4 py-3">
            <View className="h-10 w-10 items-center justify-center rounded-full bg-white/10">
              <HugeiconsIcon
                icon={Mail01Icon}
                size={20}
                color={isDarkColorScheme ? "#FFFFFF" : "#0A0A0A"}
              />
            </View>
            <View className="flex-1">
              <Text className="text-white font-medium">Email Address</Text>
              <Text className="text-white/70 text-sm">
                sarah.johnson@email.com
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={isDarkColorScheme ? "#A3A3A3" : "#737373"}
            />
          </Pressable>

          <Pressable className="flex-row items-center gap-3 rounded-xl bg-white/5 px-4 py-3">
            <View className="h-10 w-10 items-center justify-center rounded-full bg-white/10">
              <HugeiconsIcon
                icon={PhoneLockFreeIcons}
                size={20}
                color={isDarkColorScheme ? "#FFFFFF" : "#0A0A0A"}
              />
            </View>
            <View className="flex-1">
              <Text className="text-white font-medium">Phone Number</Text>
              <Text className="text-white/70 text-sm">+1 (555) 123-4567</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={isDarkColorScheme ? "#A3A3A3" : "#737373"}
            />
          </Pressable>
        </View>
      </Card>

      {/* Security Settings */}
      <Card className="rounded-2xl p-5 mb-6 bg-zinc-900/60 border-transparent">
        <Text className="text-lg font-semibold text-white mb-4">Security</Text>

        <View className="gap-4">
          <Pressable className="flex-row items-center gap-3 rounded-xl bg-white/5 px-4 py-3">
            <View className="h-10 w-10 items-center justify-center rounded-full bg-white/10">
              <HugeiconsIcon
                icon={LockIcon}
                size={20}
                color={isDarkColorScheme ? "#FFFFFF" : "#0A0A0A"}
              />
            </View>
            <View className="flex-1">
              <Text className="text-white font-medium">Change Password</Text>
              <Text className="text-white/70 text-sm">
                Update your account password
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={isDarkColorScheme ? "#A3A3A3" : "#737373"}
            />
          </Pressable>

          <Pressable className="flex-row items-center gap-3 rounded-xl bg-white/5 px-4 py-3">
            <View className="h-10 w-10 items-center justify-center rounded-full bg-white/10">
              <Ionicons
                name="shield-checkmark-outline"
                size={20}
                color={isDarkColorScheme ? "#FFFFFF" : "#0A0A0A"}
              />
            </View>
            <View className="flex-1">
              <Text className="text-white font-medium">
                Two-Factor Authentication
              </Text>
              <Text className="text-white/70 text-sm">
                Add an extra layer of security
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={isDarkColorScheme ? "#A3A3A3" : "#737373"}
            />
          </Pressable>
        </View>
      </Card>

      {/* Account Actions */}
      <Card className="rounded-2xl p-5 mb-6 bg-zinc-900/60 border-transparent">
        <Text className="text-lg font-semibold text-white mb-4">
          Account Actions
        </Text>

        <View className="gap-4">
          <Pressable className="flex-row items-center gap-3 rounded-xl bg-white/5 px-4 py-3">
            <View className="h-10 w-10 items-center justify-center rounded-full bg-white/10">
              <Ionicons
                name="download-outline"
                size={20}
                color={isDarkColorScheme ? "#FFFFFF" : "#0A0A0A"}
              />
            </View>
            <View className="flex-1">
              <Text className="text-white font-medium">Download Data</Text>
              <Text className="text-white/70 text-sm">
                Export your account data
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={isDarkColorScheme ? "#A3A3A3" : "#737373"}
            />
          </Pressable>

          <Pressable className="flex-row items-center gap-3 rounded-xl bg-white/5 px-4 py-3">
            <View className="h-10 w-10 items-center justify-center rounded-full bg-white/10">
              <Ionicons name="trash-outline" size={20} color="#ef4444" />
            </View>
            <View className="flex-1">
              <Text className="text-white font-medium">Delete Account</Text>
              <Text className="text-white/70 text-sm">
                Permanently delete your account
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={isDarkColorScheme ? "#A3A3A3" : "#737373"}
            />
          </Pressable>
        </View>
      </Card>
    </ScrollView>
  );
}
