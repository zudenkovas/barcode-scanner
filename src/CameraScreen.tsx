import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from 'expo-camera';
import * as Permissions from "expo-permissions"
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FAB } from "react-native-paper";
import { SafeAreaView } from "react-navigation";
import config from "./config";
import { NavigationStackScreenProps } from "react-navigation-stack";

interface State {
  hasCameraPermission: boolean | null;
  sending: boolean;
}

export default class CameraScreen extends React.Component<
  NavigationStackScreenProps,
  State
> {
  state = {
    hasCameraPermission: null,
    sending: false
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  sendInventory(data: string) {
    if (this.state.sending) {
      return;
    }

    this.setState({ sending: true });
    fetch(
      "https://api.airtable.com/v0/appJkRh9E7qNlXOav/Home?maxRecords=100&view=Grid%20view",
      {
        method: "POST",
        headers: {
          Authorization: config.Authorization,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fields: {
            "Product Code": data
          }
        })
      }
    )
      .then(response => response.json())
      .then(body => {
        console.info(body);
        this.props.navigation.goBack();
      })
      .finally(() => this.setState({ sending: false }));
  }

  public render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <Camera
          style={{ flex: 1 }}
          onBarCodeScanned={code => this.sendInventory(code.data)}
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
                onPress={() => this.props.navigation.goBack()}
              />
            </SafeAreaView>
          </View>
        </Camera>
      );
    }
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
