import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PaymentHistoryScreen from "../../screens/PaymentHistoryScreen";
import CreatePaymentScreen from "../../screens/CreatePaymentScreen";
import PaymentScreen from "../../screens/PaymentScreen";

const Stack = createNativeStackNavigator();

const PaymentStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PaymentHistory" component={PaymentHistoryScreen} />
      <Stack.Screen name="CreatePayment" component={CreatePaymentScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
    </Stack.Navigator>
  );
};

export default PaymentStack;
