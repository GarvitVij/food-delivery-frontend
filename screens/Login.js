import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  TextInput,
  Image,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { height, width } from "../utils/responsive";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const LoginScreen = ({ navigation }) => {
  const [phoneNo, setPhoneNo] = useState("");

  const loginFn = async () => {
    console.log(phoneNo.length);
    if (phoneNo.length !== 10) {
      Alert.alert("Invalid Input", "Mobile number should be exact 10 digits");
    } else {
      await axios
        .post("https://garvit.click/appbackend/send-otp", {
          phone_number: parseInt(phoneNo),
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.status) {
            navigation.navigate("Setup", { phoneNo });
          } else {
            Alert.alert("Error", res.data.message);
          }
        })
        .catch((err) => {
          Alert.alert("Error", res.data.message);
        });
    }
  };
  return (
    <KeyboardAwareScrollView>
      <SafeAreaView className="flex-1" style={{ backgroundColor: "#121212" }}>
        <View className="w-100 justify-center">
          <View className="basis-2/3 bg-white">
            <Image
              source={require("../assets/home.jpg")}
              className="object-fit"
              style={{ height: height(610) }}
            />
          </View>
          <View className="basis-1/3 my-4 mx-4 ">
            <Text
              style={{
                fontWeight: "500",
                fontSize: 38,
                paddingBottom: 10,
                color: "#fff",
              }}
            >
              Login
            </Text>
            <Text style={{ color: "#f9f9f9", marginBottom: height(12) }}>
              Please enter your mobile number
            </Text>
            <TextInput
              className="w-90 h-14 rounded-lg border-solid border-2 border-white"
              style={{
                backgroundColor: "#232323",
                paddingHorizontal: width(16),
                fontSize: height(24),

                color: "white",
              }}
              keyboardType="numeric"
              onChangeText={(e) => {
                setPhoneNo(e);
              }}
            />
            <TouchableOpacity
              className="p-4 rounded text-center items-center"
              style={{ marginTop: height(54), backgroundColor: "#ee4540" }}
              onPress={loginFn}
            >
              <Text
                style={{
                  fontWeight: "500",
                  fontSize: 16,
                  color: "white",
                }}
              >
                Send OTP
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;
