import { Image } from "expo-image";
import React, { useEffect, useRef } from "react";
import {
  View,
  Animated,
  Easing,
  Dimensions,
  Text,
} from "react-native";

const SCANNER_SIZE = 260;
const CORNER_LENGTH = 32;

const MASK_CLASS = "bg-black/65";
const BORDER_COLOR = "rgba(219, 254, 1, 0.85)";
const LASER_COLOR = "#DBFE01";

interface ScannerUIProps {
  imageUri?: string | null;
}

const ScannerUI = ({ imageUri }: ScannerUIProps) => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 2000, // Speed of the scan
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    );

    loop.start();
    return () => {
      loop.stop();
    };
  }, [animation]);

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, SCANNER_SIZE],
  });

  return (
    <View className="flex-1 flex-col bg-transparent">
      <View
        className={`flex-1 items-center justify-end pb-8 px-6 text-center ${MASK_CLASS}`}
      >
        <Text className="text-white/80 text-[13px] tracking-[3px] uppercase mb-3">
          Analyzing Item
        </Text>
        <Text className="text-white text-[20px] font-semibold text-center leading-tight">
          Hold steady while we capture every detail
        </Text>
        <Text className="text-white/70 text-sm mt-4 text-center leading-5">
          Keep the garment centered in the frame so we can map textures, tones,
          and contours accurately.
        </Text>
      </View>

      <View
        className="flex-row"
        style={{ height: SCANNER_SIZE }}
      >
        <View className={`flex-1 ${MASK_CLASS}`} />

        <View
          className="relative items-center justify-center"
          style={{ width: SCANNER_SIZE, height: SCANNER_SIZE }}
        >
          <View className="absolute inset-0 rounded-[36px] border border-white/10 bg-black/60 backdrop-blur-xl overflow-hidden" />
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              alignItems: "stretch",
              justifyContent: "center",
            }}
          >
            <Image
              source={
                imageUri
                  ? { uri: imageUri }
                  : require("@/assets/images/shirt.jpg")
              }
              className="flex-1"
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "cover",
              }}
            />
          </View>
          <Animated.View
            style={{
              transform: [{ translateY }],
              shadowColor: LASER_COLOR,
              shadowOpacity: 0.5,
              shadowRadius: 16,
              shadowOffset: { width: 0, height: 0 },
            }}
            className="absolute left-6 right-6 h-0.5 bg-lewi"
          />
          {[["top", "left"], ["top", "right"], ["bottom", "left"], ["bottom", "right"]].map(
            ([vertical, horizontal]) => (
              <View
                key={`${vertical}-${horizontal}`}
                className="absolute"
                style={{
                  [vertical]: 18,
                  [horizontal]: 18,
                  width: CORNER_LENGTH,
                  height: CORNER_LENGTH,
                  borderColor: BORDER_COLOR,
                  borderTopWidth: vertical === "top" ? 3 : 0,
                  borderBottomWidth: vertical === "bottom" ? 3 : 0,
                  borderLeftWidth: horizontal === "left" ? 3 : 0,
                  borderRightWidth: horizontal === "right" ? 3 : 0,
                  borderRadius: 6,
                }}
              />
            )
          )}
          <View className="absolute bottom-6 left-6 right-6 rounded-2xl bg-black/60 border border-white/5 px-5 py-3">
            <Text className="text-white/80 text-xs uppercase tracking-[2px] mb-1">
              Focus Locked
            </Text>
            <Text className="text-white text-base font-semibold">
              Textures + Color Palette Mapping
            </Text>
          </View>
        </View>

        <View className={`flex-1 ${MASK_CLASS}`} />
      </View>

      <View className={`flex-1 ${MASK_CLASS} items-center justify-start px-6 pt-8`}>
        <View className="w-full max-w-sm rounded-3xl border border-white/10 bg-black/40 px-5 py-6 space-y-4">
          {[
            { label: "Color Detection", detail: "Identifying dominant tones" },
            { label: "Fabric Insight", detail: "Reading weave + finish" },
            { label: "Style Context", detail: "Matching category metadata" },
          ].map((item) => (
            <View key={item.label} className="flex-row items-start gap-3">
              <View className="h-3 w-3 rounded-full bg-lewi mt-1" />
              <View className="flex-1">
                <Text className="text-white font-semibold text-sm">{item.label}</Text>
                <Text className="text-white/70 text-xs">{item.detail}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default ScannerUI;