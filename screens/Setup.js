import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { SCREEN_HEIGHT, height, width } from "../utils/responsive";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const SetupScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const routed = useRoute();
  console.log(routed);

  const login = async () => {
    if (name.length < 4) {
      Alert.alert("Invalid Input", "Name length should be 5 or more");
    } else {
      if (otp.length !== 6) {
        Alert.alert("Invalid Input", "OTP should be 6 digits");
      } else {
        await axios
          .post("https://garvit.click/appbackend/setup", {
            phone_number: routed.params.phoneNo,
            name: name,
            otp: otp,
          })
          .then(async (res) => {
            console.log(res.data);
            if (res.data.status) {
              await AsyncStorage.setItem(
                "accessToken",
                res.data.data.accessToken
              );
              navigation.navigate("Home");
            } else {
              Alert.alert("Error", res.data.message);
            }
          })
          .catch((err) => {
            Alert.alert("Error", res.data.message);
          });
      }
    }
  };

  return (
    <KeyboardAwareScrollView style={{ backgroundColor: "#121212" }}>
      <SafeAreaView
        className="flex-1 px-4 py-4"
        style={{
          backgroundColor: "#121212",
          height: SCREEN_HEIGHT + height(40),
        }}
      >
        <View className="my-4">
          <Text
            style={{
              fontWeight: "400",
              fontSize: 28,
              color: "#fff",
              marginBottom: height(40),
            }}
          >
            Customize your profile
          </Text>
          <View className="flex-1 items-center">
            <LottieView
              source={require("../assets/lottie/setup.json")}
              autoPlay
              loop
              style={{ width: width(350) }}
            />
            <TextInput
              className="w-full h-14 rounded-lg border-solid border-2 border-white "
              placeholderTextColor="white"
              placeholder="Enter your name"
              style={{
                backgroundColor: "#232323",
                paddingHorizontal: width(16),
                fontSize: height(16),
                marginBottom: height(16),
                color: "white",
              }}
              keyboardType="default"
              onChangeText={(e) => {
                setName(e);
              }}
            />

            <TextInput
              className="w-full h-14 rounded-lg border-solid border-2 border-white"
              placeholderTextColor="white"
              placeholder="Enter OTP"
              style={{
                backgroundColor: "#232323",
                paddingHorizontal: width(16),
                fontSize: height(16),
                color: "white",
              }}
              keyboardType="default"
              autoComplete="sms-otp"
              onChangeText={(e) => {
                setOtp(e);
              }}
            />
          </View>
        </View>
        <View className="flex-1 justify-end">
          <TouchableOpacity
            className="p-4 rounded text-center items-center"
            style={{
              marginTop: height(54),
              backgroundColor: "#ee4540",
              color: "white",
            }}
            onPress={() => {
              login();
            }}
          >
            <Text
              style={{
                fontWeight: "500",
                fontSize: 16,
                color: "white",
              }}
            >
              Let's get going
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default SetupScreen;
