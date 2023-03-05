import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OperationScreen from "../../screens/OperationScreen";
import CreateOperationScreen from "../../screens/CreateOperationScreen";

const Stack = createNativeStackNavigator();

const EmployeeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Employee" component={OperationScreen} />
      <Stack.Screen name="CreateOperation" component={CreateOperationScreen} />
    </Stack.Navigator>
  );
};

export default EmployeeStack;
