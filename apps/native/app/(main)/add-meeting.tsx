import { useState } from "react";
import {
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import * as Haptic from "expo-haptics";
import { Pressable } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function AddMeeting() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [location, setLocation] = useState("");

  return (
    <ScrollView
      className="flex-1 px-4 pt-[3%]"
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={true}
      bounces={true}
    >
      <View className="gap-5">
        <View>
          <Text className="text-white/80 mb-2">Title</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Team Sync"
            placeholderTextColor="#A1A1AA"
            className="h-14 px-4 rounded-2xl bg-zinc-900/60 text-white"
          />
        </View>

        <View className="flex-row gap-4">
          <View className="flex-1">
            <Text className="text-white/80 mb-2">Date</Text>
            <Pressable
              onPress={() => {
                Haptic.selectionAsync();
                setShowDate(true);
              }}
              className="h-14 px-4 rounded-2xl bg-zinc-900/60 justify-center"
            >
              <Text className="text-white">
                {date ? date.toDateString() : "Select date"}
              </Text>
            </Pressable>
            <Modal visible={showDate} transparent animationType="fade">
              <Pressable
                className="flex-1 items-center justify-center bg-black/50"
                onPress={() => setShowDate(false)}
              >
                <Pressable className="w-11/12 rounded-2xl bg-zinc-900 p-4">
                  <Text className="text-white/80 mb-3">Pick a date</Text>
                  <DateTimePicker
                    value={date ?? new Date()}
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={(event, selectedDate) => {
                      if (Platform.OS !== "ios") setShowDate(false);
                      if (selectedDate) setDate(selectedDate);
                    }}
                  />
                  {Platform.OS === "ios" && (
                    <Pressable
                      onPress={() => setShowDate(false)}
                      className="mt-3 h-12 rounded-xl items-center justify-center bg-white"
                    >
                      <Text className="text-black font-semibold">Done</Text>
                    </Pressable>
                  )}
                </Pressable>
              </Pressable>
            </Modal>
          </View>
          <View className="flex-1">
            <Text className="text-white/80 mb-2">Time</Text>
            <Pressable
              onPress={() => {
                Haptic.selectionAsync();
                setShowTime(true);
              }}
              className="h-14 px-4 rounded-2xl bg-zinc-900/60 justify-center"
            >
              <Text className="text-white">
                {time
                  ? time.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "Select time"}
              </Text>
            </Pressable>
            <Modal visible={showTime} transparent animationType="fade">
              <Pressable
                className="flex-1 items-center justify-center bg-black/50"
                onPress={() => setShowTime(false)}
              >
                <Pressable className="w-11/12 rounded-2xl bg-zinc-900 p-4">
                  <Text className="text-white/80 mb-3">Pick a time</Text>
                  <DateTimePicker
                    value={time ?? new Date()}
                    mode="time"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={(event, selectedTime) => {
                      if (Platform.OS !== "ios") setShowTime(false);
                      if (selectedTime) setTime(selectedTime);
                    }}
                  />
                  {Platform.OS === "ios" && (
                    <Pressable
                      onPress={() => setShowTime(false)}
                      className="mt-3 h-12 rounded-xl items-center justify-center bg-white"
                    >
                      <Text className="text-black font-semibold">Done</Text>
                    </Pressable>
                  )}
                </Pressable>
              </Pressable>
            </Modal>
          </View>
        </View>

        <View>
          <Text className="text-white/80 mb-2">Location</Text>
          <TextInput
            value={location}
            onChangeText={setLocation}
            placeholder="Conference Room A"
            placeholderTextColor="#A1A1AA"
            className="h-14 px-4 rounded-2xl bg-zinc-900/60 text-white"
          />
        </View>

        <Pressable
          onPress={() => {
            Haptic.selectionAsync();
            // TODO: Hook up save action
          }}
          className="mt-4 h-14 rounded-2xl items-center justify-center bg-white"
        >
          <Text className="text-black font-semibold">Save Event</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
