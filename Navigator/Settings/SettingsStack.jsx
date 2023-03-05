import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsScreen from "../../screens/SettingsScreen";
import PersonalInformationScreen from "../../screens/PersonalInformationScreen";
import OverviewScreen from "../../screens/OverviewScreen";
import DevelopersScreen from "../../screens/DevelopersScreen";
import HowToScreen from "../../screens/HowToScreen";

const Stack = createNativeStackNavigator();

const SettingsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainSettings" component={SettingsScreen} />
      <Stack.Screen
        name="PersonalInformation"
        component={PersonalInformationScreen}
      />
      <Stack.Screen name="Overview" component={OverviewScreen} />
      <Stack.Screen name="Developers" component={DevelopersScreen} />
      <Stack.Screen name="HowTo" component={HowToScreen} />
    </Stack.Navigator>
  );
};

export default SettingsStack;
