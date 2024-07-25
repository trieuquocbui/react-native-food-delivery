import { Colors } from "@/constants/Colors";
import { imageUrl } from "@/helpers/BaseUrlHelper";
import CategoryModel from "@/models/CategoryModel";
import { StyleSheet, Text, Image, TouchableOpacity } from "react-native";

interface CategoryItemProps {
  item: CategoryModel;
  onSelectCategory: (_id: string) => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  item,
  onSelectCategory,
}) => {
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => onSelectCategory(item._id)}
    >
      <Image
        style={[styles.itemImage]}
        source={{ uri: imageUrl + item.thumbnail }}
      ></Image>
      <Text style={styles.itemText} numberOfLines={1} ellipsizeMode="tail">
        {item.name}
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
