import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
  baseURL:
    process.env.EXPO_PUBLIC_SERVER_URL || "http://10.255.92.72:3001/api/auth",
  plugins: [
    expoClient({
      scheme: "lewi",
      storagePrefix: "lewi",
      storage: SecureStore,
    }),
  ],
});
