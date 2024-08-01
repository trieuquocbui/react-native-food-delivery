import { Colors } from "@/constants/Colors";
import { CENCEL, FINISH, SHIPPING } from "@/helpers/OrderStatusHelper";
import AssignmentModel from "@/models/AssignmentModel";
import { format } from "date-fns";
import { useRouter } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface HistoryOrderItemProps {
  item: AssignmentModel;
}

const HistoryOrderItem: React.FC<HistoryOrderItemProps> = ({ item }) => {
  const router = useRouter();

  const formatDate = (date: Date | string): string => {
    return format(new Date(date), "yyyy-MM-dd HH:mm:ss");
  };

  const assignmentStatus = (value: boolean): string => {
    if (value) {
      return "Nhận đơn";
    }
    return "Từ chối";
  };

  const OrderStatus = (value: number): string => {
    if (value == CENCEL) {
      return "Từ chối";
    } else if (value == FINISH) {
      return "Giao thành công";
    }
    return "Đang giao hàng";
  };

  return (
    <TouchableOpacity
      style={styles.historyOrderItem}
      onPress={() =>
        router.push({ pathname: `/employee/assignment/${item._id}` })
      }
    >
      <View style={styles.historyOrderItemInforContainer}>
        <View>
          <Text style={styles.historyOrderItemNameText}>
            Mã đơn hàng: {item._id}
          </Text>
        </View>
        <View style={styles.historyOrderItemContentContainer}>
          <Text>Tổng sản phẩm: {item.order.orderDetails.length}</Text>
          <Text>
            Tổng số lượng:{" "}
            {item.order.orderDetails.reduce(
              (total, item) => total + item.quantity,
              0
            )}
          </Text>
          <View style={styles.row}>
            <Text style={styles.blod}>Tổng tiền: </Text>
            <Text style={styles.textPrimaryColor}>
              {item.order.orderDetails.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              ) + item.order.shipping}
            </Text>
          </View>
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.fontSize10}>
            Thời gian: {formatDate(item.assignedAt!)}
          </Text>
          <Text
            style={[
              styles.fontSize10,
              item.status ? styles.textPrimaryColor : styles.textRedColor,
            ]}
          >
            {assignmentStatus(item.status!)}
          </Text>
          <Text
            style={[
              styles.fontSize10,
              item.order.status != CENCEL
                ? styles.textPrimaryColor
                : styles.textRedColor,
            ]}
          >
            {OrderStatus(item.order.status)}
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

export default HistoryOrderItem;
