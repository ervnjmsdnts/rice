import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccountsScreen from "../../screens/AccountsScreen";
import AddEmployeeScreen from "../../screens/AddEmployeeScreen";
import AddCooperativeScreen from "../../screens/AddCooperativeScreen";
import EditEmployeeScreen from "../../screens/EditEmployeeScreen";
import EditCooperativeScreen from "../../screens/EditCooperativeScreen";

const Stack = createNativeStackNavigator();

const AccountsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ManageAccounts" component={AccountsScreen} />
      <Stack.Screen name="AddEmployee" component={AddEmployeeScreen} />
      <Stack.Screen name="AddCooperative" component={AddCooperativeScreen} />
      <Stack.Screen name="EditEmployee" component={EditEmployeeScreen} />
      <Stack.Screen name="EditCooperative" component={EditCooperativeScreen} />
    </Stack.Navigator>
  );
};

export default AccountsStack;
