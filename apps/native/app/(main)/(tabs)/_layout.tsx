import { AnimatedTabIcon, CircularCameraButton } from "@/components/tab-bar";
import { useColorScheme } from "@/lib/use-color-scheme";
import {
  ClothesIcon,
  FavouriteIcon,
  Home05Icon,
  User02Icon,
} from "@hugeicons/core-free-icons";
import { Tabs, useRouter } from "expo-router";

export default function TabLayout() {
  const { isDarkColorScheme } = useColorScheme();
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,

        tabBarActiveTintColor: isDarkColorScheme ? "#DBFE01" : "#DBFE01",
        tabBarInactiveTintColor: isDarkColorScheme ? "gray" : "gray",

        tabBarStyle: {
          shadowColor: "transparent",
          shadowOpacity: 0,
          shadowOffset: { width: 0, height: 0 },
          shadowRadius: 0,
          borderTopWidth: 0,
          backgroundColor: "transparent",
          borderTopColor: "hsl(0 0% 10%)",
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
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon
              icon={FavouriteIcon}
              color={color}
              focused={focused}
              label="Favorites"
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
