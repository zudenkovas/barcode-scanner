import React from "react";
import { Image, StyleSheet, View, ViewStyle } from "react-native";

const styles = StyleSheet.create({
  imgWrapper: {
    alignItems: "center",
    height: 112,
    justifyContent: "center",
    width: 85
  },
  inventoryImg: { height: "100%", width: "100%" },
  placeholderImg: { height: 48, width: 48 }
});

type InventoryImageProps = {
  imgSrc?: string;
  style?: ViewStyle;
};

const ProductImage = ({ imgSrc, style }: InventoryImageProps) => {
  const imageSource = imgSrc
    ? { uri: imgSrc }
    : require("../static/images/img-placeholder.png");
  return (
    <View style={[styles.imgWrapper, style]}>
      <Image
        style={styles[imgSrc ? "inventoryImg" : "placeholderImg"]}
        source={imageSource}
      />
    </View>
  );
};

export default ProductImage;
