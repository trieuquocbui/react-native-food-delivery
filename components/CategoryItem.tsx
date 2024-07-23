import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, Image, TouchableOpacity } from "react-native";

const CategoryItem: React.FC<{
  item: any;
  index: number;
  length: number;
}> = ({ item }) => {
  return (
    <TouchableOpacity style={styles.itemContainer}>
      <Image
        style={[styles.itemImage]}
        source={require("../assets/images/th.jpg")}
      ></Image>
      <Text style={styles.itemText} numberOfLines={1} ellipsizeMode="tail">
        {item.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    margin: 4,
    alignItems: "center",
    backgroundColor: Colors.whiteBackground,
    borderRadius: 10,
    shadowColor: "#red",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  itemText: {
    fontSize: 12,
    textAlign: "center",
  },
});

export default CategoryItem;
