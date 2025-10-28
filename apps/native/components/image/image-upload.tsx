// ImageUpload.tsx
import { useState } from 'react';
import { View, Button, Image, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '@/lib/supabaseClient';

export default function ImageUpload() {
  const [image, setImage] = useState<string | null>(null);
  const [status, setStatus] = useState("");

  // Pick image from library
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      allowsEditing: true,
      mediaTypes: ['images'], // Works in Expo 54
      presentationStyle: ImagePicker.UIImagePickerPresentationStyle.FULL_SCREEN,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Upload image to Supabase
  const uploadImage = async () => {
    if (!image) return;
  
    setStatus("Uploading...");
  
    try {
      const fileName = `${Date.now()}.jpg`;
      const filePath = `uploads/${fileName}`;
  
      // Fetch image URI
      const response = await fetch(image);
      const arrayBuffer = await response.arrayBuffer(); // <-- use response.arrayBuffer() directly
      const fileBuffer = new Uint8Array(arrayBuffer);
  
      const { error } = await supabase.storage
        .from('lewi-bucket')
        .upload(filePath, fileBuffer, {
          contentType: 'image/jpeg',
          upsert: false,
        });
  
      if (error) {
        setStatus(`Upload failed: ${error.message}`);
        return;
      }
  
      setStatus("Upload successful!");
  
      const { data } = supabase.storage.from('lewi-bucket').getPublicUrl(filePath);
      console.log("Public URL:", data.publicUrl);
  
    } catch (err) {
      console.log('Upload error:', err);
      setStatus("Upload failed unexpectedly.");
    }
  };
  

  return (
    <View style={{ alignItems: "center", gap: 20 }}>
      <Button title="Pick Image" onPress={pickImage} />
      {image && (
        <>
          <Image
            source={{ uri: image }}
            style={{ width: 200, height: 200, borderRadius: 10 }}
          />
          <Button title="Upload to Supabase" onPress={uploadImage} />
        </>
      )}
      <Text>{status}</Text>
    </View>
  );
}
