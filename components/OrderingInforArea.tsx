import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons/faLocationDot";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { useAppSelector } from "@/hooks/useRedux";
import { OrderState } from "@/stores/OrderSlice";
import { RootState } from "@/stores/Store";

const OrderingInforArea = () => {
  const router = useRouter();

  const orderState: OrderState = useAppSelector(
    (state: RootState) => state.order
  );

  return (
    <>
      <Pressable
        style={styles.inforArea}
        onPress={() => router.push("/customer/order/infor")}
      >
        <View style={styles.infor}>
          {orderState.checkInforUser ? (
            <>
              <View style={styles.container}>
                <FontAwesomeIcon
                  size={16}
                  icon={faLocationDot}
                  color={Colors.primaryBackground}
                />
                <Text style={styles.fullname}>
                  {orderState.newOrder.fullName}
                </Text>
                <Text style={styles.phoneNumber}>
                  {orderState.newOrder.phoneNumber}
                </Text>
              </View>
              <View>
                <Text style={styles.address} numberOfLines={2}>
                  {orderState.newOrder.address1 +
                    " " +
                    orderState.newOrder.address2}
                </Text>
              </View>
            </>
          ) : (
            <Text>Vui lòng điền đầy đủ thông tin</Text>
          )}
        </View>
        <View style={styles.navigationIcon}>
          <FontAwesomeIcon
            size={18}
            icon={faChevronRight}
            color={Colors.primaryBackground}
          />
        </View>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  inforArea: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
  },
  container: {
    flexDirection: "row",
  },
  infor: {
    flex: 1,
  },
  fullname: {
    marginLeft: 6,
    fontWeight: "bold",
  },
  navigationIcon: {
    alignItems: "center",
    justifyContent: "center",
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
});

export default OrderingInforArea;
