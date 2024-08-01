import { Colors } from "@/constants/Colors";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";

const NotificationItem = () => {
  return (
    <TouchableOpacity style={styles.notificationItem}>
      <View style={styles.notificationItemInforContainer}>
        <View>
          <Text style={styles.notificationItemNameText}>
            Thông báo đơn hàng
          </Text>
        </View>
        <View style={styles.notificationItemContentContainer}>
          <Text>Nhân viên abc đã giao hàng thành công cho bạn</Text>
        </View>
        <View>
          <Text style={styles.notificationItemDateText}>Ngày 123213</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  notificationItem: {
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
  notificationItemImageContainer: {
    marginRight: 10,
  },
  notificationItemImage: {
    width: 50,
    height: 50,
  },
  notificationItemInforContainer: {
    flex: 1,
    flexDirection: "column",
  },
  notificationItemNameText: {
    fontWeight: "bold",
  },
  notificationItemContentContainer: {
    flex: 1,
  },
  notificationItemDateText: {
    fontSize: 10,
  },
});

export default NotificationItem;
