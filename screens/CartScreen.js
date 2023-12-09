import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { featured } from "../constants";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../slices/restaurantSlice";
import { StackActions } from "@react-navigation/native";
import {
  removeFromCart,
  selectCartItems,
  selectCartTotal,
} from "../slices/cartSlice";
import RazorpayCheckout from "react-native-razorpay";
import { height } from "../utils/responsive";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function CartScreen() {
  const restaurant = useSelector(selectRestaurant);
  const navigation = useNavigation();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const [groupedItems, setGroupedItems] = useState([]);
  const [location, setLocation] = useState(null);
  const deliveryFee = 50;
  const dispatch = useDispatch();

  if (cartItems.length === 0) {
    navigation.pop(1);
  }

  let discount = restaurant.off.split(":");
  let off = generateRandomNumber(parseInt(discount[0]), parseInt(discount[1]));

  const razorpay = async () => {
    const token = await AsyncStorage.getItem("accessToken");
    await axios
      .post(
        "https://garvit.click/appbackend/createOrder",
        {
          items: cartItems.map((item) => item.id),
          off: off,
          resName: restaurant.name,
          homeLoc: "GTBIT",
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        const orderData = res.data.total;
        var options = {
          description: "Food Order",
          image: "",
          currency: "INR",
          key: "rzp_test_xTVgtUPz5DCtsk", // Your api key,
          order_id: orderData?.idToPay,
          amount: orderData.totalPrice * 100,
          theme: { color: "#121212" },
        };
        RazorpayCheckout.open(options)
          .then((data) => {
            // handle success
            alert(`Success: ${data.razorpay_payment_id}`);
            navigation.navigate("OrderPreparing");
          })
          .catch((error) => {
            // handle failure
            alert(`Error: ${error.code} | ${error.description}`);
          });
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Something went wrong", "Error while generating order");
      });
  };

  useEffect(() => {
    const items = cartItems.reduce((group, item) => {
      if (group[item.id]) {
        group[item.id].push(item);
      } else {
        group[item.id] = [item];
      }
      return group;
    }, {});
    setGroupedItems(items);
  }, [cartItems]);

  let cartTotalWithdiscount = cartTotal - off;
  const gst = (18 / 100) * cartTotalWithdiscount;
  cartTotalWithdiscount = cartTotalWithdiscount + gst;

  return (
    <>
      <View
        className=" flex-1"
        style={{ backgroundColor: "#121212", marginTop: height(16) }}
      >
        <View className="relative pt-12 pb-8 shadow-sm">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ backgroundColor: "#ee4540" }}
            className="absolute z-10 rounded-full p-1 shadow top-12 left-4"
          >
            <Icon.ArrowLeft strokeWidth={3} stroke="white" />
          </TouchableOpacity>
          <View>
            <Text className="text-center font-bold text-xl text-white">
              Your Meal
            </Text>
            <Text className="text-center text-white">{restaurant.name}</Text>
          </View>
        </View>

        <View
          style={{ backgroundColor: themeColors.bgColor(0.1) }}
          className="flex-row px-4 py-4 items-center"
        >
          <Image
            source={require("../assets/delivery-boy.png")}
            className="h-14 w-14"
          />
          <Text className="flex-1 pl-2 font-bold text-white">
            Delivery estimate will be displayed once order is placed
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 50 }}
          className="pt-5"
          style={{ backgroundColor: "#121212" }}
        >
          {Object.entries(groupedItems).map(([key, items]) => {
            return (
              <View
                key={key}
                className="flex-row items-center space-x-3 py-3 px-4  rounded-3xl mx-4 mb-3 shadow-md shadow-black"
                style={{
                  backgroundColor: "black",
                  elevation: 1.5,
                }}
              >
                <Text className="font-bold text-white">{items.length} x</Text>
                <Image
                  className="h-14 w-14 rounded-full"
                  source={items[0]?.image}
                />
                <Text className="flex-1 font-bold text-gray-200">
                  {items[0]?.name}
                </Text>
                <Text className="font-semibold text-base text-white">
                  ₹{items[0]?.price}
                </Text>
                <TouchableOpacity
                  onPress={() => dispatch(removeFromCart({ id: items[0]?.id }))}
                  className="p-1 rounded-full"
                  style={{ backgroundColor: "#ee4540" }}
                >
                  <Icon.Minus
                    strokeWidth={2}
                    height={20}
                    width={20}
                    stroke="white"
                  />
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>

        <View
          style={{ backgroundColor: "black" }}
          className="p-6 px-8 rounded-t-3xl space-y-4"
        >
          <View className="flex-row justify-between">
            <Text className="text-white">Subtotal</Text>
            <Text className="text-white">₹{cartTotal}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-white">Delivery Fee</Text>
            <Text className="text-white">₹{deliveryFee}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-white">Off</Text>
            <Text className="text-white">₹{off}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-white font-extrabold">
              Order Total ,incl GST
            </Text>
            <Text className="text-white font-extrabold">
              ₹{(deliveryFee + cartTotalWithdiscount).toFixed(2)}
            </Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => razorpay()}
              style={{ backgroundColor: "#ee4540" }}
              className="p-3 rounded-full"
            >
              <Text className="text-white text-center font-bold text-lg">
                Place Order
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}
