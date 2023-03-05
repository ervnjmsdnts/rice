import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Back from "../components/Back";
import Input from "../components/Input";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAddUser } from "../actions";
import { addCooperativeSchema } from "../schemas";
import { useNavigation } from "@react-navigation/native";

const AddCooperativeScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(addCooperativeSchema) });

  const navigation = useNavigation();

  const { data, error, isValidating, execute } = useAddUser();

  const onSubmit = async (data) => {
    await execute({ ...data, role: "cooperative" });
  };

  useEffect(() => {
    (() => {
      if (!data && !error) return;
      if (error) return console.log(error);

      navigation.goBack();
    })();
  }, [data, error]);

  return (
    <View className="bg-gray-100 h-full">
      <SafeAreaView className="p-4">
        <Back title="Add Cooperative" />
        <View className="mt-4">
          <Controller
            name="firstName"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="First Name"
                value={value}
                error={errors?.firstName}
                onChangeText={onChange}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Last Name"
                error={errors?.lastName}
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          <Controller
            name="cooperative"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Cooperative Name"
                error={errors?.cooperative}
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Email"
                error={errors?.email}
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          <Controller
            name="contactNumber"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Contact Number"
                error={errors?.contactNumber}
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Password"
                error={errors?.password}
                value={value}
                password
                onChangeText={onChange}
              />
            )}
          />
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            disabled={isValidating}
            className="bg-lime-500 p-4 rounded-md shadow-sm"
          >
            <Text className="text-center text-white text-lg">Add</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default AddCooperativeScreen;
