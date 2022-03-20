import React from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  tag: {
    alignItems: "center",
    backgroundColor: "#333333",
    borderRadius: 9,
    borderTopRightRadius: 0,
    height: 34,
    justifyContent: "center",
    width: 53
  },
  text: {
    color: "#FFFFFF",
    fontSize: 12
  }
});

const TEXT = {
  NEW: "NEW"
};

const NewTag = () => (
  <View style={styles.tag}>
    <Text style={styles.text}>{TEXT.NEW}</Text>
  </View>
);

export default NewTag;
