import { Card } from "@/components/ui/card";
import { useColorScheme } from "@/lib/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";
import {
  ArrowLeftIcon,
  Message01Icon,
  PhoneLockFreeIcons,
  Mail01Icon,
  Book01Icon,
  FunctionCircleIcon,
  Bug01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useRouter } from "expo-router";
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HelpSupport() {
  const { isDarkColorScheme } = useColorScheme();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 mx-[2vw]">
      {/* Header */}
      <View className="px-4 pt-[3%] pb-4">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex-row items-center"
          >
            <HugeiconsIcon icon={ArrowLeftIcon} color="#DBFE01" size={24} />
            <Text className="text-white text-lg font-semibold ml-2">
              Help & Support
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
        {/* Contact Support */}
        <Card className="rounded-2xl p-5 mb-6 bg-zinc-900/60 border-transparent">
          <Text className="text-lg font-semibold text-white mb-4">
            Contact Support
          </Text>

          <View className="gap-4">
            <Pressable className="flex-row items-center gap-3 rounded-xl bg-white/5 px-4 py-3">
              <View className="h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <HugeiconsIcon
                  icon={Message01Icon}
                  size={20}
                  color={isDarkColorScheme ? "#FFFFFF" : "#0A0A0A"}
                />
              </View>
              <View className="flex-1">
                <Text className="text-white font-medium">Live Chat</Text>
                <Text className="text-white/70 text-sm">
                  Chat with our support team
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
                  icon={Mail01Icon}
                  size={20}
                  color={isDarkColorScheme ? "#FFFFFF" : "#0A0A0A"}
                />
              </View>
              <View className="flex-1">
                <Text className="text-white font-medium">Email Support</Text>
                <Text className="text-white/70 text-sm">support@lewi.com</Text>
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
                <Text className="text-white font-medium">Phone Support</Text>
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

        {/* Help Center */}
        <Card className="rounded-2xl p-5 mb-6 bg-zinc-900/60 border-transparent">
          <Text className="text-lg font-semibold text-white mb-4">
            Help Center
          </Text>

          <View className="gap-4">
            <Pressable className="flex-row items-center gap-3 rounded-xl bg-white/5 px-4 py-3">
              <View className="h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <HugeiconsIcon
                  icon={Book01Icon}
                  size={20}
                  color={isDarkColorScheme ? "#FFFFFF" : "#0A0A0A"}
                />
              </View>
              <View className="flex-1">
                <Text className="text-white font-medium">User Guide</Text>
                <Text className="text-white/70 text-sm">
                  Learn how to use Lewi
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
                  icon={FunctionCircleIcon}
                  size={20}
                  color={isDarkColorScheme ? "#FFFFFF" : "#0A0A0A"}
                />
              </View>
              <View className="flex-1">
                <Text className="text-white font-medium">FAQ</Text>
                <Text className="text-white/70 text-sm">
                  Frequently asked questions
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
                  name="play-circle-outline"
                  size={20}
                  color={isDarkColorScheme ? "#FFFFFF" : "#0A0A0A"}
                />
              </View>
              <View className="flex-1">
                <Text className="text-white font-medium">Video Tutorials</Text>
                <Text className="text-white/70 text-sm">
                  Watch step-by-step guides
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

        {/* Report Issues */}
        <Card className="rounded-2xl p-5 mb-6 bg-zinc-900/60 border-transparent">
          <Text className="text-lg font-semibold text-white mb-4">
            Report Issues
          </Text>

          <View className="gap-4">
            <Pressable className="flex-row items-center gap-3 rounded-xl bg-white/5 px-4 py-3">
              <View className="h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <HugeiconsIcon
                  icon={Bug01Icon}
                  size={20}
                  color={isDarkColorScheme ? "#FFFFFF" : "#0A0A0A"}
                />
              </View>
              <View className="flex-1">
                <Text className="text-white font-medium">Report a Bug</Text>
                <Text className="text-white/70 text-sm">
                  Help us improve the app
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
                  name="bulb-outline"
                  size={20}
                  color={isDarkColorScheme ? "#FFFFFF" : "#0A0A0A"}
                />
              </View>
              <View className="flex-1">
                <Text className="text-white font-medium">Feature Request</Text>
                <Text className="text-white/70 text-sm">
                  Suggest new features
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
                  name="star-outline"
                  size={20}
                  color={isDarkColorScheme ? "#FFFFFF" : "#0A0A0A"}
                />
              </View>
              <View className="flex-1">
                <Text className="text-white font-medium">Rate the App</Text>
                <Text className="text-white/70 text-sm">
                  Share your experience
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

        {/* Community */}
        <Card className="rounded-2xl p-5 mb-6 bg-zinc-900/60 border-transparent">
          <Text className="text-lg font-semibold text-white mb-4">
            Community
          </Text>

          <View className="gap-4">
            <Pressable className="flex-row items-center gap-3 rounded-xl bg-white/5 px-4 py-3">
              <View className="h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <Ionicons
                  name="people-outline"
                  size={20}
                  color={isDarkColorScheme ? "#FFFFFF" : "#0A0A0A"}
                />
              </View>
              <View className="flex-1">
                <Text className="text-white font-medium">User Community</Text>
                <Text className="text-white/70 text-sm">
                  Connect with other users
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
                  name="logo-twitter"
                  size={20}
                  color={isDarkColorScheme ? "#FFFFFF" : "#0A0A0A"}
                />
              </View>
              <View className="flex-1">
                <Text className="text-white font-medium">Follow Us</Text>
                <Text className="text-white/70 text-sm">
                  Stay updated on social media
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
