import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Linking } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";

export function BarCodeScannerScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(true);
  const [scannedData, setScannedData] = useState(""); // Добавлено состояние для сохранения сканированных данных

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const navigation = useNavigation<BarCodeScannerScreen>();
  useEffect(() => {
    const transfer = async (url: string) => {
      navigation.navigate("ProductDetailScreen", { productUrl: url });
    };
    transfer(
      "https://rn-products-1d8a6-default-rtdb.firebaseio.com/products/1.json"
    );
  }, []);

  // Fix hardcoded barcode. It's have to get the link by scan.
  // ust move this into handleBarCodeScanned
  //
  //   navigation.navigate("ProductDetailScreen", { productUrl: url });
  //

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannedData(data); // Сохраняем данные сканирования
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    // navigation.navigate("ProductDetailScreen", { productUrl: data.url });
  };

  const openScannedLink = () => {
    if (scannedData) {
      Linking.openURL(scannedData).catch(() => alert("Failed to open link"));
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        // onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        onBarCodeScanned={handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <View>
          <Button title={"Open Scanned Link"} onPress={openScannedLink} />
          <Button
            title={"Tap to Scan Again"}
            onPress={() => setScanned(false)}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
