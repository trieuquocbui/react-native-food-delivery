import CartItem from "@/components/CartItem";
import { Colors } from "@/constants/Colors";
import Checkbox from "expo-checkbox";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

const data = [
  { id: "1", name: "a" },
  { id: "2", name: "a" },
  { id: "3", name: "a" },
  { id: "4", name: "a" },
  { id: "5", name: "a" },
  { id: "6", name: "a" },
];

const CartScreen: React.FC = () => {
  return (
    <View style={styles.cart}>
      <View style={styles.itemList}>
        <FlatList
          data={data}
          renderItem={(item) => <CartItem></CartItem>}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        ></FlatList>
      </View>
      <View style={styles.buyItemContainer}>
        <View style={styles.checkboxContainer}>
          <Checkbox style={styles.checkbox}></Checkbox>
          <Text>Tất cả</Text>
        </View>
        <View style={styles.inforContainer}>
          <Text>Tổng tiền: 8021312</Text>
          <TouchableOpacity style={styles.btnBuy}>
            <Text style={styles.textWhite}>Mua hàng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
