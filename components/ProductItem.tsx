import { Colors } from "@/constants/Colors";
import { imageUrl } from "@/helpers/BaseUrlHelper";
import ProductModel from "@/models/ProductModel";
import { useNavigation, useRouter } from "expo-router";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

interface ProductItemProps {
  item: ProductModel;
}

const ProductItem: React.FC<ProductItemProps> = ({ item }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => router.push({ pathname: `product/${item._id}` })}
    >
      <Image
        style={styles.itemImage}
        source={{ uri: imageUrl + item.thumbnail }}
      ></Image>
      <View style={styles.itemBody}>
        <View style={styles.itemNameContainer}>
          <Text style={styles.itemName} numberOfLines={3} ellipsizeMode="tail">
            {item.name}
          </Text>
        </View>
        <View style={styles.itemInfor}>
          <Text style={styles.itemPrice}>{item.price}</Text>
          <Text style={styles.itemSold}>Đã bán: {item.sold}</Text>
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
