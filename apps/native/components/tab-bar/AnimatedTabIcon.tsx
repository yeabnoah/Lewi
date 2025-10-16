import { HugeiconsIcon } from "@hugeicons/react-native";
import { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";

interface AnimatedTabIconProps {
  icon: any;
  color: string;
  focused: boolean;
  label: string;
}

export function AnimatedTabIcon({
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
