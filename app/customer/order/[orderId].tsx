import { Colors } from "@/constants/Colors";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { getOrderAsync, OrderState, setOrder } from "@/stores/OrderSlice";
import { RootState } from "@/stores/Store";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import OrderItem from "@/components/OrderItem";
import ChargeArea from "@/components/ChargeArea";

const OrderDetails: React.FC = () => {
  const dispatch = useAppDispatch();

  const { orderId } = useLocalSearchParams();

  const orderState: OrderState = useAppSelector(
    (state: RootState) => state.order
  );

  useEffect(() => {
    if (typeof orderId === "string") {
      console.log(orderId);
      dispatch(getOrderAsync(orderId));
    }
    return () => {
      dispatch(
        setOrder({
          fullName: "",
          phoneNumber: "",
          totalAmount: 0,
          shipping: 0,
          status: 0,
          address1: "",
          address2: "",
          latitude: 0,
          longitude: 0,
          orderDetails: [],
        })
      );
    };
  }, [dispatch, orderId]);

  return (
    <>
      <>
        <View style={styles.order}>
          <View style={styles.itemList}>
            <FlatList
              data={orderState.order.orderDetails}
              renderItem={({ item }) => (
                <View style={styles.container}>
                  <OrderItem item={item}></OrderItem>
                </View>
              )}
              ListFooterComponent={
                <View style={styles.container}>
                  <ChargeArea
                    total={orderState.order.orderDetails.reduce(
                      (total, item) => total + item.price,
                      0
                    )}
                    shipping={orderState.order.shipping}
                  ></ChargeArea>
                </View>
              }
              keyExtractor={(item) => item._id!}
              showsVerticalScrollIndicator={false}
            ></FlatList>
          </View>
        </View>
      </>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 4,
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  textWhite: {
    color: Colors.whiteColor,
  },
  order: {
    flex: 1,
  },
  inforOrder: {
    height: "10%",
    backgroundColor: Colors.whiteColor,
    marginBottom: 4,
  },
  itemList: {
    height: "82%",
  },

  inforArea: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
  },
  infor: {
    flex: 1,
  },
  fullname: {
    marginLeft: 6,
    fontWeight: "bold",
  },
  phoneNumber: {
    marginLeft: 6,
    color: Colors.primaryBackground,
    fontWeight: "600",
  },
  address: {
    fontSize: 12,
    fontWeight: "300",
  },
  inforContainer: {
    flexDirection: "row",
  },
});

export default OrderDetails;
