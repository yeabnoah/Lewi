import { AiGenerativeIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import * as Haptic from "expo-haptics";
import { router } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";

interface CircularCameraButtonProps {
  color: string;
  focused: boolean;
  onPress: () => void;
}

export function CircularCameraButton({
  color,
  focused,
  onPress,
}: CircularCameraButtonProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Always show pulse animation for the camera button
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    if (focused) {
      Animated.sequence([
        Animated.spring(scaleAnim, {
          toValue: 1.1,
          tension: 100,
          friction: 8,
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
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }).start();
    }
  }, [focused, scaleAnim, pulseAnim]);

  const handleCameraPress = () => {
    Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Medium);
    // Navigate to add-cloth screen
    router.push("/(main)/add-cloth");
    // Also call the onPress prop if provided
    if (onPress) {
      onPress();
    }
  };

  return (
    <View style={{ alignItems: "center", width: 80, marginTop: -10 }}>
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
        }}
      >
        <TouchableOpacity
          onPress={handleCameraPress}
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: "#DBFE01",
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "#DBFE01",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.4,
            shadowRadius: 12,
            elevation: 12,
            borderWidth: 3,
            borderColor: "#DBFE01",
          }}
        >
          <Animated.View
            style={{
              transform: [{ scale: pulseAnim }],
            }}
          >
            <HugeiconsIcon icon={AiGenerativeIcon} color="#000" size={24} />
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
      {focused && (
        <Text
          style={{
            color: "#DBFE01",
            fontSize: 10,
            marginTop: 4,
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          Scan
        </Text>
      )}
    </View>
  );
}
