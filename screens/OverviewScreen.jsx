import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Back from "../components/Back";

const OverviewScreen = () => {
  return (
    <View className="bg-gray-100 h-full">
      <SafeAreaView className="h-full p-4">
        <Back title="Overview" />
        <View className="mt-4 gap-4">
          <View className="flex-row items-center justify-center w-full gap-4">
            <View className="w-24 h-24 overflow-hidden">
              <View className="h-full">
                <Image
                  source={require("../assets/logo.png")}
                  className="w-full h-full"
                />
              </View>
            </View>
            <Text className="text-2xl font-bold w-full max-w-[240px]">
              Rice Hull Management System
            </Text>
          </View>
          <Text>
            The Rice Hull Management System for PRECO is an android application
            that assists rice millers in recording, delivering, and payment
            transactions, providing real-time data updates and an automatic
            reporting system.
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default OverviewScreen;
