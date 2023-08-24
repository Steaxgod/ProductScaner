import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { BarCodeScannerScreen } from "./BarCodeScannerScreen";
import ProductDetailScreen from "./ProductDetailScreen";
import ProgNav from "./Navigation";

import {
  DrawerActions,
  NavigationContainer,
  RouteProp,
  StackActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
    </View>
  );
}

function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <Text>Favorites Screen</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: any;

            if (route.name === "Scanner") {
              iconName = focused ? "ios-barcode" : "ios-barcode-outline";
            } else if (route.name === "Favorites") {
              iconName = focused ? "ios-heart" : "ios-heart-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Scanner" component={ProgNav} />
        <Tab.Screen name="Favorites" component={FavoritesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
