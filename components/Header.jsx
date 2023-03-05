import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Header = ({ title, noMenu }) => {
  const navigation = useNavigation();
  return (
    <View className="flex flex-row items-center gap-4">
      {!noMenu && (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={32} />
        </TouchableOpacity>
      )}
      <Text className="text-lg">{title}</Text>
    </View>
  );
};

export default Header;
