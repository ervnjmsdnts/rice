import { Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Back from "../components/Back";
import Input from "../components/Input";
import { SelectList } from "react-native-dropdown-select-list";
import { Ionicons } from "@expo/vector-icons";
import { pickerStyle } from "../styles/pickerStyle";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { Controller, useForm } from "react-hook-form";
import { useAddPayment } from "../actions";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";

const CreatePaymentScreen = () => {
  const [cooperative, setCooperative] = useState();
  const [classification, setClassification] = useState();
  const [paymentType, setPaymentType] = useState();

  const [cooperatives, setCooperatives] = useState([]);
  const [operations, setOperations] = useState([]);

  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);

  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());

  const [showError, setShowError] = useState(false);

  const handleFrom = (date) => {
    setFrom(new Date(date));
    setShowFrom(false);
  };

  const handleTo = (date) => {
    setTo(new Date(date));
    setShowTo(false);
  };

  const { control, handleSubmit } = useForm();

  const { data, error, isValidating, execute } = useAddPayment();

  const navigation = useNavigation();

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

  useLayoutEffect(() => {
    const unsub = onSnapshot(collection(db, "operations"), (snapshot) => {
      setOperations(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
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
      cooperatives.map((coop) => ({ key: coop.id, value: coop.cooperative })),
    [cooperatives]
  );

  const filteredOperations = useMemo(
    () =>
      operations
        .filter(
          (op) =>
            op.cooperative === cooperative &&
            op.classification === classification &&
            !op.isPaid
        )
        .filter((op) =>
          moment(op.createdAt).isBetween(moment(from), moment(to), "day", "[]")
        ),
    [cooperative, classification, from, to]
  );

  const totalKg = useMemo(
    () => filteredOperations.reduce((acc, obj) => acc + obj.kgAmount, 0),
    [filteredOperations]
  );

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      totalKg,
      kgPrice: Number(data.kgPrice),
      operationIds: filteredOperations.map((op) => op.id),
      cooperative,
      classification,
      paymentType,
      from: new Date(from).getTime(),
      to: new Date(to).getTime(),
    };

    if (totalKg === 0) {
      return setShowError(true);
    }

    setShowError(false);
    return await execute(payload);
  };

  return (
    <View className="bg-gray-100 h-full">
      <SafeAreaView className="p-4 h-full">
        <Back title="Create Payment" />
        <View className="mt-4">
          {showError && (
            <View className="p-2 mb-2 border border-red-600 rounded-lg">
              <Text className="text-center text-red-400">
                No Operations to Pay
              </Text>
            </View>
          )}
          <View className="flex-row items-center mb-4 justify-between">
            <View className="">
              <TouchableOpacity
                className="flex-row items-center"
                onPress={() => setShowFrom(true)}
              >
                <Ionicons
                  name="calendar-sharp"
                  style={{ marginRight: 4 }}
                  size={16}
                />
                <Text className="text-lg">From: </Text>
                <Text className="text-lg text-lime-500">
                  {moment(from).format("MMM DD YYYY")}
                </Text>
              </TouchableOpacity>
              <DateTimePicker
                isVisible={showFrom}
                mode="date"
                onCancel={() => setShowFrom(false)}
                onConfirm={handleFrom}
              />
            </View>
            <View className="bg-gray-500 h-[2px] w-4" />
            <View className="flex-row">
              <TouchableOpacity
                className="flex-row items-center"
                onPress={() => setShowTo(true)}
              >
                <Ionicons
                  name="calendar-sharp"
                  style={{ marginRight: 4 }}
                  size={16}
                />
                <Text className="text-lg">To: </Text>
                <Text className="text-lg text-lime-500">
                  {moment(to).format("MMM DD YYYY")}
                </Text>
              </TouchableOpacity>
              <DateTimePicker
                isVisible={showTo}
                mode="date"
                onCancel={() => setShowTo(false)}
                onConfirm={handleTo}
              />
            </View>
          </View>
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
          <SelectList
            save="key"
            setSelected={(value) => setCooperative(value)}
            placeholder="Choose Cooperative"
            search={false}
            data={selectCooperative}
            boxStyles={pickerStyle.boxStyles}
            dropdownStyles={pickerStyle.dropdownStyles}
          />
          <Input
            editable={false}
            placeholder="Total Kg"
            value={totalKg.toString()}
          />
          <Controller
            name="kgPrice"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Price /kg"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          <SelectList
            save="value"
            setSelected={(value) => setPaymentType(value)}
            placeholder="Choose Payment Type"
            search={false}
            data={[
              { key: "Cash", value: "Cash" },
              { key: "Check", value: "Check" },
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
                textAlignVertical="top"
                value={value}
                onChangeText={onChange}
                placeholder="Description"
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

export default CreatePaymentScreen;
