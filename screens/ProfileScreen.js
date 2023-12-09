import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { height, width } from "../utils/responsive";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";

const r = {};
const ProfileScreen = () => {
  const [orders, setOrders] = useState([]);
  const getOrder = async () => {
    const token = await AsyncStorage.getItem("accessToken");
    console.log(token);
    await axios
      .get("https://garvit.click/appbackend/getOrderDetails", {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const uniqueOrder = res.data.data.orders.map((i) => i.resName);
        const set = Array.from(new Set(uniqueOrder));
        console.log(set);
        set.forEach((i, _i) => {
          r[i] = _i + 1;
        });
        setOrders(res.data.data.orders);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getOrder();
  }, []);
  console.log(orders);
  return (
    <SafeAreaView
      className="flex-1 py-8"
      style={{ backgroundColor: "#121212" }}
    >
      <View className="items-center">
        <Text className="text-white text-2xl ">Your Previous Orders</Text>
      </View>
      <View
        style={{
          marginVertical: height(20),
          marginHorizontal: width(40),
          borderWidth: 2,
          borderColor: "white",
        }}
      ></View>
      <ScrollView>
        {orders.map((item) => {
          return (
            <View
              style={{
                elevation: 1.5,
              }}
              className="flex-row items-center bg-black p-3 rounded-3xl shadow-2xl shadow-black mb-3 mx-2"
            >
              <Image
                className="rounded-2xl"
                style={{ height: 120, width: 100 }}
                source={{
                  uri: `https://garvit.click/appbackend/Restaurant/${
                    r[item.resName]
                  }.jpg`,
                }}
              />
              <View className="flex flex-1 space-y-3">
                <View className="pl-3">
                  <Text className="text-xl text-white">{item.resName}</Text>
                  <Text className="text-gray-300">
                    Paid: {item.isPaid ? "Yes" : "No"}
                  </Text>
                  <Text className="text-gray-300">amoun : {item.amount}</Text>
                  <Text className="text-gray-300">
                    status:{" "}
                    {item.status === "Pending" ? "Not Delivered" : "Delivery"}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
