import { FlatList, StyleSheet } from "react-native";
import CategoryItem from "./CategoryItem";

const data = [
  { id: "1", title: "Tất cả" },
  { id: "2", title: "Bánh mì" },
  { id: "3", title: "Cơm trưa" },
  { id: "4", title: "Hủ tiếu" },
  { id: "5", title: "Item 5" },
  { id: "6", title: "Item 6" },
];

const CategoryList: React.FC = () => {
  return (
    <FlatList
      data={data}
      renderItem={({ item, index }) => (
        <CategoryItem
          item={item}
          index={index}
          length={data.length}
        ></CategoryItem>
      )}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({});

export default CategoryList;
