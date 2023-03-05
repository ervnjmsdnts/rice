import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Back from "../components/Back";
import Input from "../components/Input";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addEmployeeSchema } from "../schemas";
import { useAddUser } from "../actions";
import { useNavigation } from "@react-navigation/native";

const AddEmployeeScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addEmployeeSchema),
  });

  const navigation = useNavigation();

  const { data, error, isValidating, execute } = useAddUser();

  const onSubmit = async (data) => {
    await execute({ ...data, role: "employee" });
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
        <Back title="Add Employee" />
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
            className="bg-lime-500 p-4 rounded-md shadow-sm"
            onPress={handleSubmit(onSubmit)}
            disabled={isValidating}
          >
            <Text className="text-center text-white text-lg">Add</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default AddEmployeeScreen;
