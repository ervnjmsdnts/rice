import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const EmployeeCard = (props) => {
  const navigation = useNavigation();
  const { firstName, lastName, contactNumber } = props;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("EditEmployee", { ...props })}
    >
      <View className="p-4 mb-2 bg-white rounded-md w-full flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-xl font-bold">
            {`${firstName} ${lastName}`}
          </Text>
          <Text className="text-gray-500">{contactNumber}</Text>
        </View>
        <Ionicons name="arrow-forward-sharp" size={24} />
      </View>
    </TouchableOpacity>
  );
};

export default EmployeeCard;
