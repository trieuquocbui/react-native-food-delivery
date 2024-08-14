import { getAccountId } from "@/helpers/DecodeHelper";
import { useAppDispatch } from "@/hooks/useRedux";
import { getAccountAsync } from "@/stores/AccountSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import React, { useEffect } from "react";

const LayoutCustomer: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getAccount = async () => {
      let token = await AsyncStorage.getItem("token");
      if (token) {
        const accountId = getAccountId(token);
        dispatch(getAccountAsync(accountId));
      }
    };
    getAccount();
  }, [dispatch]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(drawer)" />
      <Stack.Screen name="order" />
      <Stack.Screen name="product" />
    </Stack>
  );
};

export default LayoutCustomer;
