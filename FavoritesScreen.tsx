import React, { useContext } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { FavoritesContext } from "./FavoritesContext";

function FavoritesScreen() {
  const context = useContext(FavoritesContext);

  if (!context) {
    return null; // Можете вернуть пустой экран или ошибку
  }

  const { favorites, removeFromFavorites } = context;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites Screen</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text
              style={styles.removeButton}
              onPress={() => {
                console.log("Pressed remove for item:", item);
                removeFromFavorites(item.id);
              }}
            >
              Remove
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  productItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productTitle: {
    fontSize: 16,
  },
  removeButton: {
    color: "red",
  },
});

export default FavoritesScreen;
