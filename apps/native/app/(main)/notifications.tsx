import { Card } from "@/components/ui/card";
import { useColorScheme } from "@/lib/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";
import {
  Notification01FreeIcons,
  Mail01Icon,
  Message01Icon,
  Settings01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Switch, Text, View } from "react-native";
import { useState } from "react";

export default function Notifications() {
  const { isDarkColorScheme } = useColorScheme();
  const router = useRouter();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [outfitReminders, setOutfitReminders] = useState(true);
  const [eventReminders, setEventReminders] = useState(true);
  const [styleTips, setStyleTips] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(false);

  return (
    <ScrollView
      className="flex-1 p-4"
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={true}
      bounces={true}
    >
      {/* Push Notifications */}
      <Card className="rounded-2xl p-5 mb-6 bg-zinc-900/60 border-transparent">
        <Text className="text-lg font-semibold text-white mb-4">
          Push Notifications
        </Text>

        <View className="gap-4">
          <View className="flex-row items-center justify-between rounded-xl bg-white/5 px-4 py-3">
            <View className="flex-row items-center gap-3 flex-1">
              <View className="h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <HugeiconsIcon
                  icon={Notification01FreeIcons}
                  size={20}
                  color={isDarkColorScheme ? "#FFFFFF" : "#0A0A0A"}
                />
              </View>
              <View className="flex-1">
                <Text className="text-white font-medium">
                  Push Notifications
                </Text>
                <Text className="text-white/70 text-sm">
                  Receive notifications on your device
                </Text>
              </View>
            </View>
            <Switch
              value={pushNotifications}
              onValueChange={setPushNotifications}
              trackColor={{ false: "#374151", true: "#10b981" }}
              thumbColor={pushNotifications ? "#ffffff" : "#9ca3af"}
            />
          </View>

          <View className="flex-row items-center justify-between rounded-xl bg-white/5 px-4 py-3">
            <View className="flex-row items-center gap-3 flex-1">
              <View className="h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <HugeiconsIcon
                  icon={Message01Icon}
                  size={20}
                  color={isDarkColorScheme ? "#FFFFFF" : "#0A0A0A"}
                />
              </View>
              <View className="flex-1">
                <Text className="text-white font-medium">Outfit Reminders</Text>
                <Text className="text-white/70 text-sm">
                  Get reminded about outfit planning
                </Text>
              </View>
            </View>
            <Switch
              value={outfitReminders}
              onValueChange={setOutfitReminders}
              trackColor={{ false: "#374151", true: "#10b981" }}
              thumbColor={outfitReminders ? "#ffffff" : "#9ca3af"}
            />
          </View>

          <View className="flex-row items-center justify-between rounded-xl bg-white/5 px-4 py-3">
            <View className="flex-row items-center gap-3 flex-1">
              <View className="h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color={isDarkColorScheme ? "#FFFFFF" : "#0A0A0A"}
                />
              </View>
              <View className="flex-1">
                <Text className="text-white font-medium">Event Reminders</Text>
                <Text className="text-white/70 text-sm">
                  Notifications for upcoming events
                </Text>
              </View>
            </View>
            <Switch
              value={eventReminders}
              onValueChange={setEventReminders}
              trackColor={{ false: "#374151", true: "#10b981" }}
              thumbColor={eventReminders ? "#ffffff" : "#9ca3af"}
            />
          </View>
        </View>
      </Card>

      {/* Email Notifications */}
      <Card className="rounded-2xl p-5 mb-6 bg-zinc-900/60 border-transparent">
        <Text className="text-lg font-semibold text-white mb-4">
          Email Notifications
        </Text>

        <View className="gap-4">
          <View className="flex-row items-center justify-between rounded-xl bg-white/5 px-4 py-3">
            <View className="flex-row items-center gap-3 flex-1">
              <View className="h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <HugeiconsIcon
                  icon={Mail01Icon}
                  size={20}
                  color={isDarkColorScheme ? "#FFFFFF" : "#0A0A0A"}
                />
              </View>
              <View className="flex-1">
                <Text className="text-white font-medium">
                  Email Notifications
                </Text>
                <Text className="text-white/70 text-sm">
                  Receive updates via email
                </Text>
              </View>
            </View>
            <Switch
              value={emailNotifications}
              onValueChange={setEmailNotifications}
              trackColor={{ false: "#374151", true: "#10b981" }}
              thumbColor={emailNotifications ? "#ffffff" : "#9ca3af"}
            />
          </View>

          <View className="flex-row items-center justify-between rounded-xl bg-white/5 px-4 py-3">
            <View className="flex-row items-center gap-3 flex-1">
              <View className="h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <Ionicons
                  name="bulb-outline"
                  size={20}
                  color={isDarkColorScheme ? "#FFFFFF" : "#0A0A0A"}
                />
              </View>
              <View className="flex-1">
                <Text className="text-white font-medium">Style Tips</Text>
                <Text className="text-white/70 text-sm">
                  Weekly style tips and trends
                </Text>
              </View>
            </View>
            <Switch
              value={styleTips}
              onValueChange={setStyleTips}
              trackColor={{ false: "#374151", true: "#10b981" }}
              thumbColor={styleTips ? "#ffffff" : "#9ca3af"}
            />
          </View>

          <View className="flex-row items-center justify-between rounded-xl bg-white/5 px-4 py-3">
            <View className="flex-row items-center gap-3 flex-1">
              <View className="h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <Ionicons
                  name="megaphone-outline"
                  size={20}
                  color={isDarkColorScheme ? "#FFFFFF" : "#0A0A0A"}
                />
              </View>
              <View className="flex-1">
                <Text className="text-white font-medium">Marketing Emails</Text>
                <Text className="text-white/70 text-sm">
                  Promotional content and updates
                </Text>
              </View>
            </View>
            <Switch
              value={marketingEmails}
              onValueChange={setMarketingEmails}
              trackColor={{ false: "#374151", true: "#10b981" }}
              thumbColor={marketingEmails ? "#ffffff" : "#9ca3af"}
            />
          </View>
        </View>
      </Card>

      {/* Notification Settings */}
      <Card className="rounded-2xl p-5 mb-6 bg-zinc-900/60 border-transparent">
        <Text className="text-lg font-semibold text-white mb-4">
          Notification Settings
        </Text>

        <View className="gap-4">
          <Pressable className="flex-row items-center gap-3 rounded-xl bg-white/5 px-4 py-3">
            <View className="h-10 w-10 items-center justify-center rounded-full bg-white/10">
              <HugeiconsIcon
                icon={Settings01Icon}
                size={20}
                color={isDarkColorScheme ? "#FFFFFF" : "#0A0A0A"}
              />
            </View>
            <View className="flex-1">
              <Text className="text-white font-medium">Quiet Hours</Text>
              <Text className="text-white/70 text-sm">
                Set when to receive notifications
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
                name="volume-high-outline"
                size={20}
                color={isDarkColorScheme ? "#FFFFFF" : "#0A0A0A"}
              />
            </View>
            <View className="flex-1">
              <Text className="text-white font-medium">Sound & Vibration</Text>
              <Text className="text-white/70 text-sm">
                Customize notification sounds
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
