
import CartItem from "@/components/CartItem";
import { Colors } from "@/constants/Colors";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  CartDetailsState,
  editQuantityCartDetailsAsync,
  getCartDetailsListAsync,
  setAllChecked,
  setChecked,
} from "@/stores/CartDetailsSlice";
import { RootState } from "@/stores/Store";
import Checkbox from "expo-checkbox";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

const CartScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const cartDetailsState: CartDetailsState = useAppSelector(
    (state: RootState) => state.cart
  );

  const handleCheckboxToggle = (index: number) => {
    dispatch(setChecked(index));
  };

  const handleToggleAll = () => {
    dispatch(setAllChecked(!cartDetailsState.Allchecked));
  };

  const handleQuantity = (_id: string, quantity: number) => {
    dispatch(editQuantityCartDetailsAsync(_id, quantity));
  };

  useEffect(() => {
    dispatch(getCartDetailsListAsync());
  }, [dispatch]);

  return (
    <View style={styles.cart}>
      <View style={styles.itemList}>
        <FlatList
          data={cartDetailsState.list}
          renderItem={({ item, index }) => (
            <View style={styles.cartItem}>
              <View style={styles.cartItemCheckBoxContainer}>
                <Checkbox
                  style={styles.checkbox}
                  value={item.checked}
                  onValueChange={() => handleCheckboxToggle(index)}
                />
              </View>
              <CartItem item={item} handleQuantity={handleQuantity}></CartItem>
            </View>
          )}
          keyExtractor={(item) => item._id!}
          showsVerticalScrollIndicator={false}
        ></FlatList>
      </View>
      <View style={styles.buyItemContainer}>
        <View style={styles.checkboxContainer}>
          <Checkbox
            style={styles.checkbox}
            value={cartDetailsState.Allchecked}
            onValueChange={handleToggleAll}
          ></Checkbox>
          <Text>Tất cả</Text>
        </View>
        <View style={styles.inforContainer}>
          <Text>Tổng tiền: {cartDetailsState.total}</Text>
          <TouchableOpacity style={styles.btnBuy}>
            <Text style={styles.textWhite}>Mua hàng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItemCheckBoxContainer: {
    marginRight: 10,
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
  textWhite: {
    color: Colors.whiteColor,
  },
  cart: {
    flex: 1,
  },
  itemList: {
    height: "92%",
  },
  buyItemContainer: {
    height: "18%",
    flex: 1,
    backgroundColor: Colors.whiteColor,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  checkboxContainer: {
    marginLeft: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    backgroundColor: Colors.whiteBackground,
    borderWidth: 1,
    marginRight: 4,
  },
  inforContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  btnBuy: {
    paddingHorizontal: 20,
    marginLeft: 6,
    backgroundColor: Colors.primaryBackground,
    height: "100%",
    justifyContent: "center",
  },
});

export default CartScreen;
