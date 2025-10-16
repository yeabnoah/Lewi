import { Camera01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useEffect, useRef, useState } from "react";
import { Animated, Modal, Text, TouchableOpacity, View } from "react-native";

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
  const [showCameraModal, setShowCameraModal] = useState(false);

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
    setShowCameraModal(true);
  };

  const closeCameraModal = () => {
    setShowCameraModal(false);
  };

  return (
    <>
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
              <HugeiconsIcon icon={Camera01Icon} color="#000" size={24} />
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

      {/* Camera Modal */}
      <Modal
        visible={showCameraModal}
        transparent={true}
        animationType="slide"
        onRequestClose={closeCameraModal}
        presentationStyle="formSheet"
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#1a1a1a",
              borderRadius: 20,
              padding: 30,
              margin: 20,
              alignItems: "center",
              borderWidth: 2,
              borderColor: "#DBFE01",
            }}
          >
            <HugeiconsIcon icon={Camera01Icon} color="#DBFE01" size={48} />
            <Text
              style={{
                color: "#DBFE01",
                fontSize: 18,
                fontWeight: "600",
                marginTop: 15,
                marginBottom: 20,
                textAlign: "center",
              }}
            >
              Camera Scanner
            </Text>
            <Text
              style={{
                color: "#fff",
                fontSize: 14,
                textAlign: "center",
                marginBottom: 25,
                lineHeight: 20,
              }}
            >
              Camera functionality will be implemented here.{"\n"}
              This is where you'll scan items for your wardrobe.
            </Text>
            <TouchableOpacity
              onPress={closeCameraModal}
              style={{
                backgroundColor: "#DBFE01",
                paddingHorizontal: 30,
                paddingVertical: 12,
                borderRadius: 25,
                borderWidth: 2,
                borderColor: "#DBFE01",
              }}
            >
              <Text
                style={{
                  color: "#000",
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}
