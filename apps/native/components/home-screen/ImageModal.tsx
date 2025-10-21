import { Dimensions, Modal, Pressable, View, ScrollView } from "react-native";
import { Image } from "expo-image";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import * as Haptic from "expo-haptics";

interface ImageModalProps {
  visible: boolean;
  selectedImage: any;
  onClose: () => void;
}

export default function ImageModal({
  visible,
  selectedImage,
  onClose,
}: ImageModalProps) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      presentationStyle="overFullScreen"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black justify-center items-center">
        <Pressable
          className="absolute top-12 right-6 z-10 bg-white size-8 items-center justify-center rounded-full"
          onPress={() => {
            Haptic.selectionAsync();
            onClose();
          }}
        >
          <HugeiconsIcon icon={Cancel01Icon} color="black" size={20} />
        </Pressable>

        {selectedImage && (
          <ScrollView
            maximumZoomScale={3}
            minimumZoomScale={1}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={selectedImage}
              style={{
                width: Dimensions.get("window").width,
                height: Dimensions.get("window").height * 0.8,
              }}
              contentFit="contain"
              transition={200}
            />
          </ScrollView>
        )}
      </View>
    </Modal>
  );
}
