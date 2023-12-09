import {
  TextInput,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Icon from "react-native-feather";
import { featured } from "../constants";
import FeaturedRow from "../components/featuredRow";
import { useEffect, useState } from "react";
import axios from "axios";
import LottieView from "lottie-react-native";

const HomeScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [resList, setResList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getHome = async () => {
    await axios
      .get("https://garvit.click/appbackend/home")
      .then((res) => {
        const bestInClass = {
          id: 1,
          title: "Best in Class",
          description: "OFF Upto ₹100",
          restaurants: [],
        };
        res.data.data.bestRated.map((r) => {
          bestInClass.restaurants.push({
            id: r.id,
            reviews: r.numberOfRatings,
            category: `₹${r.avgPrice} For One`,
            stars: r.rating,
            address: r.address,
            name: r.name,
            image: `https://garvit.click/appbackend/Restaurant/${r.image}.jpg`,
            off: "40:80",
          });
        });
        const mostAuthentic = {
          id: 2,
          title: "Most Authentic",
          description: "OFF Upto 120",
          restaurants: [],
        };
        res.data.data.mostExpensive.map((r) => {
          mostAuthentic.restaurants.push({
            id: r.id,
            reviews: r.numberOfRatings,
            category: `₹${r.avgPrice} For One`,
            stars: r.rating,
            address: r.address,
            name: r.name,
            image: `https://garvit.click/appbackend/Restaurant/${r.image}.jpg`,
            off: "60:90",
          });
        });
        const topPicks = {
          id: 3,
          title: "Tops Picks for today",
          description: " OFF Upto 50",
          restaurants: [],
        };
        res.data.data.remaining.map((r) => {
          topPicks.restaurants.push({
            id: r.id,
            reviews: r.numberOfRatings,
            category: `₹${r.avgPrice} For One`,
            stars: r.rating,
            address: r.address,
            name: r.name,
            image: `https://garvit.click/appbackend/Restaurant/${r.image}.jpg`,
            off: "30:40",
          });
        });
        setResList([bestInClass, mostAuthentic, topPicks]);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getHome();
  }, []);

  const filteredRestaurants = resList.filter(
    (item) =>
      item.restaurants.filter(
        (res) => res.name.toUpperCase().indexOf(search.toUpperCase()) > -1
      ).length > 0
  );

  return (
    <SafeAreaView style={{ backgroundColor: "#121212", flex: 1 }}>
      {/* Search Bar  */}
      <View className="flex-row items-center space-x-2 p-4">
        <View
          className="flex-row flex-1 items-center p-3 rounded-full border "
          style={{ borderColor: "#b8860b" }}
        >
          <Icon.Search height="25" width="25" stroke="white" />
          <TextInput
            placeholder="Search Restaurant"
            value={search}
            onChangeText={(text) => setSearch(text)}
            placeholderTextColor={"white"}
            className="ml-2 flex-1 text-white"
          />
          {/* <View className="flex-row items-center space-x-1 border-x-1 border-0 border-l-2 pl-2 border-l-white">
            <Icon.MapPin height="20" width="20" stroke="white" />
            <Text className="text-white">Gurgaon</Text>
          </View> */}
        </View>
        <TouchableOpacity
          style={{ backgroundColor: "#ee4540" }}
          className="p-3 rounded-full"
          onPress={() => navigation.navigate("Profile")}
        >
          <Icon.Sliders
            height="20"
            width="20"
            strokeWidth={2.5}
            stroke="white"
          />
        </TouchableOpacity>
      </View>

      {/* Main Area  */}
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
      >
        {isLoading ? (
          <>
            <LottieView
              source={require("../assets/lottie/loader.json")}
              autoPlay
              loop
              style={{ width: 500 }}
            />
            <LottieView
              source={require("../assets/lottie/loader.json")}
              autoPlay
              loop
              style={{ width: 500 }}
            />
            <LottieView
              source={require("../assets/lottie/loader.json")}
              autoPlay
              loop
              style={{ width: 500 }}
            />
          </>
        ) : (
          <View className="mt-5 mb-20">
            {filteredRestaurants.map((item, index) => {
              return (
                <FeaturedRow
                  key={index}
                  title={item.title}
                  description={item.description}
                  restaurants={item.restaurants}
                  search={search}
                />
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
