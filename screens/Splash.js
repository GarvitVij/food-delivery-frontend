import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text } from "react-native";
import React from "react";

const Splash = ({ navigation }) => {
  const authCheck = async () => {
    const val = await AsyncStorage.getItem("accessToken");
    console.log(val);
    if (val) {
      navigation.navigate("Home");
    } else {
      navigation.navigate("Landing");
    }
  };

  useFocusEffect(() => {
    authCheck();
  });

  return <View></View>;
};

export default Splash;
