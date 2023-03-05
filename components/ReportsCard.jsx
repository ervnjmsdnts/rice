import { View, Text } from "react-native";
import React from "react";
import moment from "moment";

const ReportsCard = (props) => {
  const {
    cooperative,
    classification,
    kgAmount,
    createdAt,
    employee,
    noCoop,
    isPaid,
  } = props;
  return (
    <View className="p-4 mb-2 flex-row justify-between bg-white items-center rounded-md w-full">
      {!noCoop && (
        <Text className="text-xl font-bold text-lime-500">{cooperative}</Text>
      )}
      <View>
        <Text className="font-bold flex-1">{classification}</Text>
        <Text className="text-gray-500">{employee}</Text>
        <Text className="text-gray-500">
          {moment(createdAt).format("MMM DD YYYY hh:mm A")}
        </Text>
      </View>
      <View className="flex flex-col items-end gap-2">
        <Text className="text-2xl">{kgAmount} kg</Text>
        <Text
          className={`rounded-full block py-1 px-2 text-xs text-center ${
            isPaid ? "text-white bg-lime-500" : "bg-yellow-500"
          }`}
        >
          {isPaid ? "Paid" : "Unpaid"}
        </Text>
      </View>
    </View>
  );
};

export default ReportsCard;
