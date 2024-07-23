import { Colors } from "@/constants/Colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faMinus } from "@fortawesome/free-solid-svg-icons/faMinus";
import Checkbox from "expo-checkbox";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";

const CartItem = () => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.cartItemCheckBoxContainer}>
        <Checkbox style={styles.checkbox}></Checkbox>
      </View>
      <View style={styles.cartItemImageContainer}>
        <Image
          style={styles.cartItemImage}
          source={require("../assets/images/th.jpg")}
        />
      </View>
      <View style={styles.cartItemInforContainer}>
        <View style={styles.cartItemNameContainer}>
          <Text style={styles.cartItemNameText}>Tên sản phẩm</Text>
        </View>
        <View style={styles.cartItemOrderContainer}>
          <View style={styles.cartItemPriceContainer}>
            <Text style={styles.cartItemPriceText}>Giá sản phẩm</Text>
          </View>
          <View style={styles.cartItemQuantityContainer}>
            <TouchableOpacity style={styles.cartItemButton}>
              <FontAwesomeIcon
                size={14}
                icon={faMinus}
                color={Colors.whiteColor}
              />
            </TouchableOpacity>
            <View style={styles.cartItemQuantityTextContainer}>
              <Text style={styles.cartItemQuantityText}>9</Text>
            </View>
            <TouchableOpacity style={styles.cartItemButton}>
              <FontAwesomeIcon
                size={14}
                icon={faPlus}
                color={Colors.whiteColor}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  checkbox:{
    borderWidth: 1
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
  cartItemCheckBoxContainer: {
    marginRight: 10,
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
