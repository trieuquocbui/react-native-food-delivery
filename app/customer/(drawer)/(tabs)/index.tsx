import CategoryList from "@/components/CategoryList";
import ProductItem from "@/components/ProductItem";
import { Colors } from "@/constants/Colors";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import QueryModel from "@/models/QueryModel";
import {
  getProductListAsync,
  ProductState,
  setCategory,
} from "@/stores/ProductSlice";
import { RootState } from "@/stores/Store";
import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const HomeScreen: React.FC<string> = (search: string) => {
  const dispatch = useAppDispatch();

  const route = useRoute();

  const productState: ProductState = useAppSelector(
    (state: RootState) => state.product
  );

  const selectedCategory = (_id: string) => {
    dispatch(setCategory(_id));
  };

  const loadMoreProducts = () => {
    if (!productState.pagination.isLastPage) {
      const queryParams: QueryModel = {
        page: productState.pagination.currentPageNumber + 1,
        limit: productState.pagination.offset,
        sortField: productState.pagination.sortField,
        sortOrder: productState.pagination.sortOrder,
        category: productState.pagination.category,
        search: productState.pagination.searchQuery,
      };
      dispatch(getProductListAsync(queryParams));
    }
  };

  useEffect(() => {
    const queryParams: QueryModel = {
      page: productState.pagination.currentPageNumber,
      limit: productState.pagination.offset,
      sortField: productState.pagination.sortField,
      sortOrder: productState.pagination.sortOrder,
      category: productState.pagination.category,
      search: productState.pagination.searchQuery,
    };
    dispatch(getProductListAsync(queryParams));
  }, [dispatch, productState.pagination.category]);

  return (
    <FlatList
      style={styles.container}
      ListHeaderComponent={
        <>
          <View>
            <Text style={styles.title}>Danh mục sản phẩm</Text>
          </View>
          <CategoryList onSelectCategory={selectedCategory} />
          <View style={styles.mb6}>
            <Text style={styles.title}>Tất cả sản phẩm </Text>
          </View>
        </>
      }
      data={productState.list}
      renderItem={({ item }) => <ProductItem item={item}></ProductItem>}
      keyExtractor={(item) => item._id}
      numColumns={2}
      columnWrapperStyle={styles.row}
      showsVerticalScrollIndicator={false}
      onEndReached={loadMoreProducts}
      onEndReachedThreshold={0.1}
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
