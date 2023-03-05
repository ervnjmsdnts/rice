import { View, FlatList } from "react-native";
import React, { useLayoutEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import PaymentCard from "../components/PaymentCard";
import AddFAB from "../components/AddFAB";
import { useNavigation } from "@react-navigation/native";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const PaymentHistoryScreen = () => {
  const navigation = useNavigation();
  const [payments, setPayments] = useState([]);
  const [cooperatives, setCooperatives] = useState([]);

  useLayoutEffect(() => {
    const unsub = onSnapshot(collection(db, "payments"), (snapshot) =>
      setPayments(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    );

    return () => {
      unsub();
    };
  }, []);

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

  const coopPayments = useMemo(
    () =>
      payments
        .map((pay) => {
          const parse = cooperatives.length
            ? cooperatives?.find((coop) => coop.id === pay.cooperative)
            : "";
          return {
            ...pay,
            cooperative: parse.cooperative,
            owner: `${parse.firstName} ${parse.lastName}`,
            total: pay.totalKg * pay.kgPrice,
          };
        })
        .sort((a, b) => b.createdAt - a.createdAt),
    [payments, cooperatives]
  );

  return (
    <>
      <View className="bg-gray-100 h-full">
        <SafeAreaView className="p-4 h-full">
          <Header title="Payment History" />
          <View className="mt-4">
            <FlatList
              data={coopPayments}
              renderItem={({ item }) => <PaymentCard {...item} />}
              keyExtractor={(item) => item.id}
            />
          </View>
        </SafeAreaView>
      </View>
      <AddFAB onPress={() => navigation.navigate("CreatePayment")} />
    </>
  );
};

export default PaymentHistoryScreen;
