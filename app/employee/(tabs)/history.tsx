import HistoryOrderItem from "@/components/HistoryOrderItem";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import QueryModel from "@/models/QueryModel";
import {
  AssignmentState,
  getAssigmentListAsync,
} from "@/stores/AssignmentSlice";
import { RootState } from "@/stores/Store";
import { useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";

const HistoryScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const assignmentState: AssignmentState = useAppSelector(
    (state: RootState) => state.assignment
  );

  const loadMoreProducts = () => {
    if (!assignmentState.pagination.isLastPage) {
      const queryParams: QueryModel = {
        page: assignmentState.pagination.currentPageNumber + 1,
        limit: assignmentState.pagination.offset,
        sortField: assignmentState.pagination.sortField,
        sortOrder: assignmentState.pagination.sortOrder,
      };
      dispatch(getAssigmentListAsync(queryParams));
    }
  };

  useEffect(() => {
    console.log(1);
    const queryParams: QueryModel = {
      page: assignmentState.pagination.currentPageNumber,
      limit: assignmentState.pagination.offset,
      sortField: assignmentState.pagination.sortField,
      sortOrder: assignmentState.pagination.sortOrder,
    };
    dispatch(getAssigmentListAsync(queryParams));
  }, [dispatch]);

  return (
    <FlatList
      data={assignmentState.list}
      renderItem={({ item }) => (
        <HistoryOrderItem item={item}></HistoryOrderItem>
      )}
      keyExtractor={(item) => item._id}
      showsVerticalScrollIndicator={false}
      onEndReached={loadMoreProducts}
      onEndReachedThreshold={0.1}
    ></FlatList>
  );
};

const styles = StyleSheet.create({});

export default HistoryScreen;
