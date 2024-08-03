import { Tabs, useRouter } from "expo-router";
import React from "react";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { faTruck } from "@fortawesome/free-solid-svg-icons/faTruck";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons/faClipboardList";
import { faPhoneSlash } from "@fortawesome/free-solid-svg-icons/faPhoneSlash";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Colors } from "@/constants/Colors";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import AvatarHeader from "@/components/AvatarHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  AssignmentState,
  getAssigmentListAsync,
  setShippingAssigment,
} from "@/stores/AssignmentSlice";
import { RootState } from "@/stores/Store";
import socket from "@/sockets/EmployeeSocket";
import { editOrderStatusAsync } from "@/stores/OrderSlice";
import { CENCEL } from "@/helpers/OrderStatusHelper";
import { editStatusAccountAsync } from "@/stores/AccountSlice";
import QueryModel from "@/models/QueryModel";

const LayoutTabs: React.FC = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const assignmentState: AssignmentState = useAppSelector(
    (state: RootState) => state.assignment
  );

  const cancelOrder = () => {
    Alert.alert("Thông báo đơn hàng", `Xác nhận giao thất bại`, [
      {
        text: "Huỷ",
        onPress: () => {},
      },
      {
        text: "Chấp nhận",
        onPress: () => {
          dispatch(
            editOrderStatusAsync(
              assignmentState.shippingAssigment!.order._id!,
              CENCEL
            )
          );
          dispatch(setShippingAssigment(null));
        },
      },
    ]);
  };

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.primaryBackground,
          headerStyle: {
            backgroundColor: Colors.primaryBackground,
          },
          headerTintColor: Colors.whiteColor,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Nhận đơn",
            headerRight: () => (
              <View style={styles.marginR12}>
                <AvatarHeader
                  onPress={() => {
                    socket.disconnect();
                    AsyncStorage.clear(), router.push("/");
                  }}
                ></AvatarHeader>
              </View>
            ),
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon
                color={color}
                size={28}
                icon={faHouse}
              ></FontAwesomeIcon>
            ),
          }}
        />
        <Tabs.Screen
          name="delivery"
          options={{
            title: "Giao hàng",
            tabBarBadgeStyle: {
              backgroundColor: Colors.primaryBackground,
              color: Colors.whiteColor,
              borderWidth: 1,
              borderColor: Colors.whiteColor,
            },
            headerRight: () => (
              <Pressable style={styles.marginR12} onPress={cancelOrder}>
                <FontAwesomeIcon
                  color={Colors.whiteColor}
                  size={28}
                  icon={faPhoneSlash}
                ></FontAwesomeIcon>
              </Pressable>
            ),
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon
                color={color}
                size={28}
                icon={faTruck}
              ></FontAwesomeIcon>
            ),
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: "Lịch sử giao hàng",
            tabBarBadgeStyle: {
              backgroundColor: Colors.primaryBackground,
              color: Colors.whiteColor,
              borderWidth: 1,
              borderColor: Colors.whiteColor,
            },
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon
                color={color}
                size={28}
                icon={faClipboardList}
              ></FontAwesomeIcon>
            ),
          }}
        />
        <Tabs.Screen
          name="person"
          options={{
            title: "Hồ sơ",
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon
                color={color}
                size={28}
                icon={faUser}
              ></FontAwesomeIcon>
            ),
          }}
        />
      </Tabs>
    </>
  );
};

const styles = StyleSheet.create({
  marginL12: {
    marginLeft: 12,
  },
  marginR12: {
    marginRight: 12,
  },
});

export default LayoutTabs;
