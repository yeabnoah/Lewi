import {
  AiGenerativeIcon,
  Cancel01Icon,
  Camera01Icon,
  FolderIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import * as Haptic from "expo-haptics";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, Pressable, Text, TouchableOpacity, View } from "react-native";

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
  const [isExpanded, setIsExpanded] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  
  // Animation values for expandable buttons
  const cameraOpacity = useRef(new Animated.Value(0)).current;
  const galleryOpacity = useRef(new Animated.Value(0)).current;

  // Animation values for horizontal expandable buttons
  const cameraTranslateX = useRef(new Animated.Value(0)).current;
  const galleryTranslateX = useRef(new Animated.Value(0)).current;
  const cameraTranslateY = useRef(new Animated.Value(0)).current;
  const galleryTranslateY = useRef(new Animated.Value(0)).current;

  // Expandable buttons animation
  useEffect(() => {
    if (isExpanded) {
      Animated.parallel([
        Animated.timing(cameraOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(cameraTranslateX, {
          toValue: -48,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.spring(cameraTranslateY, {
          toValue: -70,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(galleryOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(galleryTranslateX, {
          toValue: 48,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.spring(galleryTranslateY, {
          toValue: -70,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(cameraOpacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(cameraTranslateX, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(cameraTranslateY, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(galleryOpacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(galleryTranslateX, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(galleryTranslateY, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isExpanded, cameraOpacity, galleryOpacity, cameraTranslateX, galleryTranslateX, cameraTranslateY, galleryTranslateY]);

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

  const handleToggleExpand = () => {
    Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Medium);
    setIsExpanded(!isExpanded);
  };

  const handleSourceSelection = (source: "camera" | "gallery") => {
    Haptic.selectionAsync();
    setIsExpanded(false);
    router.push({
      pathname: "/(main)/add-cloth",
      params: { source },
    });
    if (onPress) {
      onPress();
    }
  };

  return (
    <View style={{ alignItems: "center", width: 80, marginTop: -10 }}>
      {/* Expandable FAB Group */}
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
        {/* Camera Button (left top) */}
        <Animated.View
          style={{
            opacity: cameraOpacity,
            transform: [
              { translateX: cameraTranslateX },
              { translateY: cameraTranslateY },
            ],
            position: "absolute",
          }}
          pointerEvents={isExpanded ? "auto" : "none"}
        >
          <Pressable
            onPress={() => handleSourceSelection("camera")}
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <HugeiconsIcon icon={Camera01Icon} size={20} color="#000" />
          </Pressable>
        </Animated.View>

        {/* Main Camera/Close Button */}
        <Animated.View
          style={{
            transform: [{ scale: scaleAnim }],
          }}
        >
          <TouchableOpacity
            onPress={handleToggleExpand}
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
              <HugeiconsIcon
                icon={isExpanded ? Cancel01Icon : AiGenerativeIcon}
                color="#000"
                size={24}
              />
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>

        {/* Gallery Button (right top) */}
        <Animated.View
          style={{
            opacity: galleryOpacity,
            transform: [
              { translateX: galleryTranslateX },
              { translateY: galleryTranslateY },
            ],
            position: "absolute",
          }}
          pointerEvents={isExpanded ? "auto" : "none"}
        >
          <Pressable
            onPress={() => handleSourceSelection("gallery")}
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <HugeiconsIcon icon={FolderIcon} size={20} color="#000" />
          </Pressable>
        </Animated.View>
      </View>
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
