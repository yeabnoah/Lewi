import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { HugeiconsIcon } from "@hugeicons/react-native";
import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  EyeIcon,
  SunIcon,
  ThermometerIcon,
  WinkIcon,
} from "@hugeicons/core-free-icons";
import * as Haptic from "expo-haptics";

export default function WeatherCard() {
  const [isWeatherExpanded, setIsWeatherExpanded] = useState(false);

  return (
    <View className="mt-3 relative overflow-hidden rounded-xl">
      {/* Main Card */}
      <View className="bg-zinc-900/60 rounded-2xl">
        <Pressable
          onPress={() => {
            Haptic.selectionAsync();
            setIsWeatherExpanded(!isWeatherExpanded);
          }}
          className="px-5 py-4"
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-1">
              <View className="w-10 h-10 bg-white/40 rounded-full items-center justify-center mr-4">
                <HugeiconsIcon icon={SunIcon} color="white" size={20} />
              </View>
              <View className="flex-1">
                <Text className="text-white/60 text-sm font-medium mb-1">
                  Current Weather
                </Text>
                <Text className="text-white font-semibold">72°F Sunny</Text>
              </View>
            </View>

            <View className="flex-row items-center">
              <HugeiconsIcon
                icon={isWeatherExpanded ? ArrowUp01Icon : ArrowDown01Icon}
                color="#9CA3AF"
                size={20}
              />
            </View>
          </View>
        </Pressable>

        {/* Expanded Content */}
        {isWeatherExpanded && (
          <View className="px-6 pb-4">
            <View className="">
              <View className="flex-row items-center justify-between mb-3">
                <View className="flex-1">
                  <Text className="text-white/60 text-xs mb-1">
                    San Francisco, CA
                  </Text>
                  <View className="flex-row items-baseline">
                    <Text className="text-white text-2xl font-light">72</Text>
                    <Text className="text-white/60 text-sm ml-1">°F</Text>
                    <Text className="text-white/50 text-xs ml-2">
                      Feels like 75°F
                    </Text>
                  </View>
                </View>
                <View className="w-10 h-10 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full items-center justify-center">
                  <HugeiconsIcon icon={SunIcon} color="#FCD34D" size={20} />
                </View>
              </View>

              {/* Details Row */}
              <View className="flex-row justify-between mb-3">
                <View className="flex-row items-center">
                  <HugeiconsIcon icon={WinkIcon} color="#9CA3AF" size={14} />
                  <Text className="text-white/60 text-xs ml-1">Wind</Text>
                  <Text className="text-white text-xs ml-1 font-medium">
                    8 mph
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <HugeiconsIcon icon={EyeIcon} color="#9CA3AF" size={14} />
                  <Text className="text-white/60 text-xs ml-1">Visibility</Text>
                  <Text className="text-white text-xs ml-1 font-medium">
                    10 mi
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <HugeiconsIcon
                    icon={ThermometerIcon}
                    color="#9CA3AF"
                    size={14}
                  />
                  <Text className="text-white/60 text-xs ml-1">Humidity</Text>
                  <Text className="text-white text-xs ml-1 font-medium">
                    65%
                  </Text>
                </View>
              </View>

              {/* Style Recommendation */}
              <View className="flex-row items-center pt-2 border-t border-white/10">
                <View className="w-5 h-5 bg-white/40 rounded-full items-center justify-center mr-2">
                  <Text className="text-white text-xs font-bold">L</Text>
                </View>
                <Text className="text-white/80 text-xs flex-1">
                  Light layers recommended
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
