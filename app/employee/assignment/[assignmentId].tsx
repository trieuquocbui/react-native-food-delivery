import ChargeArea from "@/components/ChargeArea";
import OrderItem from "@/components/OrderItem";
import { Colors } from "@/constants/Colors";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons/faLocationDot";
import { AssignmentState, getDetailAsync } from "@/stores/AssignmentSlice";
import { RootState } from "@/stores/Store";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";

const Deliverycreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const { assignmentId } = useLocalSearchParams();

  const assignmentState: AssignmentState = useAppSelector(
    (state: RootState) => state.assignment
  );

  

  useEffect(() => {
    if (typeof assignmentId === "string") {
      dispatch(getDetailAsync(assignmentId));
    }
  }, [dispatch, assignmentId]);
  return (
    <>
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
                  {assignmentState.assigmentHistory.order.fullName}
                </Text>
                <Text style={styles.phoneNumber}>
                  {assignmentState.assigmentHistory.order.phoneNumber}
                </Text>
              </View>
              <View>
                <Text style={styles.address} numberOfLines={2}>
                  {assignmentState.assigmentHistory.order.address1 +
                    " " +
                    assignmentState.assigmentHistory.order.address2}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.itemList}>
          <FlatList
            data={assignmentState.assigmentHistory.order.orderDetails}
            renderItem={({ item }) => (
              <View style={styles.container}>
                <OrderItem item={item}></OrderItem>
              </View>
            )}
            ListFooterComponent={
              <View style={styles.container}>
                <ChargeArea
                  total={assignmentState.assigmentHistory.order.orderDetails.reduce(
                    (total, item) => total + item.price,
                    0
                  )}
                ></ChargeArea>
              </View>
            }
            keyExtractor={(item) => item._id!}
            showsVerticalScrollIndicator={false}
          ></FlatList>
        </View>
      </View>
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

export default Deliverycreen;
