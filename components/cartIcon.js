import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "./../slices/cartSlice";

export default function CartIcon() {
  const navigation = useNavigation();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  if (!cartItems.length) return;

  const time = new Date().getHours();
  let line = "";
  if (time > 0 && time < 4) {
    line = "Conquer your midnight cravings now";
  } else if (time > 4 && time < 12) {
    line = "Breakfast delights delivered fresh";
  } else if (time > 12 && time < 16) {
    line = "Lunchtime flavors delivered hot";
  } else {
    line = "Dinner flavours delivered at doorstep";
  }

  return (
    <View className="absolute bottom-5 w-full z-50" style={{}}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Cart")}
        style={{
          backgroundColor: "#121212",
        }}
        className="flex-row justify-between items-center mx-5 rounded-full p-4 py-3 shadow-lg"
      >
        <View
          className="p-2 px-4 rounded-full"
          style={{ backgroundColor: "#ee4540" }}
        >
          <Text className="font-extrabold text-white text-lg">
            {cartItems.length}
          </Text>
        </View>
        <Text className="flex-1 text-center font-extrabold text-white text-lg">
          Complete My Meal
        </Text>
        <Text className="font-extrabold text-white text-lg">₹{cartTotal}</Text>
      </TouchableOpacity>
    </View>
  );
}
