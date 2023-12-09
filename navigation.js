import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import RestaurantScreen from "./screens/RestaurantScreen";
import CartScreen from "./screens/CartScreen";
import { NavigationContainer } from "@react-navigation/native";
import OrderPreparing from "./screens/OrderPreparing";
import DeliveryScreen from "./screens/DeliveryScreen";
import LandingScreen from "./screens/LandingScreen";
import LoginScreen from "./screens/Login";
import SetupScreen from "./screens/Setup";
import SplashScreen from "./screens/Splash";
import ProfileScreen from "./screens/ProfileScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Splash"
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Setup" component={SetupScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Restaurant" component={RestaurantScreen} />
        <Stack.Screen
          name="Cart"
          options={{ presentation: "modal" }}
          component={CartScreen}
        />
        <Stack.Screen
          name="OrderPreparing"
          options={{ presentation: "fullScreenModal" }}
          component={OrderPreparing}
        />
        <Stack.Screen
          name="Delivery"
          options={{ presentation: "fullScreenModal" }}
          component={DeliveryScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
