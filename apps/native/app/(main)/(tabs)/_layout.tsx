import { useColorScheme } from "@/lib/use-color-scheme";
import {
  Camera01Icon,
  ClothesIcon,
  FavouriteIcon,
  Home05Icon,
  User02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Tabs } from "expo-router";
import { Text, View, Animated } from "react-native";
import { useEffect, useRef } from "react";

interface AnimatedTabIconProps {
  icon: any;
  color: string;
  focused: boolean;
  label: string;
}

function AnimatedTabIcon({
  icon,
  color,
  focused,
  label,
}: AnimatedTabIconProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    if (focused) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [focused, fadeAnim, scaleAnim]);

  return (
    <View style={{ alignItems: "center", width: 60 }}>
      <HugeiconsIcon icon={icon} color={color} />
      {focused && (
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }}
        >
          <Text
            style={{
              color,
              fontSize: 10,
              marginTop: 2,
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            {label}
          </Text>
        </Animated.View>
      )}
    </View>
  );
}

export default function TabLayout() {
  const { isDarkColorScheme } = useColorScheme();

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
        name="scan"
        options={{
          title: "Scan",
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon
              icon={Camera01Icon}
              color={color}
              focused={focused}
              label="Scan"
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
      {/* <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <TabBarIcon size={18} name="cog" color={color} />
          ),
        }}
      /> */}
    </Tabs>
  );
}
