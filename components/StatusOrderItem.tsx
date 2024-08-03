import { Colors } from "@/constants/Colors";
import { CENCEL, FINISH, SHIPPING } from "@/helpers/OrderStatusHelper";
import AssignmentModel from "@/models/AssignmentModel";
import OrderModel from "@/models/OrderModel";
import { format } from "date-fns";
import { useRouter } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface StatusOrderItemProps {
  item: OrderModel;
}

const StatusOrderItem: React.FC<StatusOrderItemProps> = ({ item }) => {
  const router = useRouter();

  const formatDate = (date: Date | string): string => {
    return format(new Date(date), "yyyy-MM-dd HH:mm:ss");
  };

  return (
    <TouchableOpacity
      style={styles.historyOrderItem}
      onPress={() => router.push({ pathname: `/customer/order/${item._id}` })}
    >
      <View style={styles.historyOrderItemInforContainer}>
        <View>
          <Text style={styles.historyOrderItemNameText}>
            Mã đơn hàng: {item._id}
          </Text>
        </View>
        <View style={styles.historyOrderItemContentContainer}>
          <Text>Tổng sản phẩm: {item.orderDetails.length}</Text>
          <Text>
            Tổng số lượng:{" "}
            {item.orderDetails.reduce(
              (total, item) => total + item.quantity,
              0
            )}
          </Text>
          <View style={styles.row}>
            <Text style={styles.blod}>Tổng tiền: </Text>
            <Text style={styles.textPrimaryColor}>
              {item.orderDetails.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              ) + item.shipping}
            </Text>
          </View>
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.fontSize10}>
            Thời gian: {formatDate(item.createdAt!)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  historyOrderItem: {
    height: 140,
    margin: 4,
    flexDirection: "row",
    padding: 10,
    backgroundColor: Colors.whiteBackground,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  historyOrderItemImageContainer: {
    marginRight: 10,
  },
  historyOrderItemImage: {
    width: 50,
    height: 50,
  },
  historyOrderItemInforContainer: {
    flex: 1,
    flexDirection: "column",
  },
  historyOrderItemNameText: {
    fontWeight: "bold",
  },
  historyOrderItemContentContainer: {
    flex: 1,
  },
  fontSize10: {
    fontSize: 10,
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textPrimaryColor: {
    fontWeight: "bold",
    color: Colors.primaryBackground,
  },
  textRedColor: {
    fontWeight: "bold",
    color: Colors.redColor,
  },
  blod: {
    fontWeight: "bold",
  },
});

export default StatusOrderItem;
