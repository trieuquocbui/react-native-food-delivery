import { Colors } from "@/constants/Colors";
import { useNavigation, useRouter } from "expo-router";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

const ProductItem: React.FC = () => {
  const router = useRouter();
  const a = 2;
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => router.push({ pathname: `product/${a}` })}
    >
      <Image
        style={styles.itemImage}
        source={require("../assets/images/th.jpg")}
      ></Image>
      <View style={styles.itemBody}>
        <View style={styles.itemNameContainer}>
          <Text style={styles.itemName} numberOfLines={3} ellipsizeMode="tail">
            Tên sản phẩm
          </Text>
        </View>
        <View style={styles.itemInfor}>
          <Text style={styles.itemPrice}>26.000</Text>
          <Text style={styles.itemSold}>Đã bán 100</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 0.5,
    marginHorizontal: 4,
    backgroundColor: Colors.whiteColor,
    borderRadius: 10,
    shadowColor: "#0d0d0d",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  itemImage: {
    width: "100%",
    height: 160,
  },
  itemBody: {
    padding: 6,
  },
  itemInfor: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemNameContainer: {
    flex: 1,
    height: 60,
  },
  itemName: {
    flex: 1,
  },
  itemPrice: {
    fontSize: 14,
    color: Colors.primaryBackground,
  },
  itemSold: {
    fontSize: 10,
  },
  itemText: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default ProductItem;
