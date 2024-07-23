import CategoryList from "@/components/CategoryList";
import ProductItem from "@/components/ProductItem";
import { Colors } from "@/constants/Colors";
import { FlatList, StyleSheet, Text, View } from "react-native";

const data = [
  { id: "1", title: "Tất cả" },
  { id: "2", title: "Bánh mì" },
  { id: "3", title: "Cơm trưa" },
  { id: "4", title: "Hủ tiếu" },
  { id: "5", title: "Item 5" },
  { id: "6", title: "Item 6" },
  { id: "7", title: "Tất cả" },
  { id: "8", title: "Bánh mì" },
  { id: "8", title: "Cơm trưa" },
  { id: "9", title: "Hủ tiếu" },
  { id: "10", title: "Item 5" },
];

const HomeScreen: React.FC = () => {
  return (
    <FlatList
      style={styles.container}
      ListHeaderComponent={
        <>
          <View>
            <Text style={styles.title}>Danh mục sản phẩm</Text>
          </View>
          <CategoryList />
          <View style={styles.mb6}>
            <Text style={styles.title}>Tất cả sản phẩm</Text>
          </View>
        </>
      }
      data={data}
      renderItem={({ item }) => <ProductItem></ProductItem>}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={styles.row}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    backgroundColor: Colors.whiteBackground,
  },
  mb6: {
    marginBottom: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: "thin",
    color: Colors.primaryBackground,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 8,
  },
});

export default HomeScreen;
