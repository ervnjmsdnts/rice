import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Back from "../components/Back";
import moment from "moment";

const PaymentScreen = ({ route: { params } }) => {
  return (
    <View className="h-full bg-gray-100">
      <SafeAreaView className="p-4 bg-lime-500 h-full">
        <Back white title="Payment" />
        <View className="h-1/5 justify-center items-center">
          <Text className="text-white text-5xl">
            {"\u20B1"}
            {params.total.toFixed(2)}
          </Text>
        </View>
        <ScrollView className="bg-white px-4 rounded-xl h-full">
          <View className="mb-2">
            <Text className="text-lime-500 text-2xl">{params.cooperative}</Text>
            <Text className="text-gray-500 text-lg">{params.owner}</Text>
          </View>
          <View className="mb-2">
            <Text className="text-2xl">From</Text>
            <Text className="text-gray-500 text-lg">
              {moment(params.from).format("MMM/DD/YYYY")}
            </Text>
          </View>
          <View className="mb-2">
            <Text className="text-2xl">To</Text>
            <Text className="text-gray-500 text-lg">
              {moment(params.to).format("MMM/DD/YYYY")}
            </Text>
          </View>
          <View className="mb-2">
            <Text className="text-2xl">Total kg</Text>
            <Text className="text-gray-500 text-lg">{params.totalKg} kg</Text>
          </View>
          <View className="mb-2">
            <Text className="text-2xl">Price /kg</Text>
            <Text className="text-gray-500 text-lg">
              {"\u20B1"}
              {params.kgPrice.toFixed(2)}
            </Text>
          </View>
          <View className="mb-2">
            <Text className="text-2xl">Classification</Text>
            <Text className="text-gray-500 text-lg">
              {params.classification}
            </Text>
          </View>
          <View className="mb-2">
            <Text className="text-2xl">Payment Type</Text>
            <Text className="text-gray-500 text-lg">{params.paymentType}</Text>
          </View>
          <View className="mb-2">
            <Text className="text-2xl">Description</Text>
            <Text className="text-lg text-gray-500">{params.description}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default PaymentScreen;
