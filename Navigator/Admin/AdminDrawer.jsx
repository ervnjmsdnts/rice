import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AccountsStack from "./AccountsStack";
import HomeScreen from "../../screens/HomeScreen";
import PaymentStack from "./PaymentStack";
import ReportsScreen from "../../screens/ReportsScreen";
import SettingsStack from "../Settings/SettingsStack";

const Drawer = createDrawerNavigator();

const drawers = [
  {
    name: "Home",
    component: HomeScreen,
    icon: "home",
  },
  {
    name: "Accounts",
    component: AccountsStack,
    icon: "people",
  },
  {
    name: "Record Of Payments",
    component: PaymentStack,
    icon: "cash",
  },
  {
    name: "Reports",
    component: ReportsScreen,
    icon: "stats-chart",
  },
  {
    name: "Settings",
    component: SettingsStack,
    icon: "settings",
  },
];

const AdminDrawer = () => {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      {drawers.map((drawer) => (
        <Drawer.Screen
          key={drawer.name}
          name={drawer.name}
          component={drawer.component}
          options={{
            drawerActiveBackgroundColor: "#f7fee7",
            drawerActiveTintColor: "#65a30d",
            drawerIcon: ({ color, size }) => (
              <Ionicons name={drawer.icon} color={color} size={size} />
            ),
            drawerLabel: drawer.name,
          }}
        />
      ))}
    </Drawer.Navigator>
  );
};

export default AdminDrawer;
