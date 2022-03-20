import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { Inventory } from "../store/inventory";
import ProductImage from "./ProductImage";
import NewTag from "./NewTag";
import Tag from "./Tag";

type ProductItemProps = {
  inventoryRecord: Inventory;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F8F9FC",
    borderRadius: 4,
    marginBottom: 12,
    padding: 8
  },
  cardContent: {
    flexDirection: "row"
  },
  cardHeading: {
    flex: 1,
    marginRight: 12
  },
  date: {
    fontSize: 12
  },
  dataContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8
  },
  image: {
    marginRight: 20
  },
  tags: {
    alignItems: "flex-start",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    width: "100%"
  }
});

const formatDate = (date: string) => {
  if (!date) {
    return "-";
  }

  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();

  return `${day}.${month}.${year}`;
};

const isNewProduct = (date: string) => {
  const now = new Date();
  const productDate = new Date(date);
  const isNewPeriod = 7;
  const dayTime = 1000 * 60 * 60 * 24;

  const diffInTime = now.getTime() - productDate.getTime();
  const diffInDays = diffInTime / dayTime;

  return diffInDays < isNewPeriod;
};

const ProductItem = ({ inventoryRecord }: ProductItemProps) => {
  const { fields } = inventoryRecord;

  return (
    <Card style={styles.card}>
      <View style={styles.cardContent}>
        <ProductImage imgSrc={fields["Product Image"]} style={styles.image} />
        <View style={{ flex: 1 }}>
          <View style={styles.dataContent}>
            <View style={styles.cardHeading}>
              <Text style={styles.title} numberOfLines={1}>
                {fields["Product Name"] || "-"}
              </Text>
              <Text style={styles.date} numberOfLines={1}>
                {formatDate(fields.Posted)}
              </Text>
            </View>
            {isNewProduct(fields.Posted) && <NewTag />}
          </View>
          <View style={styles.tags}>
            {fields["Product Categories"]?.split(",").map((tag, index) => (
              <Tag key={index} text={tag} />
            ))}
          </View>
        </View>
      </View>
    </Card>
  );
};

export default ProductItem;
