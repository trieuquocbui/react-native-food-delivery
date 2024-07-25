import { FlatList, StyleSheet } from "react-native";
import CategoryItem from "./CategoryItem";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { CategoryState, getAllCategoryAsync } from "@/stores/CategorySlice";
import { RootState } from "@/stores/Store";
import { useEffect } from "react";

interface CategoryListProps {
  onSelectCategory: (_id: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ onSelectCategory }) => {
  const dispatch = useAppDispatch();

  const categoryState: CategoryState = useAppSelector(
    (state: RootState) => state.category
  );

  useEffect(() => {
    dispatch(getAllCategoryAsync());
  }, [dispatch]);

  return (
    <FlatList
      data={categoryState.list}
      renderItem={({ item }) => (
        <CategoryItem
          item={item}
          onSelectCategory={onSelectCategory}
        ></CategoryItem>
      )}
      keyExtractor={(item) => item._id}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({});

export default CategoryList;
