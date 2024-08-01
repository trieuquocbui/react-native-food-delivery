import ChargeArea from "@/components/ChargeArea";
import OrderItem from "@/components/OrderItem";
import { Colors } from "@/constants/Colors";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons/faLocationDot";
import {
  AssignmentState,
  getNewestAsync,
  setShippingAssigment,
} from "@/stores/AssignmentSlice";
import { RootState } from "@/stores/Store";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { editOrderStatusAsync } from "@/stores/OrderSlice";
import { FINISH } from "@/helpers/OrderStatusHelper";
import socket from "@/sockets/EmployeeSocket";

const DeliveryScreen: React.FC = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const assignmentState: AssignmentState = useAppSelector(
    (state: RootState) => state.assignment
  );

  useEffect(() => {
    dispatch(getNewestAsync());
  }, [dispatch]);

  const submitOrder = () => {
    Alert.alert("Thông báo đơn hàng", "Xác nhận giao thành công", [
      { text: "Huỷ", style: "cancel" },
      {
        text: "Chấp nhận",
        onPress: async () => {
          socket.emit("online-account", { status: 1 });
          dispatch(
            editOrderStatusAsync(
              assignmentState.shippingAssigment!.order._id!,
              FINISH
            )
          );
          dispatch(setShippingAssigment(null));
        },
      },
    ]);
  };

  return assignmentState.shippingAssigment ? (
    <View style={styles.order}>
      <View style={styles.inforOrder}>
        <View style={styles.inforArea}>
          <View style={styles.infor}>
            <View style={styles.inforContainer}>
              <FontAwesomeIcon
                size={16}
                icon={faLocationDot}
                color={Colors.primaryBackground}
              />
              <Text style={styles.fullname}>
                {assignmentState.shippingAssigment.order.fullName}
              </Text>
              <Text style={styles.phoneNumber}>
                {assignmentState.shippingAssigment.order.phoneNumber}
              </Text>
            </View>
            <View>
              <Text style={styles.address} numberOfLines={2}>
                {assignmentState.shippingAssigment.order.address1 +
                  " " +
                  assignmentState.shippingAssigment.order.address2}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.itemList}>
        <FlatList
          data={assignmentState.shippingAssigment.order.orderDetails}
          renderItem={({ item }) => (
            <View style={styles.container}>
              <OrderItem item={item}></OrderItem>
            </View>
          )}
          ListFooterComponent={
            <View style={styles.container}>
              <ChargeArea
                total={assignmentState.shippingAssigment.order.orderDetails.reduce(
                  (total, item) => total + item.price,
                  0
                )}
                shipping={assignmentState.shippingAssigment.order.shipping}
              ></ChargeArea>
            </View>
          }
          keyExtractor={(item) => item._id!}
          showsVerticalScrollIndicator={false}
        ></FlatList>
      </View>
      <View style={styles.buyItemContainer}>
        <View style={styles.orderBtnContainer}>
          <Text>
            Tổng tiền:{" "}
            {assignmentState.shippingAssigment.order.orderDetails.reduce(
              (total, item) => total + item.price,
              0
            ) + assignmentState.shippingAssigment.order.shipping}
          </Text>
          <TouchableOpacity style={styles.btnOrder} onPress={submitOrder}>
            <Text style={styles.textWhite}>Giao hàng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  ) : (
    <View>
      <Text>Không có đơn hàng</Text>
    </View>
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
  buyItemContainer: {
    height: "8%",
    backgroundColor: Colors.whiteColor,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  orderBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  btnOrder: {
    paddingHorizontal: 20,
    marginLeft: 6,
    backgroundColor: Colors.primaryBackground,
    height: "100%",
    justifyContent: "center",
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

export default DeliveryScreen;
