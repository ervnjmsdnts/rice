import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Back from "../components/Back";

const developers = [
  {
    id: 1,
    name: "Cris Ann F. Timalog",
  },
  {
    id: 2,
    name: "Maychiel J. Javier",
  },
  {
    id: 3,
    name: "Jhune Carlo E. Indap",
  },
  {
    id: 4,
    name: "Gricelyn C. Garcia",
  },
  {
    id: 5,
    name: "Jessa Jane F. Ramos",
  },
];

const DevelopersScreen = () => {
  return (
    <View className="bg-gray-100 h-full">
      <SafeAreaView className="p-4 h-full">
        <Back title="Developers" />
        <View className="mt-4">
          {developers.map((dev) => (
            <Text key={dev.id} className="mb-2 text-lg">
              {dev.name}
            </Text>
          ))}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default DevelopersScreen;
