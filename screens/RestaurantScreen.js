import { useNavigation, useRoute } from "@react-navigation/native";
import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import * as Icon from "react-native-feather";
import { themeColors } from "./../theme/index";
import DishRow from "../components/dishRow";
import CartIcon from "../components/cartIcon";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../slices/restaurantSlice";
import LottieView from "lottie-react-native";
import axios from "axios";

export default RestaurantScreen = () => {
  const [dishes, setDishes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { params } = useRoute();
  const navigation = useNavigation();
  let item = params;
  console.log(item);
  const dispatch = useDispatch();

  const getMenu = async () => {
    await axios
      .get(`https://garvit.click/appbackend/menu/${item.id}`)
      .then((res) => {
        console.log(res.data.data);
        const dishesModified = [];
        res.data.data.items.forEach((_i) => {
          dishesModified.push({
            id: _i.id,
            name: _i.name,
            description: _i.ingredients.join(" ,"),
            price: _i.price,
            image: {
              uri: `https://garvit.click/appbackend/food/${_i.name
                .split(" ")
                .join("_")
                .split("-")
                .join("_")}.jpg`,
            },
            rating: _i.rating,
            servingFor: _i.servingFor,
            type: _i.category,
          });
        });

        setDishes(dishesModified);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getMenu();
  }, []);

  useEffect(() => {
    if (item && item.id) {
      dispatch(setRestaurant({ ...item }));
    }
  }, []);

  return (
    <>
      <View>
        <CartIcon />
        <ScrollView>
          <View className="relative">
            <Image
              style={{ height: 300, width: "100%" }}
              source={{ uri: item.image }}
            />
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="absolute top-14 left-4 bg-gray-50 p-2 rounded-full shadow"
            >
              <Icon.ArrowLeft strokeWidth={3} stroke={"#121212"} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              backgroundColor: "#121212",
              borderColor: "#FFDF00",
              borderWidth: 2,
              borderBottomWidth: 0,
            }}
            className=" -mt-12 pt-6"
          >
            <View className="px-5">
              <Text className="text-3xl font-bold text-white">{item.name}</Text>
              <View className="flex-row items-center">
                <View className="pt-3 pb-5 space-y-2">
                  <View className="flex-row items-center space-x-0.5">
                    <Image
                      source={require("../assets/star.png")}
                      className="h-5 w-5"
                    />
                    <Text className="text-green-700 text-white">
                      {item.stars}
                    </Text>
                    <Text className="text-gray-300 -mt-0.5">
                      ({item.reviews} reviews){" "}
                      <Text className="font-semibold text-[16px]">
                        {item.category}
                      </Text>
                    </Text>
                  </View>
                  <View className="flex-row items-center space-x-1">
                    <Icon.MapPin color="gray" width="15" height="15" />
                    <Text className="text-gray-400 text-xs">
                      Nearby {item.address}
                    </Text>
                  </View>
                </View>
              </View>
              <Text className="text-gray-500">{item.description}</Text>
            </View>
          </View>
          <View
            className="pb-24 flex-1"
            style={{
              backgroundColor: "#121212",
              flex: 1,
              display: "flex",
              borderWidth: 2,
              borderColor: "#FFDF00",
              borderTopWidth: 0,
              borderBottomWidth: 0,
            }}
          >
            <Text className="px-4 py-4 text-2xl font-bold text-white">
              Menu
            </Text>

            {isLoading ? (
              <>
                <LottieView
                  source={require("../assets/lottie/loader2.json")}
                  autoPlay
                  loop
                  style={{ width: 400 }}
                />
              </>
            ) : (
              dishes.map((dish, index) => (
                <DishRow item={{ ...dish }} key={index} />
              ))
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );
};
