import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Back from "../components/Back";

const HowTo = ({ title, children }) => {
  return (
    <View className="mt-4">
      <Text className="text-xl font-bold">{title}</Text>
      <Text>{children}</Text>
    </View>
  );
};

const HowToScreen = () => {
  return (
    <View className="bg-gray-100 h-full">
      <SafeAreaView className="p-4 h-full">
        <Back title="How To Use" />
        <ScrollView>
          <HowTo title="Employees Account">
            Tap + add, put the first name, last name, email account, contact
            number and password then tap Create.
          </HowTo>
          <HowTo title="Cooperative Account">
            Tap + add, put the first name, last name, cooperative name, email
            account, contact number and password then tap Create.
          </HowTo>
          <HowTo title="Payments">
            Tap payments and the payment history will appear and when making a
            payment tap the + choose classification type, choose cooperative and
            the total kilogram will automatically appear, then put the price per
            kilo and it will automatically total. Then select the payment type,
            whether cash or check. Click create and it will appear on
            transaction history.
          </HowTo>
          <HowTo title="Reports">
            Tap the reports, where all the registered cooperatives will appear.
            You can see the transactions of each cooperative by choosing a date,
            for example, February 1–15, and tapping OK, and the total amount of
            rice hulls received will appear by classifications, examples A, B,
            and C.
          </HowTo>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default HowToScreen;
