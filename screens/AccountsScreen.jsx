import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useLayoutEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import EmployeeCard from "../components/EmployeeCard";
import AddFAB from "../components/AddFAB";
import CooperativeCard from "../components/CooperativeCard";
import { useNavigation } from "@react-navigation/native";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const AccountsScreen = () => {
  const [isEmployee, setIsEmployee] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    const unsub = onSnapshot(collection(db, "users"), (snapshot) => {
      setAccounts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsub();
    };
  }, []);

  const employees = useMemo(
    () => accounts.filter((acc) => acc.role === "employee"),
    [accounts]
  );

  const cooperatives = useMemo(
    () => accounts.filter((acc) => acc.role === "cooperative"),
    [accounts]
  );

  return (
    <View className="bg-gray-100 h-full">
      <SafeAreaView className="p-4 h-full">
        <Header title="Manage Accounts" />
        <View className="flex-row justify-evenly">
          <TouchableOpacity className="p-4" onPress={() => setIsEmployee(true)}>
            <View className="relative w-full">
              <Text className="mb-2">Employees</Text>
              {isEmployee && (
                <View className="absolute w-full bottom-0 h-[2px] bg-lime-500" />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className="p-4"
            onPress={() => setIsEmployee(false)}
          >
            <View className="relative w-full">
              <Text className="mb-2">Cooperatives</Text>
              {!isEmployee && (
                <View className="absolute w-full bottom-0 h-[2px] bg-lime-500" />
              )}
            </View>
          </TouchableOpacity>
        </View>
        {isEmployee ? (
          <>
            <FlatList
              data={employees}
              renderItem={({ item }) => <EmployeeCard {...item} />}
              keyExtractor={(item) => item.id}
            />
            <AddFAB onPress={() => navigation.navigate("AddEmployee")} />
          </>
        ) : (
          <>
            <FlatList
              data={cooperatives}
              renderItem={({ item }) => <CooperativeCard {...item} />}
              keyExtractor={(item) => item.id}
            />
            <AddFAB onPress={() => navigation.navigate("AddCooperative")} />
          </>
        )}
      </SafeAreaView>
    </View>
  );
};

export default AccountsScreen;
