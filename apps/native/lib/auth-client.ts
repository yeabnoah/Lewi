import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

// Get the server URL from environment variable or use the current local network IP
// For iOS/Android simulators, localhost doesn't work - you need your machine's local IP
// To set this: EXPO_PUBLIC_SERVER_URL=http://YOUR_LOCAL_IP:3001/api/auth
const getServerURL = () => {
  if (process.env.EXPO_PUBLIC_SERVER_URL) {
    return process.env.EXPO_PUBLIC_SERVER_URL;
  }
  // Default to current network IP (update this if your IP changes)
  // You can find your IP by running: ipconfig getifaddr en0 (macOS) or ipconfig (Windows)
  return "http://10.232.100.72:3001/api/auth";
};

export const authClient = createAuthClient({
  baseURL: getServerURL(),
  plugins: [
    expoClient({
      scheme: "lewi",
      storagePrefix: "lewi",
      storage: SecureStore,
    }),
  ],
});
