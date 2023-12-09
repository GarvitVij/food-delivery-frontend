import React, { useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
} from "react-native";
import LottieView from "lottie-react-native";

const { width, height } = Dimensions.get("screen");

const DATA = [
  {
    key: 1,
    title: "Explore 🌟",
    description:
      "Explore a diverse menu showcasing delectable dishes from local eateries. Whether you crave Italian favorites or crave exotic Asian delights, there's something to satisfy every palate. Let the culinary journey begin!",
    image: (
      <LottieView
        source={require("../assets/lottie/1.json")}
        autoPlay
        loop
        style={{ width: 450 }}
      />
    ),
    style: {
      width: width,
      height: height,
      resizeMode: "contain",
    },
    textStyle: {
      color: "#FFF",
    },
  },
  {
    key: 2,
    title: "Smooth Ordering 📝",
    description:
      "Easily tailor your order to perfection. Pile on extra toppings, make specific requests, and pick your ideal delivery time hassle-free. Our user-friendly app guarantees your meal is crafted to your exact liking.",
    image: (
      <LottieView
        source={require("../assets/lottie/2.json")}
        autoPlay
        loop
        style={{ width: 450 }}
      />
    ),
    style: {
      width: width,
      height: height,
      resizeMode: "contain",
    },
    textStyle: {
      color: "#FFF",
    },
  },
  {
    key: 3,
    title: "Quick Delivery 🚀",
    description:
      "Feeling hungry? No problem! Count on our prompt and dependable delivery service. Monitor your order in real-time, receiving updates at every stage, ensuring you're informed about the precise arrival time of your delicious meal.",
    image: (
      <LottieView
        source={require("../assets/lottie/3.json")}
        autoPlay
        loop
        style={{ width: 450 }}
      />
    ),
    style: {
      width: width,
      height: height,
      resizeMode: "contain",
    },
    textStyle: {
      color: "#FFF",
    },
  },
];

const bgs = ["#121212", "#121212", "#121212"];

const Indicator = ({ scrollX }) => {
  return (
    <View style={{ flexDirection: "row", bottom: 100, position: "absolute" }}>
      {DATA.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.4, 0.8],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            key={`indicator-${i}`}
            style={{
              height: 7,
              width: 7,
              backgroundColor: "white",
              borderRadius: 5,
              margin: 10,
              transform: [{ scale }],
            }}
          />
        );
      })}
    </View>
  );
};

const BackDrop = ({ scrollX }) => {
  const backgroundColor = scrollX.interpolate({
    inputRange: bgs.map((_, i) => i * width),
    outputRange: bgs.map((_, i) => _),
  });
  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        {
          backgroundColor,
        },
      ]}
    />
  );
};

function LandingScreen({ navigation }) {
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <BackDrop scrollX={scrollX} />
      <Animated.FlatList
        data={DATA}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={32}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => {
          return (
            <View style={{ width, alignItems: "center", padding: 20 }}>
              <View style={{ flex: 0.7, justifyContent: "center" }}>
                {item.image}
              </View>
              <View style={{ flex: 0.3 }}>
                <Text
                  style={{
                    fontWeight: "800",
                    fontSize: 38,
                    paddingBottom: 10,
                    ...item.textStyle,
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    fontWeight: "400",
                    ...item.textStyle,
                    color: "#D3D3D3",
                  }}
                >
                  {item.description}
                </Text>
              </View>
            </View>
          );
        }}
      />
      <Indicator scrollX={scrollX} />

      <TouchableOpacity
        style={{
          backgroundColor: "#ee4540",
          height: 50,
          width: 300,
          borderRadius: 10,
          bottom: 25,
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={{ fontWeight: "800", color: "white" }}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LandingScreen;
