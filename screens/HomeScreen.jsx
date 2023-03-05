import { Dimensions, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Header from "../components/Header";
import { BarChart } from "react-native-chart-kit";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const combineDuplicatesTop5 = (arr) => {
  let result = [];
  let map = new Map();
  for (let obj of arr) {
    if (map.has(obj.label)) {
      for (let res of result) {
        if (res.label === obj.label) {
          res.data += obj.data;
        }
      }
    } else {
      map.set(obj.label, true);
      result.push({
        data: obj.data,
        label: obj.label,
      });
    }
  }
  result.sort((a, b) => b.data - a.data);
  return {
    labels: result.slice(0, 5).map((obj) => obj.label),
    data: result.slice(0, 5).map((obj) => obj.data),
  };
};

const HomeScreen = () => {
  const [cooperatives, setCooperatives] = useState([]);
  const [operations, setOperations] = useState([]);
  const [payments, setPayments] = useState([]);

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

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "operations"), (snapshot) => {
      const results = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .map((doc) => ({
          ...doc,
          cooperative: cooperatives.length
            ? cooperatives.find((coop) => coop.id === doc.cooperative)
                .cooperative
            : "",
        }))
        .map((doc) => ({
          label: doc.cooperative,
          data: doc.kgAmount,
        }));
      setOperations(combineDuplicatesTop5(results));
    });
    return () => {
      unsub();
    };
  }, [combineDuplicatesTop5, cooperatives]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "payments"), (snapshot) => {
      const results = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .map((doc) => ({
          ...doc,
          cooperative: cooperatives.length
            ? cooperatives.find((coop) => coop.id === doc.cooperative)
                .cooperative
            : "",
        }))
        .map((doc) => ({
          label: doc.cooperative,
          data: doc.totalKg * doc.kgPrice,
        }));

      setPayments(combineDuplicatesTop5(results));
    });
    return () => {
      unsub();
    };
  }, [combineDuplicatesTop5, cooperatives]);

  const { labels: paymentLabels, data: paymentData } = payments;

  const { labels: operationLabels, data: operationData } = operations;

  return (
    <View className="bg-gray-100 h-full">
      <SafeAreaView className=" p-4">
        <Header title="Welcome Admin" />
        <View className="mt-4">
          <View className="flex-row justify-between items-center">
            <Text className="text-lg">Top 5 Payment in {"\u20B1"}</Text>
            <TouchableOpacity
              className=""
              onPress={() => navigation.navigate("Payments")}
            >
              <Text className="text-lime-500">See More</Text>
            </TouchableOpacity>
          </View>
          <BarChart
            data={{
              labels: paymentLabels || [],
              datasets: [
                {
                  data: paymentData || [],
                },
              ],
            }}
            width={width - 32}
            height={220}
            yAxisLabel={"\u20B1"}
            showValuesOnTopOfBars={true}
            withHorizontalLabels={false}
            chartConfig={{
              backgroundColor: "#1cc910",
              backgroundGradientFrom: "#84cc16",
              backgroundGradientTo: "#84cc16",
              fillShadowGradient: "#fff",
              fillShadowGradientOpacity: 1,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
                paddingRight: 0,
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
              paddingRight: 0,
            }}
          />
        </View>
        <View className="mt-4">
          <View className="flex-row justify-between items-center">
            <Text className="text-lg">Top 5 Operations in kg</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Reports")}>
              <Text className="text-lime-500">See More</Text>
            </TouchableOpacity>
          </View>
          <BarChart
            data={{
              labels: operationLabels || [],
              datasets: [
                {
                  data: operationData || [],
                },
              ],
            }}
            width={Dimensions.get("window").width - 32}
            height={220}
            yAxisLabel={"\u20B1"}
            showValuesOnTopOfBars={true}
            withHorizontalLabels={false}
            chartConfig={{
              backgroundColor: "#1cc910",
              backgroundGradientFrom: "#84cc16",
              backgroundGradientTo: "#84cc16",
              fillShadowGradient: "#fff",
              fillShadowGradientOpacity: 1,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
                paddingRight: 0,
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
              paddingRight: 0,
            }}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
