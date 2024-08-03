import React, { useCallback, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import QueryModel from "@/models/QueryModel";
import {
  AssignmentState,
  getAssigmentListAsync,
  setAssigmentList,
  setPagination,
} from "@/stores/AssignmentSlice";
import { RootState } from "@/stores/Store";
import { useFocusEffect } from "@react-navigation/native";
import HistoryAssignmentItem from "@/components/HistoryAssignmentItem";

const HistoryScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const assignmentState: AssignmentState = useAppSelector(
    (state: RootState) => state.assignment
  );

  const loadInitialData = () => {
    const queryParams: QueryModel = {
      page: 1,
      limit: 10,
      sortField: assignmentState.pagination.sortField,
      sortOrder: assignmentState.pagination.sortOrder,
    };
    dispatch(getAssigmentListAsync(queryParams));
  };

  const loadMoreProducts = () => {
    if (!assignmentState.pagination.isLastPage) {
      const queryParams: QueryModel = {
        page: assignmentState.pagination.currentPageNumber + 1,
        limit: 10,
        sortField: assignmentState.pagination.sortField,
        sortOrder: assignmentState.pagination.sortOrder,
      };
      dispatch(getAssigmentListAsync(queryParams));
    }
  };

  const reloadList = useCallback(() => {
    dispatch(setAssigmentList([]));
    dispatch(
      setPagination({
        currentPageNumber: 1,
        offset: 10,
        sortField: assignmentState.pagination.sortField,
        sortOrder: assignmentState.pagination.sortOrder,
        isLastPage: false,
      })
    );
    loadInitialData();
  }, [
    dispatch,
    assignmentState.pagination.sortField,
    assignmentState.pagination.sortOrder,
  ]);

  useFocusEffect(
    useCallback(() => {
      reloadList();
    }, [reloadList])
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={assignmentState.list}
        renderItem={({ item }) => <HistoryAssignmentItem item={item} />}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMoreProducts}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HistoryScreen;
