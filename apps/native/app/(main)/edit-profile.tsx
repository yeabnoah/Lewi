import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { supabase } from "@/lib/supabaseClient";
import { useColorScheme } from "@/lib/use-color-scheme";
import { ArrowLeft01Icon, Camera01Icon, Tick01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Alert, Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";

export default function EditProfile() {
  const { isDarkColorScheme } = useColorScheme();
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const dicebearPlaceholder = useMemo(() => {
    const seed = session?.user?.id || session?.user?.email || session?.user?.name || "guest";
    return `https://api.dicebear.com/8.x/avataaars/png?seed=${encodeURIComponent(seed)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf&radius=50`;
  }, [session?.user?.id, session?.user?.email, session?.user?.name]);

  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  



  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || "",
        email: session.user.email || "",
      });
    }
    const initialAvatar = session?.user?.image ?? dicebearPlaceholder;
    setAvatarUri(initialAvatar);
  }, [session?.user, session?.user?.image, dicebearPlaceholder]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const updateData: { name?: string; image?: string } = {};
      if (formData.name !== session?.user?.name) {
        updateData.name = formData.name;
      }
      
      if (avatarUri && avatarUri !== session?.user?.image && avatarUri !== dicebearPlaceholder) {
        updateData.image = avatarUri;
      }
      
      if (Object.keys(updateData).length > 0) {
        await authClient.updateUser(updateData);
      }
      
      Alert.alert("Success", "Profile updated successfully!", [
        { text: "OK", onPress: () => router.back() }
      ]);
    } catch (error) {
      console.error("Profile update failed:", error);
      Alert.alert("Error", "Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePickAndUploadAvatar = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        quality: 1,
        allowsEditing: true,
        mediaTypes: ["images"],
        presentationStyle: ImagePicker.UIImagePickerPresentationStyle.FULL_SCREEN,
      });

      if (result.canceled) return;

      const localUri = result.assets[0].uri;
      setAvatarUri(localUri);
      setIsUploadingAvatar(true);

      const fileName = `${session?.user?.id ?? "anon"}-${Date.now()}.jpg`;
      const filePath = `uploads/${fileName}`;

      const response = await fetch(localUri);
      const arrayBuffer = await response.arrayBuffer();
      const fileBuffer = new Uint8Array(arrayBuffer);

      const { error } = await supabase.storage
        .from("lewi-bucket")
        .upload(filePath, fileBuffer, {
          contentType: "image/jpeg",
          upsert: false,
        });

      if (error) {
        throw new Error(error.message);
      }

      const { data } = supabase.storage.from("lewi-bucket").getPublicUrl(filePath);
      if (data?.publicUrl) {
        setAvatarUri(data.publicUrl);
      }
    } catch (err) {
      console.error("Avatar upload failed:", err);
      Alert.alert("Upload failed", "Could not upload image. Please try again.");
      // fallback to placeholder if current avatar is invalid
      if (avatarUri !== dicebearPlaceholder) setAvatarUri(dicebearPlaceholder);
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateUserInfo = async () => {
    try {
      setIsLoading(true);
      await authClient.updateUser({
        name: formData.name,
        image: avatarUri ?? undefined,
      });
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to update user info:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 mx-[2vw]">
      {/* Header */}
      <View className="px-4 py-3 pt-[3%] backdrop-blur-sm">
        <View className="flex-row items-center justify-between">
          <Pressable
            className="h-10 w-10 items-center justify-center rounded-full bg-white/10"
            onPress={() => router.back()}
          >
            <HugeiconsIcon
              icon={ArrowLeft01Icon}
              size={20}
              color={isDarkColorScheme ? "#FFFFFF" : "#0A0A0A"}
            />
          </Pressable>
          <Text className="text-xl font-bold text-white">Edit Profile</Text>
          <Pressable
            className="h-10 w-10 items-center justify-center rounded-full bg-white/10"
            onPress={handleSave}
            disabled={isLoading}
          >
            <HugeiconsIcon
              icon={Tick01Icon}
              size={20}
              color={isDarkColorScheme ? "#FFFFFF" : "#0A0A0A"}
            />
          </Pressable>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        className="flex-1 px-4 mt-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={true}
        bounces={true}
      >
        {/* Profile Picture Section */}
        <View className="bg-zinc-900/60 rounded-2xl p-6 mb-6 items-center">
          <View className="relative h-24 w-24 mb-3">
            <Image
              source={avatarUri ? { uri: avatarUri } : require("@/assets/images/outfit.jpg")}
              className="h-24 w-24 rounded-full"
              resizeMode="cover"
              onError={() => {
                if (avatarUri !== dicebearPlaceholder) setAvatarUri(dicebearPlaceholder);
              }}
            />
            <Pressable
              className="absolute -bottom-1 -right-1 h-9 w-9 items-center justify-center rounded-full bg-white/15"
              onPress={handlePickAndUploadAvatar}
            >
              <HugeiconsIcon
                icon={Camera01Icon}
                size={16}
                color={isDarkColorScheme ? "#FFFFFF" : "#0A0A0A"}
              />
            </Pressable>
          </View>
          <Text className="text-white/70 text-sm">
            {isUploadingAvatar ? "Uploading photo..." : "Update your profile picture"}
          </Text>
        </View>

        {/* Form Sections */}
        <View className="gap-5">
          <View className="bg-zinc-900/60 rounded-2xl p-5">
            <Text className="text-white/90 text-base font-semibold mb-4">Profile</Text>
            <View className="gap-4">
              <View>
                <Text className="text-white/90 text-sm font-medium mb-2">Full Name</Text>
                <TextInput
                  value={formData.name}
                  onChangeText={(value) => handleInputChange("name", value)}
                  placeholder="Enter your full name"
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 16,
                    borderRadius: 16,
                    fontSize: 14,
                    marginBottom: 8,
                    color: "white",
                  }}
                  className="bg-black/20 border-zinc-700 text-white"
                  placeholderTextColor="#A3A3A3"
                />
              </View>
            </View>
          </View>

          <View className="bg-zinc-900/60 rounded-2xl p-5">
            <Text className="text-white/90 text-base font-semibold mb-4">Account</Text>
            <View className="gap-4">
              <View>
                <Text className="text-white/90 text-sm font-medium mb-2">Email</Text>
                <TextInput
                  value={formData.email}
                  onChangeText={(value) => handleInputChange("email", value)}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 16,
                    borderRadius: 16,
                    fontSize: 14,
                    marginBottom: 8,
                    color: "white",
                  }}
                  className="bg-black/20  border-zinc-700 text-white"
                  placeholderTextColor="#A3A3A3"
                />
              </View>
            </View>
          </View>
        </View>

        {/* Save Button */}
        <View className="mt-8">
          <Button
            className="w-full h-14 bg-zinc-900 rounded-xl active:bg-zinc-900/80"
            onPress={updateUserInfo}
            disabled={isLoading || isUploadingAvatar}
            size="lg"
          >
            <Text className="text-white font-medium text-base">
              {isLoading ? "Saving..." : isUploadingAvatar ? "Uploading photo..." : "Save Changes"}
            </Text>
            <HugeiconsIcon
              icon={Tick01Icon}
              size={20}
              color={isDarkColorScheme ? "#FFFFFF" : "#0A0A0A"}
            />
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
