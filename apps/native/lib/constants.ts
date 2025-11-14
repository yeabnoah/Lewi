// API Base URL configuration
// For iOS/Android simulators, localhost doesn't work - you need your machine's local IP
// To set this via environment variable: EXPO_PUBLIC_CORS_ORIGIN=http://YOUR_LOCAL_IP:3001
// You can find your IP by running: ipconfig getifaddr en0 (macOS) or ipconfig (Windows)
export const API_BASE_URL =
  process.env.EXPO_PUBLIC_CORS_ORIGIN || "http://192.168.1.5:3001";

export const NAV_THEME = {
  light: {
    background: "hsl(0 0% 98%)", // off-white, elegant
    border: "hsl(0 0% 90%)",
    card: "hsl(0 0% 100%)",
    notification: "hsl(340 82% 52%)", // fashion pink-red pop
    primary: "hsl(210 10% 20%)", // deep neutral
    text: "hsl(210 10% 10%)", // soft black
    accent: "hsl(28 100% 60%)", // soft beige accent
  },
  dark: {
    background: "hsl(240 6% 6%)", // dark charcoal
    border: "hsl(240 4% 16%)",
    card: "hsl(240 4% 10%)",
    notification: "hsl(340 82% 60%)",
    primary: "hsl(0 0% 96%)", // near-white text for contrast
    text: "hsl(0 0% 90%)",
    accent: "hsl(28 100% 65%)",
  },
};
