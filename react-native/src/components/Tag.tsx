import React from "react";
import { StyleSheet, Text, View } from "react-native";

const MAX_TEXT_LENGTH = 8;

const styles = StyleSheet.create({
  tag: {
    alignItems: "center",
    backgroundColor: "#D5E6FF",
    borderRadius: 48,
    height: 26,
    justifyContent: "center",
    marginBottom: 6,
    marginRight: 4,
    paddingHorizontal: 8
  },
  text: {
    color: "#1B2633",
    fontSize: 12
  }
});

type TagProps = {
  text: string;
};

const Tag = ({ text }: TagProps) => (
  <View style={styles.tag}>
    <Text style={styles.text}>
      {text.length < MAX_TEXT_LENGTH
        ? `${text}`
        : `${text.substring(0, MAX_TEXT_LENGTH)}...`}
    </Text>
  </View>
);

export default Tag;
