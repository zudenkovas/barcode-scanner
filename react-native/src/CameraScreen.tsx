import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";
import { Camera } from "expo-camera";
import { BarCodeScanner } from "expo-barcode-scanner";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FAB } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { actions } from "./store/inventory";


export default (props: StackScreenProps<{}>) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkPermissions = async() => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted" )
    }
    checkPermissions();
  }, []);

  if (hasPermission === null) {
    return <View />;
  } else if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  } else {
    return (
      <Camera
        style={{ flex: 1 }}
        onBarCodeScanned={code => dispatch(actions.sendInventory(code.data, () => props.navigation.goBack()))}
        // barCodeTypes={[
        //     BarCodeScanner.Constants.BarCodeType.upc_a,
        //     BarCodeScanner.Constants.BarCodeType.upc_e,
        //     BarCodeScanner.Constants.BarCodeType.upc_ean,
        //     BarCodeScanner.Constants.BarCodeType.ean13,
        //     BarCodeScanner.Constants.BarCodeType.ean8
        //   ]
        // }
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
    bottom: 16,
    width: "100%",
    flex: 1,
    alignItems: "center"
  }
});
