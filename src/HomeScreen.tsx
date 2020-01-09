import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { Appbar, DataTable, FAB } from "react-native-paper";
import {
  NavigationEvents,
  NavigationScreenProps,
  SafeAreaView
} from "react-navigation";
import config from "./config";

interface State {
  inventory: any[];
  refreshing: boolean;
}

export default class HomeScreen extends React.Component<
  NavigationScreenProps,
  State
> {
  state = { inventory: [], refreshing: false };

  fetchInventory() {
    this.setState({ refreshing: true });
    fetch(
      "https://api.airtable.com/v0/appJkRh9E7qNlXOav/Home?maxRecords=100&view=Grid%20view",
      {
        headers: {
          Authorization: config.Authorization
        }
      }
    )
      .then(response => response.json())
      .then(body => {
        console.info(body);
        this.setState({ inventory: body.records });
      })
      .finally(() => this.setState({ refreshing: false }));
  }

  public render() {
    return (
      <View style={{ flex: 1 }}>
        <NavigationEvents onWillFocus={() => this.fetchInventory()} />

        <Appbar.Header>
          <Appbar.Content title="Inventory" />
        </Appbar.Header>

        <ScrollView
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this.fetchInventory()}
            />
          }
        >
          <SafeAreaView>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Product Code</DataTable.Title>
                <DataTable.Title numeric>Quantity</DataTable.Title>
              </DataTable.Header>
              {this.state.inventory.map((record: any, index: number) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell>
                    {record.fields["Product Code"]}
                  </DataTable.Cell>
                  <DataTable.Cell numeric>
                    {new Date(record.fields.Posted).toLocaleDateString()}{" "}
                    {new Date(record.fields.Posted).toLocaleTimeString()}
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </SafeAreaView>
        </ScrollView>

        <SafeAreaView style={styles.fab}>
          <FAB
            icon={() => (
              <MaterialCommunityIcons
                name="barcode"
                size={24}
                color="#0B5549"
              />
            )}
            label="Scan Product"
            onPress={() => this.props.navigation.navigate("Camera")}
          />
        </SafeAreaView>
      </View>
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
