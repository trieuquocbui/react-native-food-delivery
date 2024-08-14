import StatusOrderItem from "@/components/StatusOrderItem";
import StatusOrderList from "@/components/StatusOrderList";
import { Colors } from "@/constants/Colors";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import QueryModel from "@/models/QueryModel";
import {
  getStatusOrderListAsync,
  OrderState,
  setStatus,
} from "@/stores/OrderSlice";
import { RootState } from "@/stores/Store";
import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";

const HistoriesScreen: React.FC<string> = (search: string) => {
  const dispatch = useAppDispatch();

  const route = useRoute();

  const orderState: OrderState = useAppSelector(
    (state: RootState) => state.order
  );

  const selectedStatus = (_id: number) => {
    dispatch(setStatus(_id));
  };

  const loadMoreOrders = () => {
    if (!orderState.pagination.isLastPage) {
      const queryParams: QueryModel = {
        page: orderState.pagination.currentPageNumber + 1,
        limit: orderState.pagination.offset,
        sortField: orderState.pagination.sortField,
        sortOrder: orderState.pagination.sortOrder,
        category: orderState.pagination.category,
        search: orderState.pagination.searchQuery,
      };
      dispatch(getStatusOrderListAsync(queryParams, orderState.status));
    }
  };

  useEffect(() => {
    const queryParams: QueryModel = {
      page: orderState.pagination.currentPageNumber,
      limit: orderState.pagination.offset,
      sortField: orderState.pagination.sortField,
      sortOrder: orderState.pagination.sortOrder,
    };
    dispatch(getStatusOrderListAsync(queryParams, orderState.status));
  }, [dispatch, orderState.status]);

  return (
    <FlatList
      style={styles.container}
      ListHeaderComponent={
        <>
          <StatusOrderList onSelectStatus={selectedStatus} />
        </>
      }
      data={orderState.list}
      renderItem={({ item }) => <StatusOrderItem item={item}></StatusOrderItem>}
      keyExtractor={(item) => item._id!}
      showsVerticalScrollIndicator={false}
      // onEndReached={loadMoreOrders}
      // onEndReachedThreshold={0.1}
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

export default HistoriesScreen;
