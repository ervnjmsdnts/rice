import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AddFAB from "../components/AddFAB";
import OperationCard from "../components/OperationCard";
import { useAuth } from "../context/AuthContext";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const OperationScreen = () => {
  const navigation = useNavigation();
  const [operations, setOperations] = useState([]);
  const [cooperatives, setCooperatives] = useState([]);

  const { logout, currentUser } = useAuth();

  useLayoutEffect(() => {
    const unsub = onSnapshot(collection(db, "operations"), (snapshot) => {
      setOperations(
        snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((doc) => doc.employee === currentUser.id)
      );
    });

    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
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

  const received = useMemo(
    () =>
      operations
        .filter((op) => op.operationType === "Receive")
        .map((op) => ({
          ...op,
          cooperative: cooperatives.length
            ? cooperatives?.find((coop) => coop.id === op.cooperative)
                .cooperative
            : "",
        })),
    [operations, cooperatives]
  );

  const handleLogout = async () => {
    await logout();
    return navigation.navigate("Login");
  };

  return (
    <>
      <View className="bg-gray-100 h-full">
        <SafeAreaView className="p-4 h-full">
          <View className="flex-row justify-between items-center">
            <Header title={`Welcome ${currentUser.firstName}`} noMenu />
            <TouchableOpacity onPress={handleLogout}>
              <Ionicons name="log-out" size={24} />
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-evenly">
            <View className="p-4">
              <View className="relative w-full">
                <Text className="mb-2">Received</Text>
                <View className="absolute w-full bottom-0 h-[2px] bg-lime-500" />
              </View>
            </View>
          </View>
          <View className="mt-4">
            <FlatList
              data={received}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <OperationCard {...item} />}
            />
          </View>
        </SafeAreaView>
      </View>
      <AddFAB onPress={() => navigation.navigate("CreateOperation")} />
    </>
  );
};

export default OperationScreen;
