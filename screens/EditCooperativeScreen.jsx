import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Back from "../components/Back";
import { Ionicons } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";
import Input from "../components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { addCooperativeSchema } from "../schemas";
import { useEditUser } from "../actions";
import { useNavigation } from "@react-navigation/native";

const EditCooperativeScreen = ({ route: { params } }) => {
  const [isEdit, setIsEdit] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(addCooperativeSchema) });

  const { data, error, isValidating, execute } = useEditUser();

  const onSubmit = async (data) => {
    await execute(data, params.id);
  };

  const navigation = useNavigation();

  useEffect(() => {
    (() => {
      if (!data && !error) return;
      if (error) console.log(error);

      setIsEdit(false);
      navigation.goBack();
    })();
  }, [data, error]);

  return (
    <>
      <View className="bg-gray-100 h-full">
        <SafeAreaView className="p-4 h-full">
          <View className="flex-row justify-between items-center">
            <Back title="Edit Cooperative" />
            <TouchableOpacity
              onPress={() => setIsEdit((prev) => !prev)}
              className="bg-lime-500 p-2 rounded-full"
            >
              <Ionicons
                name={isEdit ? "close-sharp" : "pencil-sharp"}
                color="white"
                size={16}
              />
            </TouchableOpacity>
          </View>
          <View className="mt-4">
            <Controller
              name="firstName"
              control={control}
              defaultValue={params.firstName}
              render={({ field: { value, onChange } }) => (
                <Input
                  editable={isEdit}
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
              defaultValue={params.lastName}
              render={({ field: { value, onChange } }) => (
                <Input
                  placeholder="Last Name"
                  editable={isEdit}
                  error={errors?.lastName}
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            <Controller
              name="cooperative"
              control={control}
              defaultValue={params.cooperative}
              render={({ field: { value, onChange } }) => (
                <Input
                  placeholder="Cooperative Name"
                  editable={isEdit}
                  error={errors?.cooperative}
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              defaultValue={params.email}
              render={({ field: { value, onChange } }) => (
                <Input
                  placeholder="Email"
                  editable={false}
                  error={errors?.email}
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            <Controller
              name="contactNumber"
              control={control}
              defaultValue={params.contactNumber}
              render={({ field: { value, onChange } }) => (
                <Input
                  placeholder="Contact Number"
                  error={errors?.contactNumber}
                  editable={isEdit}
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue={params.password}
              render={({ field: { value, onChange } }) => (
                <Input
                  placeholder="Password"
                  editable={isEdit}
                  error={errors?.password}
                  value={value}
                  password
                  onChangeText={onChange}
                />
              )}
            />
            {isEdit && (
              <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                disabled={isValidating}
                className="bg-lime-500 p-4 rounded-md shadow-sm"
              >
                <Text className="text-center text-white text-lg">Save</Text>
              </TouchableOpacity>
            )}
          </View>
        </SafeAreaView>
      </View>
    </>
  );
};

export default EditCooperativeScreen;