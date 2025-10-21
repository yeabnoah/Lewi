import { Card } from "@/components/ui/card";
import { useColorScheme } from "@/lib/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";
import {
  ArrowLeftIcon,
  BashIcon,
  EyeIcon,
  FlowIcon,
  LockIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PrivacySecurity() {
  const { isDarkColorScheme } = useColorScheme();
  const router = useRouter();
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [locationTracking, setLocationTracking] = useState(false);

  return (
    <SafeAreaView className="flex-1">
      {/* Header */}
      <View className="px-4 pt-[4%] pb-4">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex-row items-center"
          >
            <HugeiconsIcon icon={ArrowLeftIcon} color="#DBFE01" size={24} />
            <Text className="text-white text-lg font-semibold ml-2">
              Privacy & Security
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView
        className="flex-1 p-4"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={true}
        bounces={true}
      >
        {/* Privacy Settings */}
        <Card className="rounded-2xl p-5 mb-6 bg-zinc-900/60 border-transparent">
          <Text className="text-lg font-semibold text-white mb-4">
            Privacy Settings
          </Text>

          <View className="gap-4">
            <View className="flex-row items-center justify-between rounded-xl bg-white/5 px-4 py-3">
              <View className="flex-row items-center gap-3 flex-1">
                <View className="h-10 w-10 items-center justify-center rounded-full bg-white/10">
                  <HugeiconsIcon
                    icon={EyeIcon}
                    size={20}
                    color={isDarkColorScheme ? "#FFFFFF" : "#0A0A0A"}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-white font-medium">
                    Profile Visibility
                  </Text>
                  <Text className="text-white/70 text-sm">
                    Make your profile visible to others
                  </Text>
                </View>
              </View>
              <Switch
                value={profileVisibility}
                onValueChange={setProfileVisibility}
                trackColor={{ false: "#374151", true: "#10b981" }}
                thumbColor={profileVisibility ? "#ffffff" : "#9ca3af"}
              />
            </View>

            <View className="flex-row items-center justify-between rounded-xl bg-white/5 px-4 py-3">
              <View className="flex-row items-center gap-3 flex-1">
                <View className="h-10 w-10 items-center justify-center rounded-full bg-white/10">
                  <HugeiconsIcon
                    icon={FlowIcon}
                    size={20}
                    color={isDarkColorScheme ? "#FFFFFF" : "#0A0A0A"}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-white font-medium">Data Sharing</Text>
                  <Text className="text-white/70 text-sm">
                    Share data for improved experience
                  </Text>
                </View>
              </View>
              <Switch
                value={dataSharing}
                onValueChange={setDataSharing}
                trackColor={{ false: "#374151", true: "#10b981" }}
                thumbColor={dataSharing ? "#ffffff" : "#9ca3af"}
              />
            </View>

            <View className="flex-row items-center justify-between rounded-xl bg-white/5 px-4 py-3">
              <View className="flex-row items-center gap-3 flex-1">
                <View className="h-10 w-10 items-center justify-center rounded-full bg-white/10">
                  <Ionicons
                    name="analytics-outline"
                    size={20}
                    color={isDarkColorScheme ? "#FFFFFF" : "#0A0A0A"}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-white font-medium">Analytics</Text>
                  <Text className="text-white/70 text-sm">
                    Help improve the app with usage data
                  </Text>
                </View>
              </View>
              <Switch
                value={analytics}
                onValueChange={setAnalytics}
                trackColor={{ false: "#374151", true: "#10b981" }}
                thumbColor={analytics ? "#ffffff" : "#9ca3af"}
              />
            </View>

            <View className="flex-row items-center justify-between rounded-xl bg-white/5 px-4 py-3">
              <View className="flex-row items-center gap-3 flex-1">
                <View className="h-10 w-10 items-center justify-center rounded-full bg-white/10">
                  <Ionicons
                    name="location-outline"
                    size={20}
                    color={isDarkColorScheme ? "#FFFFFF" : "#0A0A0A"}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-white font-medium">
                    Location Tracking
                  </Text>
                  <Text className="text-white/70 text-sm">
                    Allow location-based features
                  </Text>
                </View>
              </View>
              <Switch
                value={locationTracking}
                onValueChange={setLocationTracking}
                trackColor={{ false: "#374151", true: "#10b981" }}
                thumbColor={locationTracking ? "#ffffff" : "#9ca3af"}
              />
            </View>
          </View>
        </Card>

        {/* Security Settings */}
        <Card className="rounded-2xl p-5 mb-6 bg-zinc-900/60 border-transparent">
          <Text className="text-lg font-semibold text-white mb-4">
            Security
          </Text>

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

            <Pressable className="flex-row items-center gap-3 rounded-xl bg-white/5 px-4 py-3">
              <View className="h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <Ionicons
                  name="key-outline"
                  size={20}
                  color={isDarkColorScheme ? "#FFFFFF" : "#0A0A0A"}
                />
              </View>
              <View className="flex-1">
                <Text className="text-white font-medium">Login Sessions</Text>
                <Text className="text-white/70 text-sm">
                  Manage active login sessions
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

        {/* Data Management */}
        <Card className="rounded-2xl p-5 mb-6 bg-zinc-900/60 border-transparent">
          <Text className="text-lg font-semibold text-white mb-4">
            Data Management
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
                <Text className="text-white font-medium">Download My Data</Text>
                <Text className="text-white/70 text-sm">
                  Export all your personal data
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
                <HugeiconsIcon icon={BashIcon} size={20} color="#ef4444" />
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

        {/* Privacy Policy */}
        <Card className="rounded-2xl p-5 mb-6 bg-zinc-900/60 border-transparent">
          <Text className="text-lg font-semibold text-white mb-4">Legal</Text>

          <View className="gap-4">
            <Pressable className="flex-row items-center gap-3 rounded-xl bg-white/5 px-4 py-3">
              <View className="h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <Ionicons
                  name="document-text-outline"
                  size={20}
                  color={isDarkColorScheme ? "#FFFFFF" : "#0A0A0A"}
                />
              </View>
              <View className="flex-1">
                <Text className="text-white font-medium">Privacy Policy</Text>
                <Text className="text-white/70 text-sm">
                  Read our privacy policy
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
                  name="document-outline"
                  size={20}
                  color={isDarkColorScheme ? "#FFFFFF" : "#0A0A0A"}
                />
              </View>
              <View className="flex-1">
                <Text className="text-white font-medium">Terms of Service</Text>
                <Text className="text-white/70 text-sm">
                  Read our terms of service
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
    </SafeAreaView>
  );
}
