import { TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const AddFAB = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="h-14 w-14 rounded-full absolute bottom-5 right-5 justify-center bg-lime-500 items-center"
    >
      <Ionicons name="add" size={32} color="white" />
    </TouchableOpacity>
  );
};

export default AddFAB;
