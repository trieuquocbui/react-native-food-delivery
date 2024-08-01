import { getAccountId, getUserId } from "@/helpers/DecodeHelper";
import { ONLINE } from "@/helpers/StatusAccountHelper";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import socket from "@/sockets/EmployeeSocket";
import * as Location from "expo-location";
import { AccountState, getAccountAsync } from "@/stores/AccountSlice";
import { getNewestAsync } from "@/stores/AssignmentSlice";
import { RootState } from "@/stores/Store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Alert } from "react-native";

const LayoutCustomer: React.FC = () => {
  const dispatch = useAppDispatch();

  const accountState: AccountState = useAppSelector(
    (state: RootState) => state.account
  );

  useEffect(() => {
    const getAccount = async () => {
      let token = await AsyncStorage.getItem("token");
      if (token) {
        const accountId = getAccountId(token);
        dispatch(getAccountAsync(accountId));
        const userId = getUserId(token);
      }
    };

    getAccount();
    socket.connect();
  }, [dispatch, socket]);

  useEffect(() => {
    socket.emit("employee-online", accountState.account);

    socket.on("assignmented", (data) => {
      Alert.alert(
        "Thông báo đơn hàng",
        `${data}`,
        [
          {
            text: "Chấp nhận",
            onPress: () => {
              dispatch(getNewestAsync());
            },
          },
        ],
        {
          cancelable: true,
          onDismiss: () => {},
        }
      );
    });

    socket.on("request-location", async (data) => {
      if (accountState.account.status == ONLINE) {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Thiết bị không cho phép truy cập");
          return;
        }
        const location = await Location.getCurrentPositionAsync({});
        const token = await AsyncStorage.getItem("token");
        const userId: string = getUserId(token!);
        const sendlocation = {
          userId: userId,
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        socket.emit("update-location", sendlocation);
      }
    });

    socket.on("new-order-request", (data, callback) => {
      const timeoutId = setTimeout(() => {
        callback({ accepted: false });
      }, 30000);

      Alert.alert(
        "Thông báo đơn hàng",
        `Mã đơn hàng: ${data.orderId}`,
        [
          {
            text: "Từ chối",
            onPress: () => {
              clearTimeout(timeoutId);
              callback({ accepted: false });
            },
          },
          {
            text: "Chấp nhận",
            onPress: () => {
              socket.emit("shipping-account", { status: 3 });
              callback({ accepted: true });
              dispatch(getNewestAsync());
              clearTimeout(timeoutId);
            },
          },
        ],
        {
          cancelable: true,
          onDismiss: () => {
            clearTimeout(timeoutId);
            callback({ accepted: false });
          },
        }
      );
    });
  }, []);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="assignment" />
    </Stack>
  );
};

export default LayoutCustomer;
