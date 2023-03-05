import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CooperativeCard = (props) => {
  const { firstName, lastName, cooperative } = props;
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("EditCooperative", { ...props })}
    >
      <View className="p-4 mb-2 bg-white rounded-md w-full flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-xl text-lime-500 font-bold">{cooperative}</Text>
          <Text className="text-lg">{`${firstName} ${lastName}`}</Text>
        </View>
        <Ionicons name="arrow-forward-sharp" size={24} />
      </View>
    </TouchableOpacity>
  );
};

export default CooperativeCard;
