import React, { useState } from "react";
import { ScrollView, TouchableOpacity, Text } from "react-native";

const Tag = React.memo(({ onSelect, data }) => {
  const [userOption, setUserOption] = useState("All");

  const selectHandler = (value) => {
    onSelect(value);
    setUserOption(value);
  };

  return (
    <ScrollView horizontal={true}>
      {data.map((item) => (
        <TouchableOpacity
          onPress={() => selectHandler(item.name)}
          key={item.id}
          className={`mr-2 min-w-[64px] px-2 h-8 border border-lime-500 rounded-3xl ${
            item.name === userOption && "bg-lime-500"
          }`}
        >
          <Text
            className={`m-auto ${item.name === userOption && "text-white"}`}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
});

export default Tag;
