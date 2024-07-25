import { Colors } from "@/constants/Colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faMinus } from "@fortawesome/free-solid-svg-icons/faMinus";
import Checkbox from "expo-checkbox";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import CartDetailsModel from "@/models/CartDetailsModel";
import { imageUrl } from "@/helpers/BaseUrlHelper";

interface CartDetailsProps {
  item: CartDetailsModel;
  handleQuantity: (_id: string, quantity: number) => void;
}

const CartItem: React.FC<CartDetailsProps> = ({ item, handleQuantity }) => {
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
            <TouchableOpacity
              style={styles.cartItemButton}
              onPress={() => handleQuantity(item._id!, -1)}
            >
              <FontAwesomeIcon
                size={14}
                icon={faMinus}
                color={Colors.whiteColor}
              />
            </TouchableOpacity>
            <View style={styles.cartItemQuantityTextContainer}>
              <Text style={styles.cartItemQuantityText}>{item.quantity}</Text>
            </View>
            <TouchableOpacity
              style={styles.cartItemButton}
              onPress={() => handleQuantity(item._id!, 1)}
            >
              <FontAwesomeIcon
                size={14}
                icon={faPlus}
                color={Colors.whiteColor}
              />
            </TouchableOpacity>
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
  cartItemButton: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: Colors.primaryBackground,
    marginHorizontal: 5,
  },
  cartItemQuantityTextContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  cartItemQuantityText: {
    fontSize: 12,
  },
});

export default CartItem;
