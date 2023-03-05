import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Back from "../components/Back";
import { SelectList } from "react-native-dropdown-select-list";
import { pickerStyle } from "../styles/pickerStyle";
import Input from "../components/Input";
import { Controller, useForm } from "react-hook-form";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useAddOperation } from "../actions";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";

const CreateOperationScreen = () => {
  const [cooperative, setCooperative] = useState();
  const [classification, setClassification] = useState();

  const [cooperatives, setCooperatives] = useState([]);

  const { control, handleSubmit } = useForm();

  const { data, error, isValidating, execute } = useAddOperation();

  const { currentUser } = useAuth();

  const navigation = useNavigation();

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      employee: currentUser.id,
      kgAmount: Number(data.kg) * Number(data.quantity),
      operationType: "Receive",
      cooperative,
      classification,
      isPaid: false,
    };
    await execute(payload);
  };

  useLayoutEffect(() => {
    const unsub = onSnapshot(collection(db, "users"), (snapshot) => {
      setCooperatives(
        snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((doc) => doc.role === "cooperative")
      );
    });

    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    (() => {
      if (!data && !error) return;
      if (error) console.log(error);

      navigation.goBack();
    })();
  }, [data, error]);

  const selectCooperative = useMemo(
    () =>
      cooperatives.map((coop) => ({
        key: coop.id,
        value: coop.cooperative,
      })),
    [cooperatives]
  );

  return (
    <View className="bg-gray-100 h-full">
      <SafeAreaView className="p-4 h-full">
        <Back title="Create Operation" />
        <View className="mt-4">
          <SelectList
            save="key"
            setSelected={(value) => setCooperative(value)}
            placeholder="Choose Cooperative"
            search={false}
            data={selectCooperative}
            boxStyles={pickerStyle.boxStyles}
            inputStyles={pickerStyle.inputStyles}
            dropdownStyles={pickerStyle.dropdownStyles}
          />
          <Controller
            name="kg"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Amount of Kg"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          <Controller
            name="quantity"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Total in Kg"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          <SelectList
            save="value"
            setSelected={(value) => setClassification(value)}
            placeholder="Choose Classification Type"
            search={false}
            data={[
              { key: "Class A", value: "Class A" },
              { key: "Class B", value: "Class B" },
              { key: "Class C", value: "Class C" },
            ]}
            boxStyles={pickerStyle.boxStyles}
            inputStyles={pickerStyle.inputStyles}
            dropdownStyles={pickerStyle.dropdownStyles}
          />
          <Controller
            name="description"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                value={value}
                textAlignVertical="top"
                placeholder="Description"
                onChangeText={onChange}
                multiline
                numberOfLines={8}
              />
            )}
          />
          <TouchableOpacity
            className="p-4 bg-lime-500 rounded-md"
            onPress={handleSubmit(onSubmit)}
            disabled={isValidating}
          >
            <Text className="text-white text-center text-lg">Create</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default CreateOperationScreen;
