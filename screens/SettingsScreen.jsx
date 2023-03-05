import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";

const SettingItem = ({ icon, name, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center gap-x-2 px-2 py-4"
    >
      <Ionicons name={icon} size={24} />
      <Text className="">{name}</Text>
    </TouchableOpacity>
  );
};

const SettingsScreen = () => {
  const navigation = useNavigation();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigation.navigate("Login");
  };
  return (
    <View className="bg-gray-100 h-full">
      <SafeAreaView className="p-4 h-full">
        <Header title="Settings" />
        <View className="mt-4">
          <SettingItem
            icon="person"
            name="Personal Information"
            onPress={() => navigation.navigate("PersonalInformation")}
          />
          <SettingItem
            icon="document-text-sharp"
            name="Overview"
            onPress={() => navigation.navigate("Overview")}
          />
          <SettingItem
            icon="code-working"
            name="Developers"
            onPress={() => navigation.navigate("Developers")}
          />
          <SettingItem
            icon="help"
            name="How To Use"
            onPress={() => navigation.navigate("HowTo")}
          />
          <SettingItem icon="log-out" name="Log Out" onPress={handleLogout} />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default SettingsScreen;
