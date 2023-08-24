import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { BarCodeScannerScreen } from "./BarCodeScannerScreen";
import ProductDetailScreen from "./ProductDetailScreen";
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

import FavoritesScreen from "./FavoritesScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function ProgNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="BarCodeScannerScreen"
        component={BarCodeScannerScreen}
      />
      <Stack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
      />
    </Stack.Navigator>
  );
}
