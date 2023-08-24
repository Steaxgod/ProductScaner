import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

type RouteParams = {
  params: { productUrl: any };
  productUrl: string;
};

type ProductData = {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: {
    count: number;
    rate: number;
  };
  title: string;
};

function ProductDetailScreen() {
  const route = useRoute<RouteParams>();
  const { productUrl } = route.params;

  const [productData, setProductData] = useState<null | ProductData>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(productUrl);
        const data = await response.json();
        setProductData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDetails();
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Text>SomeText</Text>,
      headerBackTitleVisible: false,
      headerBackTitleStyle: { backgrounColor: " black " },
    });
  });
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {productData && (
        <>
          <Image
            source={{ uri: productData.image }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.leftContent}>
            <Text style={styles.title}>{productData.title}</Text>
            <View style={styles.categoryContainer}>
              <Text style={styles.categoryText}>{productData.category}</Text>
            </View>
            <View style={styles.ratingContainer}>
              {Array.from({ length: 5 }).map((_, index) => (
                <Text key={index} style={styles.star}>
                  ★
                </Text>
              ))}
              <Text style={styles.ratingText}>
                {productData.rating.count} reviewers
              </Text>
            </View>
            <Text style={styles.price}>
              Price: ${productData.price.toFixed(2)}
            </Text>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.buttonAddToCart}
              onPress={() => console.log("Add To Cart pressed")}
            >
              <Text style={styles.buttonText}>Add To Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonBuyNow}
              onPress={() => console.log("Buy Now pressed")}
            >
              <Text style={styles.buttonText}>Buy Now</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
    marginBottom: 15,
  },
  leftContent: {
    flex: 1,
    marginRight: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  categoryContainer: {
    backgroundColor: "green",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    alignSelf: "flex-start", // Новое свойство
  },
  categoryText: {
    color: "white",
    fontSize: 20, // Увеличенный размер
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  star: {
    fontSize: 20,
    color: "black",
  },
  ratingText: {
    marginLeft: 5,
    color: "black",
    fontSize: 16,
  },
  price: {
    fontSize: 18,
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  buttonAddToCart: {
    backgroundColor: "purple",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonBuyNow: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProductDetailScreen;
