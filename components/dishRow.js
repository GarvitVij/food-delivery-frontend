import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import * as Icon from "react-native-feather";
import { themeColors } from "./../theme/index";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  selectCartItemsById,
} from "../slices/cartSlice";

export default function DishRow({ item }) {
  const dispatch = useDispatch();
  const totalItems = useSelector((state) =>
    selectCartItemsById(state, item.id)
  );

  const handleIncrease = () => {
    dispatch(addToCart({ ...item }));
  };
  const handleDecrease = () => {
    dispatch(removeFromCart({ id: item.id }));
  };

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
        source={item.image}
      />
      <View className="flex flex-1 space-y-3">
        <View className="pl-3">
          <Text className="text-xl text-white">{item.name}</Text>
          <Text className="text-gray-300">Ingredients: {item.description}</Text>
          <Text className="text-gray-300">Surve for : {item.servingFor}</Text>
          <Text className="text-gray-300">Cuisine Type: {item.type}</Text>
          <View className="flex-row justify-between items-center">
            <Text className=" text-lg font-bold" style={{ color: "#ee4540" }}>
              ₹{item.price}
            </Text>
            <View className="flex-row items-center">
              <TouchableOpacity
                onPress={handleDecrease}
                disabled={!totalItems.length}
                className="p-1 rounded-full"
                style={{ backgroundColor: themeColors.bgColor(1) }}
              >
                <Icon.Minus
                  strokeWidth={2}
                  height={20}
                  width={20}
                  stroke={"white"}
                />
              </TouchableOpacity>
              <Text className="px-3 text-white">{totalItems.length}</Text>
              <TouchableOpacity
                onPress={handleIncrease}
                className="p-1 rounded-full"
                style={{ backgroundColor: themeColors.bgColor(1) }}
              >
                <Icon.Plus
                  strokeWidth={2}
                  height={20}
                  width={20}
                  stroke={"white"}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
