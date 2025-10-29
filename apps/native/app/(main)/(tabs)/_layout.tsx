import { AnimatedTabIcon, CircularCameraButton } from "@/components/tab-bar";
import { TabBarBackground } from "@/components/tab-bar/TabBarBackground";
import { useColorScheme } from "@/lib/use-color-scheme";
import {
  ClothesIcon,
  Calendar01Icon,
  Home05Icon,
  User02Icon,
} from "@hugeicons/core-free-icons";
import { Tabs, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const { isDarkColorScheme } = useColorScheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,

        tabBarActiveTintColor: isDarkColorScheme ? "#DBFE01" : "#DBFE01",
        tabBarInactiveTintColor: isDarkColorScheme ? "gray" : "gray",

        tabBarBackground: () => <TabBarBackground />,
        
        tabBarStyle: {
          position: "absolute",
          borderTopWidth: 0,
          backgroundColor: "transparent",
          paddingTop: 16,
          paddingBottom: Math.max(insets.bottom, 8),
          height: undefined,
          minHeight: 65,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarHideOnKeyboard: true,
        animation: "shift",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon
              icon={Home05Icon}
              color={color}
              focused={focused}
              label="Home"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="wardrobe"
        options={{
          title: "Wardrobe",
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon
              icon={ClothesIcon}
              color={color}
              focused={focused}
              label="Wardrobe"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: "Scan",
          tabBarIcon: ({ color, focused }) => (
            <CircularCameraButton
              color={color}
              focused={focused}
              onPress={() => {}}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="event"
        options={{
          title: "events",
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon
              icon={Calendar01Icon}
              color={color}
              focused={focused}
              label="Events"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon
              icon={User02Icon}
              color={color}
              focused={focused}
              label="Profile"
            />
          ),
        }}
      />
    </Tabs>
  );
}
