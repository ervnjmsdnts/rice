import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

const PaymentCard = (props) => {
  const { cooperative, createdAt, total } = props;
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Payment", { ...props })}
    >
      <View className="p-4 mb-2 flex-row justify-between bg-white items-center rounded-md w-full">
        <View>
          <Text className="text-2xl font-bold text-lime-500 flex-1">
            {cooperative}
          </Text>
          <Text className="text-gray-500">
            {moment(createdAt).format("MMM DD YYYY hh:mm A")}
          </Text>
        </View>
        <View>
          <Text className="text-2xl">
            {"\u20B1"}
            {total}.00
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PaymentCard;
