import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  BackHandler,
} from "react-native";
import { featured } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../slices/restaurantSlice";
import { emptyCart } from "../slices/cartSlice";
import openMap, { createMapLink } from "react-native-open-maps";
import { useEffect } from "react";

export default function DeliveryScreen() {
  const restaurant = useSelector(selectRestaurant);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const cancelOrder = () => {
    navigation.navigate("Home");
    dispatch(emptyCart());
  };

  useEffect(() => {
    const backAction = () => {
      console.log("here");
      navigation.navigate("Home");
      dispatch(emptyCart());
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const openTracking = () => {
    try {
      openMap({
        provider: "google",
        travelType: "drive",
        start: "Netaji subhash place metro station, delhi, india",
        end: "Guru teg bahadur institute of technology, rajouri garden",
        navigate: true,
        mapType: "standard",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View className="flex-1">
      {/* Map View  */}
      <View className="flex-1 bg-black items-center justify-center">
        <TouchableOpacity
          className="bg-white px-6 py-6 rounded-xl"
          onPress={openTracking}
        >
          <Text className="font-bold">Open Tracking</Text>
        </TouchableOpacity>
      </View>
      <View className="rounded-t-3xl -mt-12 bg-white relative">
        <View className="flex-row justify-between px-5 pt-8">
          <View>
            <Text className="text-lg text-gray-700 font-semibold">
              Estimated Arrival
            </Text>
            <Text className="text-3xl font-extrabold text-gray-700">
              Will be visible on Map
            </Text>
            <Text className="mt-3 mb-4 text-gray-700 font-semibold">
              Your order is on the way!
            </Text>
          </View>
        </View>
        <View
          style={{ backgroundColor: themeColors.bgColor(0.8) }}
          className="p-2 flex-row justify-between items-center rounded-full my-5 mx-2"
        >
          <View
            className="p-1 rounded-full"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}
          >
            <Image
              className="h-12 w-12 rounded-full"
              source={require("../assets/delivery-guy.jpg")}
            />
          </View>
          <View className="flex-1 ml-2">
            <Text className="text-lg font-bold text-white">John Doe</Text>
            <Text className="font-bold text-white">Your Rider</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
