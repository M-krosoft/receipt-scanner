import React from "react";
import {
  Image,
  Button,
  View,
  Pressable,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useConvertedImage } from "./useConvertedImage";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";

export default function App() {
  const {
    scanDocument,
    deleteReceipt,
    convertImage,
    scannedReceipt,
    convertedImage,
    isLoading,
    isError,
  } = useConvertedImage();

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={["transparent", "pink"]}
        style={styles.background}
      />
      <StatusBar style="dark" />
      <View style={{ flex: 1, marginTop: 40 }}>
        <Button
          color={"pink"}
          disabled={isLoading}
          title="Skanuj paragon"
          onPress={scanDocument}
        ></Button>
        <View style={{ marginTop: 20 }}>
          <Button
            disabled={isLoading || !scannedReceipt}
            color="green"
            title="Wyslij paragony"
            onPress={convertImage}
          ></Button>
        </View>
        {isLoading && <Text>Ładowanie...</Text>}
        {scannedReceipt && (
          <Pressable
            style={{ marginTop: 10, marginLeft: 20 }}
            onPress={() => deleteReceipt()}
          >
            <Text style={{ fontSize: 40 }}>X</Text>
          </Pressable>
        )}
        <ScrollView style={{ padding: 20, flex: 1, flexDirection: "column" }}>
          {convertedImage && (
            <View style={{ flex: 1, flexDirection: "column" }}>
              <Text style={{ marginTop: 20, marginBottom: 10 }}>
                Przekonwertowany paragon:
              </Text>

              <Image
                resizeMode="contain"
                style={{ height: 300 }}
                source={{ uri: convertedImage }}
              />
            </View>
          )}

          {scannedReceipt && (
            <View
              style={{
                marginTop: 20,
                flexDirection: "column",
                padding: 15,
              }}
            >
              <Text style={{ marginTop: 20 }}>Zeskanowany paragon:</Text>
              <Image
                resizeMode="contain"
                style={{ height: 300 }}
                source={{ uri: scannedReceipt }}
              />
            </View>
          )}
          {isError && !isLoading && (
            <View>
              <Text>Wystapil blad, sprobuj ponownie</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    flex: 1,
    height: "100%",
  },
});
