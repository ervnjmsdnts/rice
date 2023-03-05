import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useLayoutEffect, useState, useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import Tag from "../components/Tag";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import ReportsCard from "../components/ReportsCard";

const classes = [
  {
    id: 0,
    name: "All",
  },
  {
    id: 1,
    name: "Class A",
  },
  {
    id: 2,
    name: "Class B",
  },
  {
    id: 3,
    name: "Class C",
  },
];

const CooperativeOperationsScreen = () => {
  const [cooperatives, setCooperatives] = useState([]);
  const [operations, setOperations] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [classFilter, setClassFilter] = useState("All");

  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);

  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());

  const { logout, currentUser } = useAuth();

  const navigation = useNavigation();

  useLayoutEffect(() => {
    const unsub = onSnapshot(collection(db, "users"), (snapshot) =>
      setEmployees(
        snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((doc) => doc.role === "employee")
      )
    );

    return () => {
      unsub();
    };
  }, []);

  useLayoutEffect(() => {
    const unsub = onSnapshot(collection(db, "users"), (snapshot) =>
      setCooperatives(
        snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((doc) => doc.role === "cooperative")
          .map((doc) => ({ ...doc, name: doc.cooperative }))
          .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
      )
    );

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

  const coopOperations = useMemo(
    () =>
      operations
        .map((op) => {
          const cooperative = cooperatives.length
            ? cooperatives?.find((coop) => coop.id === op.cooperative)
                .cooperative
            : "";
          const employee = employees.length
            ? employees?.find((emp) => emp.id === op.employee)
            : "";
          return {
            ...op,
            cooperative,
            employee: `${employee.firstName} ${employee.lastName}`,
          };
        })
        .filter((op) => op.cooperative === currentUser.cooperative),
    [operations, cooperatives]
  );

  const filteredOperations = useMemo(() => {
    const dateFiltered = coopOperations
      .filter((coop) =>
        moment(coop.createdAt).isBetween(moment(from), moment(to), "day", "[]")
      )
      .sort((a, b) => b.createdAt - a.createdAt);
    if (classFilter === "All") return dateFiltered;
    return dateFiltered.filter((fil) => fil.classification === classFilter);
  }, [coopOperations, classFilter, from, to]);

  const received = useMemo(
    () => filteredOperations.filter((fil) => fil.operationType === "Receive"),
    [filteredOperations]
  );

  const allKg = useMemo(
    () => received.reduce((acc, obj) => acc + obj.kgAmount, 0),
    [received]
  );

  const filteredKg = useMemo(
    () =>
      received
        .filter((op) => op.classification === classFilter)
        .reduce((acc, obj) => acc + obj.kgAmount, 0),
    [received]
  );

  const handleFrom = (date) => {
    setFrom(new Date(date));
    setShowFrom(false);
  };

  const handleTo = (date) => {
    setTo(new Date(date));
    setShowTo(false);
  };

  const handleLogout = async () => {
    await logout();
    return navigation.navigate("Login");
  };

  return (
    <View className="bg-gray-100 h-full flex-col justify-between">
      <SafeAreaView className="p-4 flex-grow">
        <View className="flex-row justify-between items-center">
          <Header noMenu title={`Welcome ${currentUser.cooperative}`} />
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
        <View className="flex-row items-center justify-between">
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
        <View className="mt-2">
          <Tag onSelect={(value) => setClassFilter(value)} data={classes} />
        </View>
        <View className="mt-4">
          <FlatList
            data={received}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ReportsCard noCoop {...item} />}
          />
        </View>
      </SafeAreaView>
      <View className="bg-white flex-row justify-between items-center p-4 h-20 w-full">
        <Text>Classification: {classFilter}</Text>
        <Text>{classFilter === "All" ? allKg : filteredKg} Kg</Text>
      </View>
    </View>
  );
};

export default CooperativeOperationsScreen;
