import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Input from "../components/Input";
import { Path, Svg } from "react-native-svg";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../schemas";
import { useLogin } from "../actions";
import { useAuth } from "../context/AuthContext";
import KeyboardWrapper from "../components/KeyboardWrapper";

const { width, height } = Dimensions.get("window");

const LoginScreen = () => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const { data, error, isValidating, execute } = useLogin();

  const { setUser } = useAuth();

  const onSubmit = async (data) => {
    await execute(data);
  };

  useEffect(() => {
    (async () => {
      if (!data && !error) return;
      if (error) return console.log(error);

      await setUser(data);

      if (data?.role === "employee")
        return navigation.navigate("EmployeeStack");
      if (data?.role === "cooperative")
        return navigation.navigate("Cooperative");
      if (data?.role === "admin") return navigation.navigate("Admin");
    })();
  }, [data, error]);

  return (
    <KeyboardWrapper>
      <ImageBackground
        source={require("../assets/background.jpg")}
        style={{ height: height / 1.75 }}
        blurRadius={5}
      >
        <View className="absolute z-10 flex flex-row items-center justify-center w-full h-full gap-4">
          <View className="w-24 h-24 overflow-hidden">
            <View className="h-full">
              <Image
                source={require("../assets/logo.png")}
                className="w-full h-full"
              />
            </View>
          </View>
          <Text className="text-2xl text-white font-bold w-full max-w-[240px]">
            Rice Hull Management System
          </Text>
        </View>
        <View className="absolute z-10 -bottom-5" style={{ width: width }}>
          <View style={{ height: 160 }}>
            <Svg
              viewBox="0 0 1440 320"
              height="60%"
              width="100%"
              className="absolute bottom-0"
            >
              <Path
                fill="#f3f4f6"
                fill-opacity="1"
                d="M0,128L60,144C120,160,240,192,360,186.7C480,181,600,139,720,106.7C840,75,960,53,1080,74.7C1200,96,1320,160,1380,192L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
              />
            </Svg>
          </View>
        </View>
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }} />
      </ImageBackground>
      <View className="bg-gray-100 h-full mt-2">
        <View className="p-4">
          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <Input
                onChangeText={onChange}
                value={value}
                error={errors?.email}
                placeholder="Email Address"
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                error={errors?.password}
                password
                placeholder="Password"
              />
            )}
          />
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            // onPress={() => navigation.navigate("Admin")}
            disabled={isValidating}
            className="bg-lime-500 p-4 rounded-md shadow-sm"
          >
            <Text className="text-center text-white text-lg">SIGN IN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardWrapper>
  );
};

export default LoginScreen;
