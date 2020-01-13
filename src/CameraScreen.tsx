import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from 'expo-camera';
import * as Permissions from "expo-permissions"
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FAB } from "react-native-paper";
import { SafeAreaView, NavigationInjectedProps } from "react-navigation";
import { useDispatch } from "react-redux";
import { actions } from "./store/inventory";


export default (props: NavigationInjectedProps) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkPermissions = async() => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setHasCameraPermission(status === "granted" )
    }
    checkPermissions();
  }, []);

  if (hasCameraPermission === null) {
    return <View />;
  } else if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  } else {
    return (
      <Camera
        style={{ flex: 1 }}
        onBarCodeScanned={code => dispatch(actions.sendInventory(code.data, props.navigation.goBack))}
        barCodeScannerSettings={{
          barCodeTypes: [
            BarCodeScanner.Constants.BarCodeType.upc_a,
            BarCodeScanner.Constants.BarCodeType.upc_e,
            BarCodeScanner.Constants.BarCodeType.upc_ean,
            BarCodeScanner.Constants.BarCodeType.ean13,
            BarCodeScanner.Constants.BarCodeType.ean8
          ]
        }}
      >
        <View style={styles.fab}>
          <SafeAreaView>
            <FAB
              icon={() => (
                <MaterialCommunityIcons
                  name="close"
                  size={24}
                  color="#0B5549"
                />
              )}
              label="Close Camera"
              onPress={() => props.navigation.goBack()}
            />
          </SafeAreaView>
        </View>
      </Camera>
    );
  }
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flex: 1,
    alignItems: "center"
  }
});
