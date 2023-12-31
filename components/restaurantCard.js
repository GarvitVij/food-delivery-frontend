import { View, Text, TouchableWithoutFeedback, Image } from "react-native";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";

export default function RestaurantCard({ item }) {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("Restaurant", { ...item })}
    >
      <View
        className="mr-6 mb-1 bg-black rounded-3xl shadow-lg shadow-black"
        style={{
          elevation: 1.5,
          border: "10px solid #b8860b",
          borderColor: "#b8860b",
        }}
      >
        <Image
          className="h-36 w-64 rounded-t-3xl"
          source={{ uri: item.image }}
        />
        <View className="px-3 pb-4 space-y-2">
          <Text className="text-lg text-white font-bold pt-2">{item.name}</Text>
          <View className="flex-row items-center space-x-0.5">
            <Image
              source={require("../assets/star.png")}
              className="h-3.5 w-3.5"
            />
            <Text className="text-green-700">{item.stars}</Text>
            <Text className="text-gray-300">
              ({item.reviews} reviews){" "}
              <Text className="font-semibold">{item.category}</Text>
            </Text>
          </View>
          <View className="flex-row items-center space-x-1">
            <Icon.MapPin color="gray" width="15" height="15" />
            <Text className="text-gray-400 text-xs">Nearby {item.address}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
