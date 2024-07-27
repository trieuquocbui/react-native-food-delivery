import { View, Image, Text, StyleSheet } from "react-native";
import React from "react";
import CartDetailsModel from "@/models/CartDetailsModel";
import { imageUrl } from "@/helpers/BaseUrlHelper";

interface OrderItemProps {
  item: CartDetailsModel;
}

const OrderItem: React.FC<OrderItemProps> = ({ item }) => {
  return (
    <>
      <View style={styles.cartItemImageContainer}>
        <Image
          style={styles.cartItemImage}
          source={{ uri: imageUrl + item.product?.thumbnail }}
        />
      </View>
      <View style={styles.cartItemInforContainer}>
        <View style={styles.cartItemNameContainer}>
          <Text style={styles.cartItemNameText}>{item.product?.name}</Text>
        </View>
        <View style={styles.cartItemOrderContainer}>
          <View style={styles.cartItemPriceContainer}>
            <Text style={styles.cartItemPriceText}>{item.product?.price}</Text>
          </View>
          <View style={styles.cartItemQuantityContainer}>
            <Text style={styles.cartItemQuantityText}>x {item.quantity}</Text>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    borderWidth: 1,
  },
  cartItem: {
    margin: 4,
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cartItemImageContainer: {
    marginRight: 10,
  },
  cartItemImage: {
    width: 100,
    height: 100,
  },
  cartItemInforContainer: {
    flex: 1,
  },
  cartItemNameContainer: {
    flex: 1,
  },
  cartItemNameText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  cartItemOrderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cartItemPriceContainer: {
    marginRight: 10,
  },
  cartItemPriceText: {
    fontSize: 12,
  },
  cartItemQuantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cartItemQuantityTextContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  cartItemQuantityText: {
    fontSize: 12,
  },
});

export default OrderItem;
